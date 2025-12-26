function IconInstagram({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.4-2.65a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"
      />
    </svg>
  );
}

function IconFacebook({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 22v-8h2.6l.4-3h-3V9.1c0-.9.2-1.5 1.5-1.5h1.7V5a22 22 0 0 0-2.5-.1c-2.4 0-4 1.4-4 4.1V11H8v3h2.2v8h3.3Z"
      />
    </svg>
  );
}

function IconTikTok({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.6 3c.5 2.5 2.2 4.2 4.7 4.6v3.1c-1.7 0-3.3-.5-4.7-1.4v6.1c0 3.6-2.9 6.6-6.6 6.6S3.4 19 3.4 15.4s2.9-6.6 6.6-6.6c.4 0 .8 0 1.2.1v3.4c-.4-.2-.8-.3-1.2-.3-1.8 0-3.3 1.5-3.3 3.3S8.2 18.7 10 18.7s3.3-1.5 3.3-3.3V3h3.3Z"
      />
    </svg>
  );
}

const DEFAULT_LINKS = {
  instagram: 'https://www.instagram.com/montesioncenterfoodbank/',
  facebook: 'https://www.facebook.com/MonteSionCenter',
  tiktok: 'https://www.tiktok.com/@montesioncenterfo',
};

export default function SocialLinks({
  variant = 'hero', // 'hero' | 'footer'
  className = '',
  links = DEFAULT_LINKS,
}) {
  const isFooter = variant === 'footer';

  const circleSize = isFooter ? 'h-10 w-10' : 'h-14 w-14';
  const iconSize = isFooter ? 'h-5 w-5' : 'h-7 w-7';

  const base =
    'group relative inline-flex items-center justify-center rounded-full border border-slate-200/70 bg-white/70 text-[#0b3c72] shadow-sm backdrop-blur transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3c72]/40 focus-visible:ring-offset-2';
  const lift = 'hover:-translate-y-1 hover:shadow-md active:translate-y-0';
  const underline =
    'after:absolute after:-bottom-2 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-[#0b3c72] after:transition-all after:duration-300 group-hover:after:w-8';

  const itemClass = [base, lift, underline, circleSize].join(' ');

  return (
    <div className={['flex items-center justify-center gap-4', className].join(' ')}>
      <a
        className={itemClass}
        href={links.instagram}
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        title="Instagram"
      >
        <IconInstagram className={iconSize} />
      </a>

      <a
        className={itemClass}
        href={links.facebook}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
        title="Facebook"
      >
        <IconFacebook className={iconSize} />
      </a>

      <a
        className={itemClass}
        href={links.tiktok}
        target="_blank"
        rel="noreferrer"
        aria-label="TikTok"
        title="TikTok"
      >
        <IconTikTok className={iconSize} />
      </a>
    </div>
  );
}

