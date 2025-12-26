import { useLanguage } from '../i18n/LanguageProvider.jsx';
import SocialLinks from './SocialLinks.jsx';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#002548] bg-[#003b73] text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left */}
          <div>
            <div className="font-semibold">{t('nav.brandTitle')}</div>
            <p className="text-xs text-slate-200">{t('footer.addressLine')}</p>
          </div>

          {/* Center socials */}
          <div className="flex justify-center md:flex-1">
            <SocialLinks variant="footer" />
          </div>

          {/* Right */}
          <p className="text-xs text-slate-200">
            © {year} {t('nav.brandTitle')}. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
