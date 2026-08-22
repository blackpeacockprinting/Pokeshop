// send-outbox
// Reads queued rows from email_outbox and sends them via Resend.
// Never touches tables directly: it calls outbox_claim() and outbox_resolve().

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_KEY   = Deno.env.get('RESEND_API_KEY')!

const FROM     = 'Black Peacock Printing <orders@blackpeacockprinting.com>'
const REPLY_TO = 'kontakt@blackpeacockprinting.com'

type Row = {
  id: string
  kind: 'order_confirmation' | 'admin_notification' | 'ready_for_pickup'
  to: string
  lang: string
  ref: string
  first_name: string | null
  currency: string | null
  turnaround: string | null
  payments: string[] | null
  total: string | number
  items: { name: string; qty: number; line_total: string | number }[]
}

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
  if (!r.ok) throw new Error(`${fn} failed: ${r.status} ${await r.text()}`)
  const t = await r.text()
  return t ? JSON.parse(t) : null
}

// Currency belongs to the order, never to the language. A German customer
// buying at Osan is still paying dollars.
function money(v: string | number, currency?: string | null) {
  const n = Number(v)
  const cur = (currency ?? 'EUR').trim().toUpperCase()
  if (cur === 'USD') return '$' + n.toFixed(2)
  return n.toFixed(2).replace('.', ',') + ' \u20AC'
}

const PAY_WORD: Record<string, Record<string, string>> = {
  en: { cash: 'cash', paypal: 'PayPal', bank_transfer: 'bank transfer', zelle: 'Zelle' },
  de: { cash: 'Barzahlung', paypal: 'PayPal', bank_transfer: '\u00DCberweisung', zelle: 'Zelle' },
}

function payList(row: Row) {
  const de = row.lang === 'de'
  const dict = PAY_WORD[de ? 'de' : 'en']
  return (row.payments ?? []).map((p) => dict[p] ?? p).join(de ? ' oder ' : ' or ')
}

function lines(row: Row) {
  return row.items
    .map((i) => `  ${i.qty} x ${i.name}  -  ${money(i.line_total, row.currency)}`)
    .join('\n')
}

function render(row: Row): { subject: string; text: string } {
  const de = row.lang === 'de'
  const name = row.first_name ?? ''
  const pay = payList(row)
  const total = money(row.total, row.currency)
  const track = `https://blackpeacockprinting.com/order/${row.ref}`

  if (row.kind === 'admin_notification') {
    return {
      subject: `New order ${row.ref} - ${total}`,
      text:
        `${row.ref}\n${name}\n${de ? 'German' : 'English'}\n\n` +
        `${lines(row)}\n\nTotal ${total}\n`,
    }
  }

  if (row.kind === 'ready_for_pickup') {
    return de
      ? {
          subject: `Deine Bestellung ${row.ref} ist abholbereit`,
          text:
            `Hallo ${name},\n\ndeine Bestellung ist fertig und kann abgeholt werden.\n\n` +
            `${lines(row)}\n\nF\u00E4llig bei Abholung: ${total}\n` +
            (pay ? `Zahlung: ${pay}\n` : '') +
            `\nStatus: ${track}\n\nBlack Peacock Printing\n`,
        }
      : {
          subject: `Your order ${row.ref} is ready for pickup`,
          text:
            `Hi ${name},\n\nyour order is assembled and ready to collect.\n\n` +
            `${lines(row)}\n\nDue at pickup: ${total}\n` +
            (pay ? `Payment: ${pay}\n` : '') +
            `\nStatus: ${track}\n\nBlack Peacock Printing\n`,
        }
  }

  return de
    ? {
        subject: `Bestellung ${row.ref} best\u00E4tigt`,
        text:
          `Hallo ${name},\n\nvielen Dank f\u00FCr deine Bestellung.\n\n` +
          `${lines(row)}\n\nF\u00E4llig bei Abholung: ${total}\n` +
          (pay ? `Zahlung: ${pay}\n` : '') +
          (row.turnaround ? `\n${row.turnaround}\n` : '') +
          `\nStatus jederzeit hier: ${track}\n\nBlack Peacock Printing\n`,
      }
    : {
        subject: `Order ${row.ref} confirmed`,
        text:
          `Hi ${name},\n\nthanks for your order.\n\n` +
          `${lines(row)}\n\nDue at pickup: ${total}\n` +
          (pay ? `Payment: ${pay}\n` : '') +
          (row.turnaround ? `\n${row.turnaround}\n` : '') +
          `\nTrack it any time: ${track}\n\nBlack Peacock Printing\n`,
      }
}

Deno.serve(async () => {
  try {
    const rows: Row[] = await rpc('outbox_claim', { p_limit: 20 })
    let sent = 0
    let failed = 0

    for (const row of rows) {
      try {
        const { subject, text } = render(row)
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESEND_KEY}`,
            'Idempotency-Key': row.id,
          },
          body: JSON.stringify({
            from: FROM,
            to: [row.to],
            reply_to: REPLY_TO,
            subject,
            text,
          }),
        })

        if (!r.ok) throw new Error(`resend ${r.status}: ${(await r.text()).slice(0, 300)}`)

        await rpc('outbox_resolve', { p_id: row.id, p_ok: true })
        sent++
      } catch (e) {
        await rpc('outbox_resolve', {
          p_id: row.id,
          p_ok: false,
          p_error: e instanceof Error ? e.message : String(e),
        })
        failed++
      }
    }

    return Response.json({ claimed: rows.length, sent, failed })
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    )
  }
})
