// src/pages/Donate.jsx
import { useEffect, useRef, useState } from "react";
import Section from "../components/Section.jsx";
import Gallery from "../components/Gallery.jsx";
import { galleries } from "../galleries.js";
import { useLanguage } from "../i18n/LanguageProvider.jsx";

import paypalQr from "../assets/donate/paypal-qr.png";
import venmoQr from "../assets/donate/venmo-qr.png";
import zelleQr from "../assets/donate/zelle-qr.png";

const PAYPAL_URL =
  "https://www.paypal.com/qrcodes/managed/c3d1e002-285d-4953-9544-65eaa7ed4b7a";
const VENMO_URL = "https://venmo.com/code?user_id=2886081557037056690";
const ZELLE_EMAIL = "montesioncenter@gmail.com";
const ZELLE_QR_URL =
  "https://enroll.zellepay.com/qr-codes?data=ewogICJuYW1lIiA6ICJNT05URSBTSU9OIENFTlRFUiIsCiAgInRva2VuIiA6ICJtb250ZXNpb25jZW50ZXJAZ21haWwuY29tIiwKICAiYWN0aW9uIiA6ICJwYXltZW50Igp9";

function DonateModal({ open, onClose, title, t }) {
  const closeBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    if (!open) return;

    // remember focus + lock background scroll (iPhone-safe)
    lastFocusedRef.current = document.activeElement;

    const scrollY = window.scrollY;
    const prevBodyPosition = document.body.style.position;
    const prevBodyTop = document.body.style.top;
    const prevBodyWidth = document.body.style.width;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    setTimeout(() => closeBtnRef.current?.focus?.(), 0);

    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);

      document.body.style.position = prevBodyPosition;
      document.body.style.top = prevBodyTop;
      document.body.style.width = prevBodyWidth;

      window.scrollTo(0, scrollY);
      setTimeout(() => lastFocusedRef.current?.focus?.(), 0);
    };
  }, [open, onClose]);

  async function copy(text, key) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // ignore
    }
  }

  if (!open) return null;

  const methods = [
    {
      key: "paypal",
      name: "PayPal",
      url: PAYPAL_URL,
      qr: paypalQr,
      qrAlt: t("donate.qrAltPaypal"),
      note: t("donate.paypalNote"),
    },
    {
      key: "venmo",
      name: "Venmo",
      url: VENMO_URL,
      qr: venmoQr,
      qrAlt: t("donate.qrAltVenmo"),
      note: t("donate.venmoNote"),
      copyLabel: t("donate.venmoHandleLabel"),
      copyValue: "@MonteSionCenter",
    },
    {
      key: "zelle",
      name: "Zelle",
      url: ZELLE_QR_URL,
      qr: zelleQr,
      qrAlt: t("donate.qrAltZelle"),
      note: t("donate.zelleNote"),
      copyLabel: t("donate.zelleEmailLabel"),
      copyValue: ZELLE_EMAIL,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop (click to close) */}
      <div
        className="fixed inset-0 bg-slate-900/50"
        aria-hidden="true"
        onMouseDown={onClose}
      />

      {/* Layout: top on mobile (scrollable), centered on desktop */}
      <div className="relative min-h-[100dvh] w-full p-4 flex items-start justify-center md:items-center">
        {/* Modal card (stop backdrop click) */}
        <div
          className="w-full max-w-5xl my-6 md:my-0 max-h-[calc(100dvh-2rem)] rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 flex flex-col overflow-hidden"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="shrink-0 flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{t("donate.modalHint")}</p>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              {t("donate.close")}
            </button>
          </div>

          {/* Scroll area (works on iPhone) */}
          <div className="flex-1 overflow-y-auto p-5 overscroll-contain [-webkit-overflow-scrolling:touch]">
            <div className="grid gap-4 md:grid-cols-3">
              {methods.map((m) => (
                <div
                  key={m.key}
                  className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-slate-900">{m.name}</h4>
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      {t("donate.open")}
                    </a>
                  </div>

                  <p className="mt-2 text-xs text-slate-600">{m.note}</p>

                  <div className="mt-3 rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                    <img
                      src={m.qr}
                      alt={m.qrAlt}
                      className="mx-auto w-full max-w-[240px] aspect-square object-contain"
                      loading="lazy"
                    />
                  </div>

                  {m.copyValue && (
                    <div className="mt-3 rounded-xl bg-white p-3 ring-1 ring-slate-200">
                      <p className="text-xs font-semibold text-slate-700">{m.copyLabel}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <code className="text-xs text-slate-800">{m.copyValue}</code>
                        <button
                          type="button"
                          onClick={() => copy(m.copyValue, m.key)}
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                        >
                          {copiedKey === m.key ? t("donate.copied") : t("donate.copy")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="shrink-0 border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
            {t("donate.accessibilityNote")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Donate() {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  // Only keep the Custom Amount tier
  const customTier = {
    label: t("donate.tier3Label"),
    description: t("donate.tier3Desc"),
  };

  return (
    <>
      <Section title={t("donate.pageTitle")} subtitle={t("donate.pageSubtitle")}>
        <div className="grid gap-10 md:grid-cols-[3fr,2fr] items-start">
          {/* LEFT column */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">{customTier.label}</h3>
              <p className="mt-1 text-sm text-slate-600">{customTier.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={PAYPAL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  {t("donate.openPaypal")}
                </a>
                <a
                  href={VENMO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-200"
                >
                  {t("donate.openVenmo")}
                </a>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-200"
                >
                  {t("donate.openOptions")}
                </button>
              </div>

              <p className="mt-4 text-xs text-slate-500">{t("donate.disclaimer")}</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">{t("donate.methodsTitle")}</h3>
              <p className="mt-1 text-xs text-slate-600">{t("donate.methodsSubtitle")}</p>

              <div className="mt-4 grid gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 hover:shadow-md transition"
                >
                  {t("donate.methodsBtn")}
                </button>

                <div className="grid gap-2 md:grid-cols-3">
                  <a
                    className="rounded-xl bg-slate-100 px-4 py-3 text-center text-xs font-semibold text-slate-800 hover:bg-slate-200"
                    href={PAYPAL_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("donate.openPaypal")}
                  </a>
                  <a
                    className="rounded-xl bg-slate-100 px-4 py-3 text-center text-xs font-semibold text-slate-800 hover:bg-slate-200"
                    href={VENMO_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("donate.openVenmo")}
                  </a>
                  <button
                    type="button"
                    className="rounded-xl bg-slate-100 px-4 py-3 text-center text-xs font-semibold text-slate-800 hover:bg-slate-200"
                    onClick={() => setModalOpen(true)}
                  >
                    {t("donate.openZelle")}
                  </button>
                </div>

                <p className="text-xs text-slate-500">{t("donate.accessibilityNote")}</p>
              </div>
            </div>
          </div>

          {/* RIGHT column */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">{t("donate.galleryTitle")}</h3>
              <p className="mt-1 text-xs text-slate-600">{t("donate.gallerySubtitle")}</p>

              <div className="mt-4">
                <Gallery title="" images={galleries.donate} showHeader={false} />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">{t("donate.receiptTitle")}</h3>
              <p className="mt-1 text-sm text-slate-600">{t("donate.receiptText")}</p>
            </div>
          </div>
        </div>
      </Section>

      <DonateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t("donate.modalTitle")}
        t={t}
      />
    </>
  );
}
