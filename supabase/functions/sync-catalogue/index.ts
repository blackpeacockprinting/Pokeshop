// sync-catalogue
// Fetches the whole N3D catalogue and loads it into the designs table.
// Runs nightly on a schedule. Safe to run by hand at any time.

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const N3D_BASE = 'https://www.n3dmelbourne.com/api/v1'
const LOCALE   = 'EU'
const PER_PAGE = 200
const MAX_PAGES = 10          // guard against a pagination bug looping forever

async function rpc(fn: string, body: unknown) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify(body),
  })
  if (!r.ok) throw new Error(`${fn}: ${r.status} ${(await r.text()).slice(0, 300)}`)
  const t = await r.text()
  return t ? JSON.parse(t) : null
}

Deno.serve(async () => {
  const started = Date.now()
  try {
    const key = await rpc('get_n3d_key', {})
    if (!key || typeof key !== 'string' || !key.startsWith('n3d_sk_')) {
      throw new Error('no usable N3D key in vault')
    }

    const all: unknown[] = []
    let page = 1
    let reportedTotal: number | null = null

    while (page <= MAX_PAGES) {
      const url =
        `${N3D_BASE}/designs?limit=${PER_PAGE}&include=details` +
        `&locale=${LOCALE}&page=${page}`

      const r = await fetch(url, { headers: { Authorization: `Bearer ${key}` } })

      // A non-2xx must never reach the database. The old sync wrote error
      // bodies straight into the catalogue; this stops here instead.
      if (!r.ok) {
        throw new Error(`N3D page ${page}: ${r.status} ${(await r.text()).slice(0, 200)}`)
      }

      const body = await r.json()
      if (!Array.isArray(body?.data)) {
        throw new Error(`N3D page ${page}: response has no data array`)
      }

      all.push(...body.data)
      reportedTotal = body?.pagination?.total ?? reportedTotal

      if (body?.pagination?.has_next !== true) break
      page++
      await new Promise((r) => setTimeout(r, 2500))   // well inside 30 req/min
    }

    if (reportedTotal !== null && all.length !== reportedTotal) {
      throw new Error(`fetched ${all.length} but API reported ${reportedTotal}`)
    }

    const result = await rpc('sync_designs', { p_payload: all })

    const detail = {
      ...result,
      pages: page,
      seconds: Math.round((Date.now() - started) / 1000),
    }
    await rpc('log_sync', { p_ok: true, p_detail: detail })
    return Response.json({ ok: true, ...detail })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    try {
      await rpc('log_sync', { p_ok: false, p_detail: { error: msg } })
    } catch { /* logging must never mask the real error */ }
    return Response.json({ ok: false, error: msg }, { status: 500 })
  }
})
