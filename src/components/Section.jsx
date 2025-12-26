import ScrollReveal from './ScrollReveal.jsx';

export default function Section({ title, subtitle, children, centered = false }) {
  return (
    <section className="py-12">
      <ScrollReveal>
        <div className="mx-auto max-w-6xl px-4">
          {(title || subtitle) && (
            <header className={centered ? 'text-center' : ''}>
              {subtitle && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0b2a4a]/70">
                  {subtitle}
                </p>
              )}
              {title && (
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0b2a4a]">
                  {title}
                </h2>
              )}
            </header>
          )}
          <div className={title || subtitle ? 'mt-6' : ''}>
            {children}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
