/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

function corsAllowedOrigin(request, env) {
  const origin = request.headers.get('Origin') || ''
  const raw = (env.ALLOWED_ORIGIN || '*')
  const allowed = raw.split(',').map(s => s.trim()).filter(Boolean)

  // Non-browser requests (no Origin header) are fine
  if (!origin) return allowed.includes('*') ? '*' : allowed[0] || '*'

  if (allowed.includes('*')) return '*'
  return allowed.includes(origin) ? origin : ''
}

function json(status, data, allowOrigin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': allowOrigin || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').trim())
}

function isPhoneOk(s) {
  if (!s) return true
  return /^\+?[0-9\s().-]{7,20}$/.test(String(s).trim())
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const allowOrigin = corsAllowedOrigin(request, env)

    if (request.method === 'OPTIONS') {
      // If browser origin is disallowed, return 403 to stop preflight
      if (request.headers.get('Origin') && !allowOrigin) {
        return json(403, { ok: false, error: 'Origin not allowed' }, '')
      }
      return json(200, { ok: true }, allowOrigin)
    }

    if (url.pathname !== '/contact') {
      return json(404, { ok: false, error: 'Not found' }, allowOrigin)
    }

    if (request.method !== 'POST') {
      return json(405, { ok: false, error: 'Method not allowed' }, allowOrigin)
    }

    if (request.headers.get('Origin') && !allowOrigin) {
      return json(403, { ok: false, error: 'Origin not allowed' }, '')
    }

    let body
    try {
      body = await request.json()
    } catch {
      return json(400, { ok: false, error: 'Invalid JSON' }, allowOrigin)
    }

    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim()
    const phone = body?.phone ? String(body.phone).trim() : ''
    const message = String(body?.message || '').trim()
    const company = String(body?.company || '').trim() // honeypot

    // Honeypot: bots fill hidden fields; accept silently
    if (company) return json(200, { ok: true }, allowOrigin)

    if (!name) return json(400, { ok: false, error: 'Name is required' }, allowOrigin)
    if (!isEmail(email)) return json(400, { ok: false, error: 'Valid email is required' }, allowOrigin)
    if (message.length < 5) return json(400, { ok: false, error: 'Message must be 5+ characters' }, allowOrigin)
    if (!isPhoneOk(phone)) return json(400, { ok: false, error: 'Invalid phone format' }, allowOrigin)

    const from = env.MAIL_FROM || 'Monte Sión Website <onboarding@resend.dev>'
    // Resend docs: send email via POST /emails with from/to/subject/etc. :contentReference[oaicite:1]{index=1}
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [env.TO_EMAIL],
        reply_to: email,
        subject: `Monte Sión Contact Form: ${name}`,
        text:
          `New contact form submission\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          (phone ? `Phone: ${phone}\n` : '') +
          `\nMessage:\n${message}\n`,
      }),
    })

    if (!resendRes.ok) {
      const detail = await resendRes.text().catch(() => '')
      return json(500, { ok: false, error: 'Email send failed', detail }, allowOrigin)
    }

    return json(200, { ok: true }, allowOrigin)
  },
}
