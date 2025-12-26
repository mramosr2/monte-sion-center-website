import { NavLink } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider.jsx';
import logo from '../assets/logo.png';

export default function NavBar() {
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { to: '/mission', label: t('nav.mission') },
    { to: '/programs', label: t('nav.programs') },
    { to: '/donate', label: t('nav.donate') },
    { to: '/contact', label: t('nav.contact') },
  ];

  const linkBase =
    'relative px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/90 transition-colors hover:text-white';

  const underline =
    "after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-[2px] after:bg-amber-300 after:origin-left after:scale-x-0 after:transition-transform after:duration-300";

  const linkClass = ({ isActive }) =>
    [linkBase, underline, isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100'].join(' ');

  return (
    <header className="sticky top-0 z-[2000] bg-[#0b3c72] shadow-sm">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center justify-between gap-6 py-4">
          <NavLink
  to="/"
  className="group relative flex items-center gap-3"
>
  <span className="pointer-events-none absolute left-0 right-0 -bottom-1 h-[2px] origin-left scale-x-0 bg-amber-300 transition-transform duration-300 group-hover:scale-x-100" />

            <img src={logo} alt={t('nav.logoAlt')} className="h-12 w-12 rounded-full" />
            <div className="leading-tight">
              <div className="font-semibold tracking-wide text-white">
                {t('nav.brandTitle').toUpperCase()}
              </div>
              <div className="text-xs font-medium text-white/80">
                {t('nav.brandSubtitle')}
              </div>
            </div>
          </NavLink>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85 md:block">
              {t('nav.languageLabel')}
            </div>

            <div className="flex rounded-full bg-white/10 p-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={[
                  'rounded-full px-3 py-1 text-xs font-semibold transition',
                  language === 'en'
                    ? 'bg-white text-[#0b3c72]'
                    : 'text-white/85 hover:text-white',
                ].join(' ')}
                aria-label={t('nav.english')}
              >
                {t('nav.english')}
              </button>
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={[
                  'rounded-full px-3 py-1 text-xs font-semibold transition',
                  language === 'es'
                    ? 'bg-white text-[#0b3c72]'
                    : 'text-white/85 hover:text-white',
                ].join(' ')}
                aria-label={t('nav.spanish')}
              >
                {t('nav.spanish')}
              </button>
            </div>
          </div>
        </div>

        {/* mobile nav */}
        <nav className="flex flex-wrap items-center gap-2 pb-3 md:hidden">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
