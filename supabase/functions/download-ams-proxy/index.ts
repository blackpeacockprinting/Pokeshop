// TEMPORARY — bulk-backfill helper for downloading AMS .3mf files from N3D
// and streaming them straight to whoever requests them (Trevor's browser,
// via a plain navigation, so it lands as a normal Chrome download).
//
// verify_jwt is off because a plain browser navigation can't attach an
// Authorization header. Auth is instead a long shared secret, passed as a
// query param and checked below. Delete this function once the AMS
// backfill is done.
//
// !! DIVERGES FROM THE DEPLOYED COPY !!
// The deployed version still has the shared secret written into the source
// as a string literal. This repository is public, so the literal was NOT
// committed. Before redeploying from this file:
//   1. supabase secrets set AMS_PROXY_SECRET=<a fresh random string>
//   2. redeploy this function
//   3. treat the old literal as burned — it lived in a deployed function
//      whose endpoint needs no JWT
// Until then, deploying this file will 403 every request, which is the
// safe direction to fail.

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const N3D_BASE = 'https://www.n3dmelbourne.com/api/v1'
const SHARED_SECRET = Deno.env.get('AMS_PROXY_SECRET') ?? ''

async function rpc(fn: string, body: unknown) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    body: JSON.stringify(body),
  })
  if (!r.ok) throw new Error(`${fn}: ${r.status} ${(await r.text()).slice(0, 300)}`)
  const t = await r.text()
  return t ? JSON.parse(t) : null
}

async function getDesign(slug: string) {
  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/designs?slug=eq.${encodeURIComponent(slug)}&select=slug,raw`,
    { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
  )
  if (!r.ok) throw new Error(`design lookup: ${r.status}`)
  const rows = await r.json()
  return rows[0] ?? null
}

Deno.serve(async (req) => {
  const { searchParams } = new URL(req.url)
  // An unset secret must not mean "no check": refuse everything instead.
  if (!SHARED_SECRET || searchParams.get('key') !== SHARED_SECRET) {
    return Response.json({ error: 'forbidden' }, { status: 403 })
  }
  const slug = searchParams.get('slug')
  if (!slug) return Response.json({ error: 'missing slug' }, { status: 400 })

  try {
    const design = await getDesign(slug)
    if (!design) return Response.json({ error: 'unknown slug' }, { status: 404 })

    const profiles: { type: string; name: string }[] = design.raw?.profiles ?? []
    const idx = profiles.findIndex((p) => p.type === 'ams')
    if (idx === -1) {
      return Response.json({ error: 'no ams profile for this design', profiles: profiles.map(p => p.type) }, { status: 422 })
    }

    const key = await rpc('get_n3d_key', {})
    if (!key) return Response.json({ error: 'no n3d key' }, { status: 500 })

    const dlUrl = `${N3D_BASE}/designs/${slug}/download${idx > 0 ? `?profile=${idx}` : ''}`
    const dlRes = await fetch(dlUrl, { headers: { Authorization: `Bearer ${key}` } })
    if (!dlRes.ok) {
      return Response.json({ error: `download-info ${dlRes.status}`, detail: (await dlRes.text()).slice(0, 300) }, { status: 502 })
    }
    const info = await dlRes.json()
    if (!info.download_url) {
      return Response.json({ error: 'no download_url in response' }, { status: 502 })
    }

    const fileRes = await fetch(info.download_url)
    if (!fileRes.ok || !fileRes.body) {
      return Response.json({ error: `file fetch ${fileRes.status}` }, { status: 502 })
    }

    return new Response(fileRes.body, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${slug}-ams.3mf"`,
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
})
