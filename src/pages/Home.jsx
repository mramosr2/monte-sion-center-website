// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageProvider.jsx'
import Section from '../components/Section.jsx'
import Gallery from '../components/Gallery.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import bibleIcon from '../assets/3004275.png'
import { galleries } from '../galleries.js'

import homeHeroPhoto from '../assets/photos/home-hero-foodbank-sunset.png'

export default function Home() {
  const { t } = useLanguage()
  const [heroReady, setHeroReady] = useState(false)

  useEffect(() => {
    // fade in even if the image loads instantly (cache)
    const id = requestAnimationFrame(() => setHeroReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <>
      {/* HERO (blue background + blended photo on the right) */}
      <section className="relative overflow-hidden bg-[#003b73] text-white">
        {/* Right-side photo that blends into the blue */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[52%]">
          <img
            src={homeHeroPhoto}
            alt=""
            aria-hidden="true"
            onLoad={() => setHeroReady(true)}
            className={[
              'h-full w-full object-cover',
              'transition-opacity duration-700 ease-out',
              heroReady ? 'opacity-90' : 'opacity-10',
            ].join(' ')}
          />

          {/* Fade the photo INTO the blue so it doesn’t look “placed” */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#003b73]/35 to-[#003b73]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#003b73]/10 via-transparent to-[#003b73]/55" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-6xl">
              {t('hero.headline')}
            </h1>
            <p className="mt-4 max-w-xl text-white/85">{t('hero.body')}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/donate"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#003b73] shadow-sm transition hover:bg-white/90"
              >
                {t('hero.ctaDonate')}
              </Link>
              <Link
                to="/mission"
                className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {t('hero.ctaMission')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Body background */}
      <div className="bg-gradient-to-b from-[#eef5ff] via-white to-[#eef5ff]">
        {/* Welcome / What is MSC */}
        <Section className="pt-12 md:pt-14">
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                {t('home.whatSubtitle')}
              </p>
              <h2 className="mt-2 text-4xl font-semibold tracking-tight text-[#0b3c72]">
                {t('home.whatTitle')}
              </h2>

              <div className="mt-5 space-y-4 text-slate-700">
                <p>{t('home.whatP1')}</p>
                <p>{t('home.whatP2')}</p>
              </div>
            </div>

            <div className="md:col-span-6">
              <div className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-sm backdrop-blur">
                <h3 className="text-xl font-semibold text-slate-900">{t('home.joinTitle')}</h3>

                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">{t('home.joinFoodLabel')}</span>{' '}
                    {t('home.joinFoodBody')}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">{t('home.joinPrayerLabel')}</span>{' '}
                    {t('home.joinPrayerBody')}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">{t('home.joinMissionsLabel')}</span>{' '}
                    {t('home.joinMissionsBody')}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/programs"
                    className="rounded-full bg-[#0b3c72] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a3463]"
                  >
                    {t('home.seePrograms')}
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    {t('home.contactVisit')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Hope / Verse + Gallery */}
        <Section className="pt-14">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {t('home.hopeSubtitle')}
            </p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-[#0b3c72]">
              {t('home.hopeTitle')}
            </h2>
          </div>

          {/* Verse card */}
          <div className="mt-7">
            <div className="mx-auto max-w-5xl rounded-3xl border border-white/60 bg-white/70 p-8 text-center shadow-sm backdrop-blur">
              <div className="mx-auto mb-3 flex items-center justify-center">
                <img src={bibleIcon} alt="" className="h-10 w-10" aria-hidden="true" />
              </div>

              <h3 className="text-3xl font-semibold tracking-tight text-slate-900">
                {t('home.verseTitle')}
              </h3>
              <p className="mx-auto mt-3 max-w-3xl text-slate-700">{t('home.verseBody')}</p>
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-8">
  <div className="mx-auto max-w-5xl rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
    <Gallery images={galleries.home} showHeader={false} size="sm" />
  </div>
</div>

        </Section>

        {/* Socials */}
        <Section className="pt-14">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {t('home.socialKicker')}
            </p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-[#0b3c72]">
              {t('home.socialTitle')}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-700">{t('home.socialBody')}</p>

            <div className="mt-7">
              <SocialLinks variant="hero" />
            </div>
          </div>
        </Section>

        {/* Get involved cards */}
        <Section className="py-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {t('home.storySubtitle')}
            </p>
            <h2 className="mt-2 text-4xl font-semibold tracking-tight text-[#0b3c72]">
              {t('home.storyTitle')}
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur">
              <h3 className="text-xl font-semibold text-slate-900">{t('home.prayTitle')}</h3>
              <p className="mt-2 text-sm text-slate-700">{t('home.prayBody')}</p>
            </div>

            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur">
              <h3 className="text-xl font-semibold text-slate-900">{t('home.serveTitle')}</h3>
              <p className="mt-2 text-sm text-slate-700">{t('home.serveBody')}</p>
            </div>

            <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur">
              <h3 className="text-xl font-semibold text-slate-900">{t('home.giveTitle')}</h3>
              <p className="mt-2 text-sm text-slate-700">{t('home.giveBody')}</p>
              <Link
                to="/donate"
                className="mt-4 inline-flex text-sm font-semibold text-[#0b3c72] underline decoration-[#0b3c72]/30 underline-offset-4 hover:decoration-[#0b3c72]"
              >
                {t('home.learnGiving')}
              </Link>
            </div>
          </div>
        </Section>
      </div>
    </>
  )
}
