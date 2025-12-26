import { useLanguage } from '../i18n/LanguageProvider.jsx';

export default function MapSection() {
  const { t } = useLanguage();

  return (
    <div className="mt-4 h-80 w-full overflow-hidden rounded-xl shadow-md ring-1 ring-slate-200">
      <iframe
        title={t('map.iframeTitle')}
        src="https://www.google.com/maps?q=4405%20E%20Olympic%20Blvd%20Los%20Angeles%20CA%2090023&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
