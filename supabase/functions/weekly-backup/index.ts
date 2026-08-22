// weekly-backup
// Pulls a full snapshot of the business data, turns each table into a CSV,
// and emails the lot as attachments. Supabase's free tier keeps no backups,
// so this is the only copy that lives outside the platform.

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_KEY   = Deno.env.get('RESEND_API_KEY')!

const FROM = 'Black Peacock Printing <orders@blackpeacockprinting.com>'
const TO   = 'trevor@blackpeacockprinting.com'

// Tables worth keeping, in the order they appear in the email.
const SHEETS = [
  'orders',
  'order_items',
  'receipts',
  'tax_export',
  'expenses',
  'fixed_costs',
  'custom_products',
  'settings',
]

function csvCell(v: unknown): string {
  if (v === null || v === undefined) return ''
  const s = typeof v === 'object' ? JSON.stringify(v) : String(v)
  // Quote if it contains a delimiter, quote or newline. Double any quotes.
  return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
}

function toCsv(rows: Record<string, unknown>[]): string {
  if (!rows.length) return ''
  // Union of keys across all rows, so a null-heavy first row cannot lose columns.
  const cols: string[] = []
  for (const r of rows) {
    for (const k of Object.keys(r)) if (!cols.includes(k)) cols.push(k)
  }
  const head = cols.map(csvCell).join(',')
  const body = rows.map((r) => cols.map((c) => csvCell(r[c])).join(',')).join('\n')
  // BOM so Excel opens UTF-8 correctly on a double click.
  return '\uFEFF' + head + '\n' + body + '\n'
}

function b64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  const CHUNK = 0x8000
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK))
  }
  return btoa(bin)
}

Deno.serve(async () => {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/backup_snapshot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
      },
      body: '{}',
    })
    if (!r.ok) throw new Error(`snapshot failed: ${r.status} ${await r.text()}`)

    const snap = await r.json()
    const stamp = new Date().toISOString().slice(0, 10)

    const attachments: { filename: string; content: string }[] = []
    const summary: string[] = []

    for (const name of SHEETS) {
      const rows = (snap[name] ?? []) as Record<string, unknown>[]
      summary.push(`${name}: ${rows.length}`)
      if (!rows.length) continue
      attachments.push({
        filename: `${stamp}-${name}.csv`,
        content: b64(toCsv(rows)),
      })
    }

    // The raw snapshot too: CSV is readable, JSON is exactly restorable.
    attachments.push({
      filename: `${stamp}-full-snapshot.json`,
      content: b64(JSON.stringify(snap, null, 2)),
    })

    const c = snap.counts ?? {}
    const text =
      `Weekly backup for Black Peacock Printing\n` +
      `Taken ${snap.generated_at}\n\n` +
      `Orders ${c.orders ?? 0}\nItems ${c.order_items ?? 0}\n` +
      `Receipts ${c.receipts ?? 0}\nPurchases ${c.expenses ?? 0}\n\n` +
      `Attached: ${attachments.length} file(s).\n` +
      summary.join('\n') +
      `\n\nKeep these. Supabase's free plan stores no backups of its own.\n`

    const send = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_KEY}`,
        'Idempotency-Key': `backup-${stamp}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject: `Backup ${stamp} - ${c.orders ?? 0} orders, ${c.receipts ?? 0} receipts`,
        text,
        attachments,
      }),
    })

    if (!send.ok) throw new Error(`resend ${send.status}: ${(await send.text()).slice(0, 400)}`)

    return Response.json({ ok: true, files: attachments.length, counts: c })
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
})
