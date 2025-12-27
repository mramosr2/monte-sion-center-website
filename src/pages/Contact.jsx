import { useMemo, useState } from 'react'
import Section from '../components/Section.jsx'
import MapSection from '../components/MapSection.jsx'
import { useLanguage } from '../i18n/LanguageProvider.jsx'

const PHONE_PATTERN = '^\\+?[0-9\\s().-]{7,20}$'
const PHONE_REGEX = new RegExp(PHONE_PATTERN)

function isEmailOk(value) {
  const v = String(value || '').trim()
  if (!v) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function isPhoneOk(value) {
  const v = String(value || '').trim()
  if (!v) return true // optional
  return PHONE_REGEX.test(v)
}

export default function Contact() {
  const { t } = useLanguage()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '', // honeypot
  })

  const [status, setStatus] = useState({ state: 'idle', message: '' }) // idle | sending | success | error

  // show errors after blur OR after a submit attempt
  const [touched, setTouched] = useState({
    email: false,
    phone: false,
    message: false,
  })
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const baseUrl = import.meta.env.VITE_CONTACT_API_URL

  const endpoint = useMemo(() => {
    if (!baseUrl) return null
    try {
      return new URL('/contact', baseUrl).toString()
    } catch {
      return null
    }
  }, [baseUrl])

  const errors = useMemo(() => {
    const e = {}

    if ((touched.email || submitAttempted) && !isEmailOk(form.email)) {
      e.email = t('contact.formEmailError')
    }

    if ((touched.phone || submitAttempted) && !isPhoneOk(form.phone)) {
      e.phone = t('contact.formPhoneError')
    }

    const msg = form.message.trim()
    if (touched.message || submitAttempted) {
      if (msg.length < 5) e.message = t('contact.formMessageError')
    }

    return e
  }, [form.email, form.phone, form.message, touched, submitAttempted, t])

  function onChange(e) {
    const { name, value } = e.target
    if (status.state !== 'idle') setStatus({ state: 'idle', message: '' })
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function onBlur(e) {
    const { name } = e.target
    if (name === 'email' || name === 'phone' || name === 'message') {
      setTouched((prev) => ({ ...prev, [name]: true }))
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSubmitAttempted(true)

    if (!endpoint) {
      setStatus({ state: 'error', message: t('contact.missingApiUrl') || 'Missing VITE_CONTACT_API_URL' })
      return
    }

    if (!form.name.trim()) {
      setStatus({ state: 'error', message: t('contact.formFixErrors') })
      return
    }

    if (errors.email || errors.phone || errors.message) {
      setStatus({ state: 'error', message: t('contact.formFixErrors') })
      return
    }

    setStatus({ state: 'sending', message: '' })

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          message: form.message.trim(),
          company: form.company, // honeypot
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || data?.ok !== true) throw new Error(data?.error || 'Failed to send')

      setStatus({ state: 'success', message: t('contact.formSuccess') })
      setForm({ name: '', email: '', phone: '', message: '', company: '' })
      setTouched({ email: false, phone: false, message: false })
      setSubmitAttempted(false)
    } catch (err) {
      setStatus({ state: 'error', message: err?.message || t('contact.formError') })
    }
  }

  const inputBase =
    'mt-1 w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1'
  const okInput = `${inputBase} border-slate-300 focus:border-slate-500 focus:ring-slate-500`
  const badInput = `${inputBase} border-rose-400 bg-rose-50 focus:border-rose-500 focus:ring-rose-500`

  return (
    <>
      <Section title={t('contact.pageTitle')} subtitle={t('contact.pageSubtitle')}>
        <div className="grid gap-10 md:grid-cols-[2fr,3fr]">
          <div className="space-y-4 text-sm text-slate-700">
            <p>{t('contact.intro')}</p>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">{t('contact.addressLabel')}</h3>
              <p className="mt-1 text-sm text-slate-700">
                {t('nav.brandTitle')}
                <br />
                4405 E Olympic Blvd
                <br />
                Los Angeles, CA 90023
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">{t('contact.hoursLabel')}</h3>
              <p className="mt-1 text-sm text-slate-700">{t('contact.hoursValue')}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">{t('contact.phoneLabel')}</h3>
              <p className="mt-1 space-y-1 text-sm text-slate-700">
                <span className="block">1 (323) 685-5771</span>
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">{t('contact.emailLabel')}</h3>
              <a
                href="mailto:montesioncenter@gmail.com"
                className="mt-1 block text-sm font-medium text-sky-700 underline underline-offset-4"
              >
                montesioncenter@gmail.com
              </a>
            </div>
          </div>

          <div>
            <MapSection />

            <form
              className="mt-6 grid gap-4 rounded-2xl bg-white p-6 text-sm shadow-sm ring-1 ring-slate-200"
              onSubmit={onSubmit}
              noValidate
            >
              {/* Honeypot */}
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={onChange}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {!endpoint && (
                <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-900 ring-1 ring-rose-200">
                  {t('contact.missingApiUrl') || 'Missing VITE_CONTACT_API_URL'}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {t('contact.formName')}
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={onChange}
                  className={okInput}
                  placeholder={t('contact.formNamePh')}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {t('contact.formEmail')}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={errors.email ? badInput : okInput}
                  placeholder={t('contact.formEmailPh')}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1 text-xs font-medium text-rose-700">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {t('contact.formPhone')}
                </label>
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  pattern={PHONE_PATTERN}
                  value={form.phone}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'contact-phone-error' : 'contact-phone-help'}
                  className={errors.phone ? badInput : okInput}
                  placeholder={t('contact.formPhonePh')}
                />
                {errors.phone ? (
                  <p id="contact-phone-error" className="mt-1 text-xs font-medium text-rose-700">
                    {errors.phone}
                  </p>
                ) : (
                  <p id="contact-phone-help" className="mt-1 text-xs text-slate-500">
                    {t('contact.formPhoneHelp')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {t('contact.formMessage')}
                </label>
                <textarea
                  name="message"
                  required
                  minLength={5}
                  value={form.message}
                  onChange={onChange}
                  onBlur={onBlur}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : 'contact-message-help'}
                  className={[errors.message ? badInput : okInput, 'min-h-[120px]'].join(' ')}
                  placeholder={t('contact.formMessagePh')}
                />
                {errors.message ? (
                  <p id="contact-message-error" className="mt-1 text-xs font-medium text-rose-700">
                    {errors.message}
                  </p>
                ) : (
                  <p id="contact-message-help" className="mt-1 text-xs text-slate-500">
                    {t('contact.formMessageHelp')}
                  </p>
                )}
              </div>

              {status.state !== 'idle' && (
                <div
                  className={[
                    'rounded-xl px-4 py-3 text-sm ring-1',
                    status.state === 'success'
                      ? 'bg-emerald-50 text-emerald-900 ring-emerald-200'
                      : status.state === 'error'
                        ? 'bg-rose-50 text-rose-900 ring-rose-200'
                        : 'bg-slate-50 text-slate-900 ring-slate-200',
                  ].join(' ')}
                  role="status"
                  aria-live="polite"
                >
                  {status.state === 'sending' ? t('contact.formSending') : status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={status.state === 'sending' || !endpoint}
                className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {t('contact.formSend')}
              </button>

              <p className="text-xs text-slate-500">{t('contact.formNote')}</p>
            </form>
          </div>
        </div>
      </Section>
    </>
  )
}
