// backfill-names-de
// Fills designs.name_de from PokeAPI for rows that still have no German name.
//
// Two kinds of design need two different PokeAPI endpoints:
//   - a Pokemon figure has a pokedex_number  -> /pokemon-species/{dex}
//   - a bare ball has none, only a slug      -> /item/{slug}
// N3D supplies neither, so this job is the only source of German names.
//
// PokeAPI answers with the plain species name, which is not enough on its
// own: N3D ships four Bulbasaurs and four Charizards, and a German shopper
// looking at four cards all reading "Bisasam" cannot tell which is which.
// So the variant marker in the English name is translated and reattached
// (see QUALIFIER_RULES) to give one distinct German name per product.
//
// Never overwrites a name_de that is already set. Anything typed by hand
// survives both this job and the nightly catalogue sync, which does not
// touch the column at all.
//
// Runs nightly just after sync-catalogue. Safe to run by hand at any time.

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const POKEAPI = 'https://pokeapi.co/api/v2'

// PokeAPI is free and asks callers to go easy on it. One design a night is
// the normal load; the spacing only matters on a first full-catalogue run.
const GAP_MS = 300
const MAX_PER_RUN = 120

// Rows PokeAPI cannot answer are retried this often, in case a German
// localisation is added later, rather than being refetched every night.
const RECHECK_AFTER_DAYS = 30

// Ball slugs whose PokeAPI item name differs from the N3D slug. `suffix`
// keeps two N3D products that share one PokeAPI item distinguishable: the
// plain display ball and the one that actually opens are both "Pokeball".
const ITEM_ALIAS: Record<string, { item: string; suffix?: string }> = {
  'pokeball-open': { item: 'poke-ball', suffix: ' – Funktionsfähig' },
}

// N3D ships regional ball variants that PokeAPI does not carry as separate
// items. "great-ball-hisui" falls back to "great-ball" plus a marker.
const BALL_REGIONS: Record<string, string> = {
  hisui: 'Hisui', paldea: 'Paldea', galar: 'Galar',
  alola: 'Alola', johto: 'Johto',  kanto: 'Kanto',
}

// English variant marker -> German. Order matters: the first match wins,
// so the Mega X/Y/Z form has to be tried before plain Mega.
// German uses a hyphenated prefix for Mega and regional forms
// ("Mega-Glurak X", "Galar-Ponita"), unlike the English spaced prefix.
const QUALIFIER_RULES: Array<{ test: RegExp; build: (de: string, m: RegExpMatchArray) => string }> = [
  { test: /^Mega\s+.+\s+([XYZ])$/i, build: (de, m) => `Mega-${de} ${m[1].toUpperCase()}` },
  { test: /^Mega\s+/i,              build: (de) => `Mega-${de}` },
  { test: /^Gigantamax\s+/i,        build: (de) => `Gigadynamax-${de}` },
  { test: /^Alolan\s+/i,            build: (de) => `Alola-${de}` },
  { test: /^Galarian\s+/i,          build: (de) => `Galar-${de}` },
  { test: /^Hisuian\s+/i,           build: (de) => `Hisui-${de}` },
  { test: /^Paldean\s+/i,           build: (de) => `Paldea-${de}` },
  { test: /^Ash-/i,                 build: (de) => `Ash-${de}` },
  // N3D's Mewtwo-Strikes-Back clone figures. Not official terminology.
  { test: /\s+Clone$/i,             build: (de) => `${de}-Klon` },
  // Seasonal and cosmetic tags N3D appends after a dash.
  { test: /\s+-\s+Christmas$/i,     build: (de) => `${de} – Weihnachten` },
  { test: /\s+-\s+Halloween$/i,     build: (de) => `${de} – Halloween` },
  { test: /\s+-\s+Rose$/i,          build: (de) => `${de} – Rose` },
  { test: /\s+-\s+Female$/i,        build: (de) => `${de} – Weiblich` },
  { test: /\s+-\s+Male$/i,          build: (de) => `${de} – Männlich` },
  { test: /\s+-\s+Shiny$/i,         build: (de) => `${de} – Schillernd` },
]

// A display name carrying no variant marker keeps the bare species name.
// This is why the rules match the English name rather than diffing it
// against pokemon_name: PokeAPI form suffixes ("deoxys-normal",
// "nidoran-m") would otherwise read as variants and corrupt good rows.
function germanDisplayName(displayName: string, speciesDe: string): string {
  for (const rule of QUALIFIER_RULES) {
    const m = displayName.match(rule.test)
    if (m) return rule.build(speciesDe, m)
  }
  return speciesDe
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const restHeaders = {
  'Content-Type': 'application/json',
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
}

async function rpc(fn: string, body: unknown) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: restHeaders,
    body: JSON.stringify(body),
  })
  if (!r.ok) throw new Error(`${fn}: ${r.status} ${(await r.text()).slice(0, 300)}`)
  const t = await r.text()
  return t ? JSON.parse(t) : null
}

// Returns the parsed body, or null when PokeAPI has no such entry.
async function pokeapi(path: string): Promise<Record<string, unknown> | null> {
  const r = await fetch(`${POKEAPI}/${path}`, { headers: { Accept: 'application/json' } })
  if (r.status === 404) return null
  if (!r.ok) throw new Error(`pokeapi ${path}: ${r.status}`)
  return await r.json()
}

// An entry can exist while carrying no German name at all: the newer
// Gen 8/9 items are only partly localised in PokeAPI.
function germanName(payload: Record<string, unknown> | null): string | null {
  const names = payload?.names
  if (!Array.isArray(names)) return null
  const hit = names.find(
    (n) => (n as Record<string, Record<string, string>>)?.language?.name === 'de',
  ) as { name?: string } | undefined
  const v = hit?.name
  return typeof v === 'string' && v.trim() ? v.trim() : null
}

// Balls: try the slug as-is, then fall back to a regional base form.
async function ballGermanName(slug: string): Promise<string | null> {
  const alias = ITEM_ALIAS[slug]
  const direct = germanName(await pokeapi(`item/${alias?.item ?? slug}`))
  if (direct) return direct + (alias?.suffix ?? '')

  const m = slug.match(/^(.+)-([a-z]+)$/)
  const region = m ? BALL_REGIONS[m[2]] : undefined
  if (!m || !region) return null

  await sleep(GAP_MS)
  const base = germanName(await pokeapi(`item/${m[1]}`))
  return base ? `${base} (${region})` : null
}

type Row = { slug: string; pokedex_number: number | null; display_name: string | null }

Deno.serve(async () => {
  const started = Date.now()
  try {
    // Milliseconds are dropped: the value rides inside a PostgREST or=()
    // filter, where a shorter timestamp is one less thing to escape.
    const cutoff = new Date(Date.now() - RECHECK_AFTER_DAYS * 86400_000)
      .toISOString().replace(/\.\d{3}Z$/, 'Z')

    const q =
      `${SUPABASE_URL}/rest/v1/designs` +
      `?select=slug,pokedex_number,display_name&name_de=is.null` +
      `&or=(name_de_checked_at.is.null,name_de_checked_at.lt.${cutoff})` +
      `&order=slug&limit=${MAX_PER_RUN}`

    const listRes = await fetch(q, { headers: restHeaders })
    if (!listRes.ok) {
      throw new Error(`list pending: ${listRes.status} ${(await listRes.text()).slice(0, 300)}`)
    }
    const pending: Row[] = await listRes.json()

    const resolved: Record<string, string> = {}
    const unresolved: string[] = []
    const errors: string[] = []

    for (const row of pending) {
      let de: string | null = null
      try {
        if (row.pokedex_number !== null) {
          const species = germanName(await pokeapi(`pokemon-species/${row.pokedex_number}`))
          de = species ? germanDisplayName(row.display_name ?? '', species) : null
        } else {
          de = await ballGermanName(row.slug)
        }
      } catch (e) {
        // One bad row must not cost the whole batch. Leave the timestamp
        // untouched so the row is retried on the next run, not in 30 days.
        errors.push(`${row.slug}: ${e instanceof Error ? e.message : String(e)}`)
        await sleep(GAP_MS)
        continue
      }

      // The name_de=is.null filter makes "never overwrite" a database
      // guarantee rather than something this loop has to be careful about.
      const patch: Record<string, string> = { name_de_checked_at: new Date().toISOString() }
      if (de) patch.name_de = de

      const upd = await fetch(
        `${SUPABASE_URL}/rest/v1/designs?slug=eq.${encodeURIComponent(row.slug)}&name_de=is.null`,
        {
          method: 'PATCH',
          headers: { ...restHeaders, Prefer: 'return=representation' },
          body: JSON.stringify(patch),
        },
      )
      if (!upd.ok) {
        errors.push(`${row.slug}: patch ${upd.status} ${(await upd.text()).slice(0, 120)}`)
        await sleep(GAP_MS)
        continue
      }

      if (de) resolved[row.slug] = de
      else unresolved.push(row.slug)

      await sleep(GAP_MS)
    }

    // How many storefront designs a German visitor would still see in English.
    const stillNullRes = await fetch(
      `${SUPABASE_URL}/rest/v1/designs?select=slug&name_de=is.null&active=is.true&entitled=is.true`,
      { headers: restHeaders },
    )
    const stillNull = stillNullRes.ok ? ((await stillNullRes.json()) as unknown[]).length : null

    const detail = {
      job: 'backfill-names-de',
      considered: pending.length,
      resolved: Object.keys(resolved).length,
      unresolved: unresolved.length,
      errors: errors.length,
      still_null_on_storefront: stillNull,
      names: resolved,
      no_german_name: unresolved,
      error_detail: errors.slice(0, 20),
      seconds: Math.round((Date.now() - started) / 1000),
    }

    // A run where every single row blew up is a failure, not a quiet no-op.
    const ok = errors.length === 0 || errors.length < pending.length
    await rpc('log_sync', { p_ok: ok, p_detail: detail })
    return Response.json({ ok, ...detail })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    try {
      await rpc('log_sync', { p_ok: false, p_detail: { job: 'backfill-names-de', error: msg } })
    } catch { /* logging must never mask the real error */ }
    return Response.json({ ok: false, error: msg }, { status: 500 })
  }
})
