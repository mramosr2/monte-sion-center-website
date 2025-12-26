import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-placeholder.svg';
import { useLanguage } from '../i18n/LanguageProvider.jsx';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-blue-950 text-white fade-in">
      {/* Very subtle background photo so the blue stays dark */}
      <img
        src={heroImage}
        alt={t('hero.bgAlt')}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
      />

      {/* Strong deep-blue overlay to match header/footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-950 to-blue-950" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-10 px-4 py-16 md:flex-row md:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
            MONTE SIÓN CENTER • EAST LOS ANGELES
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            {t('hero.headline')}
          </h1>
          <p className="mt-4 text-sm md:text-base text-slate-100/90">
            {t('hero.body')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            {/* Primary Donate button in warm yellow/orange */}
            <Link
              to="/donate"
              className="rounded-full bg-amber-400 px-5 py-2 font-semibold text-slate-900 shadow-sm hover:bg-amber-300"
            >
              {t('hero.ctaDonate')}
            </Link>
            <Link
              to="/mission"
              className="rounded-full border border-white/80 px-5 py-2 font-medium text-white hover:bg-white/10"
            >
              {t('hero.ctaMission')}
            </Link>
          </div>
        </div>

        {/* Right-hand info cards */}
        <div className="grid w-full max-w-sm gap-4 text-xs md:text-sm fade-in-delayed">
          <div className="rounded-2xl bg-blue-900/90 p-4 shadow-lg ring-1 ring-blue-950/80">
            <p className="font-medium text-slate-50">{t('hero.cardWeeklyTitle')}</p>
            <p className="mt-1 text-slate-200">
              {t('hero.cardWeeklyBody')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-blue-900/90 p-4 shadow-lg ring-1 ring-blue-950/80">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-300">
                {t('hero.cardAddressLabel')}
              </p>
              <p className="mt-1 text-slate-100">
                4405 E Olympic Blvd
                <br />
                Los Angeles, CA 90023
              </p>
            </div>
            <div className="rounded-2xl bg-blue-900/90 p-4 shadow-lg ring-1 ring-blue-950/80">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-300">
                {t('hero.cardGetInvolvedLabel')}
              </p>
              <p className="mt-1 text-slate-100">
                {t('hero.cardGetInvolvedBody')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
