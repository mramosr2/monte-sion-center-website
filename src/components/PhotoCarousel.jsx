// src/components/PhotoCarousel.jsx

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const modules = import.meta.glob('../assets/msc-photos/msc-photo-*.jpg', { eager: true });
const photos = Object.keys(modules)
  .sort()
  .map((key) => modules[key].default);

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const idxRef      = useRef(startIndex);   // always-current idx for key handler
  const closeBtnRef = useRef(null);
  const lastFocusRef = useRef(null);
  const thumbRefs   = useRef([]);           // one ref per thumbnail button
  const count = photos.length;

  const go = useCallback(
    (i) => {
      const next = ((i % count) + count) % count;
      idxRef.current = next;
      setIdx(next);
    },
    [count]
  );

  // Auto-scroll the thumbnail strip to keep the active thumb visible
  useEffect(() => {
    thumbRefs.current[idx]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [idx]);

  // Mount / unmount: scroll-lock + single keydown listener
  useEffect(() => {
    lastFocusRef.current = document.activeElement;
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    function onKey(e) {
      if (e.key === 'Escape')     { onClose(); return; }
      if (e.key === 'ArrowRight') { go(idxRef.current + 1); return; }
      if (e.key === 'ArrowLeft')  { go(idxRef.current - 1); return; }

      // Focus trap
      if (e.key === 'Tab') {
        const modal = document.querySelector('[data-carousel-lightbox]');
        if (!modal) return;
        const focusable = Array.from(
          modal.querySelectorAll("button, a[href], [tabindex='0']")
        ).filter((el) => !el.disabled);
        if (!focusable.length) return;
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    }

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prevOverflow;
      setTimeout(() => lastFocusRef.current?.focus(), 0);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div
      data-carousel-lightbox
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      style={{ zIndex: 999999 }}
      className="fixed inset-0 flex flex-col bg-black p-3 md:p-5"
    >
      {/* ── Top bar ── */}
      <div className="flex shrink-0 items-center justify-between pb-3">
        <span className="text-sm font-semibold text-white/70 select-none">
          {idx + 1}&thinsp;/&thinsp;{count}
        </span>
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Close ✕
        </button>
      </div>

      {/* ── Main image ── */}
      <div className="relative flex flex-1 min-h-0 items-center justify-center">
        <div
          className="absolute inset-0"
          onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        />

        <img
          key={idx}
          src={photos[idx]}
          alt={`Monte Sion Center — photo ${idx + 1} of ${count}`}
          className="relative z-10 max-h-full max-w-full object-contain rounded-lg"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(idxRef.current - 1)}
              className="absolute left-2 z-20 rounded-full bg-white/10 px-4 py-5 text-3xl font-bold leading-none text-white hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous photo"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(idxRef.current + 1)}
              className="absolute right-2 z-20 rounded-full bg-white/10 px-4 py-5 text-3xl font-bold leading-none text-white hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next photo"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnail strip — scrolls to keep active thumb centred ── */}
      <div className="mt-3 flex shrink-0 gap-2 overflow-x-auto pb-1">
        {photos.map((src, i) => (
          <button
            key={src}
            ref={(el) => (thumbRefs.current[i] = el)}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={[
              'h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
              i === idx
                ? 'ring-2 ring-white opacity-100 scale-105'
                : 'opacity-40 hover:opacity-75',
            ].join(' ')}
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      <p className="mt-2 shrink-0 text-center text-xs text-white/40 select-none">
        ← → to navigate · Esc to close
      </p>
    </div>,
    document.body
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────
export default function PhotoCarousel({ title, subtitle }) {
  const count = photos.length;
  const [current, setCurrent]     = useState(0);
  const [paused, setPaused]       = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const go = useCallback(
    (i) => setCurrent(((i % count) + count) % count),
    [count]
  );

  useEffect(() => {
    if (paused || lightboxIdx !== null || count <= 1) return;
    const id = setInterval(() => setCurrent((i) => (i + 1) % count), 5000);
    return () => clearInterval(id);
  }, [paused, lightboxIdx, count]);

  if (count === 0) return null;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">

        {(subtitle || title) && (
          <header className="mb-5">
            {subtitle && (
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0b3c72]">
                {title}
              </h2>
            )}
          </header>
        )}

        <div
          className="relative overflow-hidden rounded-2xl bg-[#0b3c72] shadow-lg ring-1 ring-slate-200"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative h-[360px] md:h-[520px]">

            {photos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIdx(i)}
                tabIndex={i === current ? 0 : -1}
                aria-label={`Expand photo ${i + 1}`}
                className={[
                  'absolute inset-0 h-full w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/60',
                  i === current ? 'z-10' : 'z-0 pointer-events-none',
                ].join(' ')}
              >
                <img
                  src={src}
                  alt={`Monte Sion Center — photo ${i + 1} of ${count}`}
                  className={[
                    'h-full w-full object-cover transition-opacity duration-700 ease-in-out',
                    i === current ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </button>
            ))}

            <div className="pointer-events-none absolute right-3 top-3 z-20 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Click to expand
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-black/55 to-transparent" />

            <span className="pointer-events-none absolute bottom-4 left-4 z-20 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm select-none">
              {current + 1}&thinsp;/&thinsp;{count}
            </span>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(current - 1); }}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 px-4 py-3 text-2xl font-bold leading-none text-white backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Previous photo"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); go(current + 1); }}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 px-4 py-3 text-2xl font-bold leading-none text-white backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Next photo"
            >
              ›
            </button>
          </div>
        </div>

        {count > 1 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {photos.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to photo ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
                className={[
                  'h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3c72]',
                  i === current
                    ? 'w-6 bg-[#0b3c72]'
                    : 'w-2 bg-slate-300 hover:bg-slate-400',
                ].join(' ')}
              />
            ))}
          </div>
        )}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          startIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
        />
      )}
    </section>
  );
}
