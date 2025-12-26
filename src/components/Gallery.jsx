import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

function clampIndex(i, len) {
  if (len <= 0) return 0;
  return (i + len) % len;
}

export default function Gallery({
  title,
  subtitle,
  images = [],
  className = "",
  size = "md", // "sm" | "md"
  showHeader = true,
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const hasImages = Array.isArray(images) && images.length > 0;

  const activeImage = useMemo(() => {
    if (!hasImages) return null;
    return images[clampIndex(active, images.length)];
  }, [active, images, hasImages]);

  // Key fix: make desktop heights “match” (3 small tiles + gaps ≈ 1 big tile)
  const bigHeight =
    size === "sm" ? "h-[220px] md:h-[300px]" : "h-[260px] md:h-[360px]";

  const smallHeight =
    size === "sm" ? "h-[120px] md:h-[90px]" : "h-[140px] md:h-[110px]";

  function openAt(index) {
    if (!hasImages) return;
    lastFocusedRef.current = document.activeElement;
    setActive(clampIndex(index, images.length));
    setOpen(true);
  }

  function close() {
    setOpen(false);
    setTimeout(() => {
      lastFocusedRef.current?.focus?.();
    }, 0);
  }

  function next() {
    setActive((i) => clampIndex(i + 1, images.length));
  }

  function prev() {
    setActive((i) => clampIndex(i - 1, images.length));
  }

  useEffect(() => {
    if (!open) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    setTimeout(() => closeBtnRef.current?.focus?.(), 0);

    const onKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();

      // Basic focus trap
      if (e.key === "Tab") {
        const modal = document.querySelector('[data-gallery-modal="true"]');
        if (!modal) return;

        const focusables = Array.from(
          modal.querySelectorAll(
            "button, a[href], input, select, textarea, [tabindex='0']"
          )
        ).filter((el) => !el.hasAttribute("disabled"));

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  const Modal =
    open && activeImage
      ? createPortal(
          <div
            data-gallery-modal="true"
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div className="relative w-full max-w-6xl">
              <div className="mb-3 flex items-center justify-end gap-2">
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Close gallery (Esc)"
                >
                  Close ✕
                </button>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl">
                <img
                  src={activeImage.src}
                  alt={activeImage.alt || ""}
                  className="max-h-[70vh] w-full object-contain"
                />

                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Previous image (Left arrow)"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-4 py-3 text-white outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Next image (Right arrow)"
                >
                  ›
                </button>
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => {
                  const isActive = i === active;
                  return (
                    <button
                      key={`${img.src}-${i}`}
                      type="button"
                      onClick={() => setActive(i)}
                      className={[
                        "relative flex-shrink-0 overflow-hidden rounded-xl outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 focus-visible:ring-white",
                        isActive
                          ? "ring-2 ring-white"
                          : "opacity-80 hover:opacity-100",
                      ].join(" ")}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt || ""}
                        className="h-16 w-24 object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>

              <p className="mt-2 text-center text-xs text-white/80">
                Tip: Use <strong>←</strong> and <strong>→</strong> to navigate,{" "}
                <strong>Esc</strong> to close.
              </p>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <section className={className}>
      {showHeader && (subtitle || title) && (
        <header className="mb-4">
          {subtitle && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[#0b2a4a]">
              {title}
            </h2>
          )}
        </header>
      )}

      {/* NOTE: heights live on the buttons; images fill with h-full */}
      <div className="grid gap-4 md:grid-cols-12">
        {images.slice(0, 1).map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => openAt(idx)}
            className={[
              "box-border group relative overflow-hidden rounded-2xl border border-white/60 bg-white shadow-sm outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-600 md:col-span-8",
              bigHeight,
            ].join(" ")}
          >
            <img
              src={img.src}
              alt={img.alt || ""}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="sr-only">Open image</span>
          </button>
        ))}

        <div className="grid gap-4 md:col-span-4">
          {images.slice(1, 4).map((img, idx) => {
            const realIndex = idx + 1;
            return (
              <button
                key={img.src}
                type="button"
                onClick={() => openAt(realIndex)}
                className={[
                  "box-border group relative overflow-hidden rounded-2xl border border-white/60 bg-white shadow-sm outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-600",
                  smallHeight,
                ].join(" ")}
              >
                <img
                  src={img.src}
                  alt={img.alt || ""}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="sr-only">Open image</span>
              </button>
            );
          })}
        </div>
      </div>

      {Modal}
    </section>
  );
}
