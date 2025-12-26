import Section from "../components/Section.jsx";
import Gallery from "../components/Gallery.jsx";
import { galleries } from "../galleries.js";
import { useLanguage } from "../i18n/LanguageProvider.jsx";

function ProgramCard({ title, subtitle, children }) {
  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {subtitle && (
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
          {subtitle}
        </p>
      )}
      <div className="mt-3 space-y-2 text-sm text-slate-700">{children}</div>
    </div>
  );
}

export default function Programs() {
  const { t } = useLanguage();

  return (
    <>
      <Section title={t("programs.pageTitle")} subtitle={t("programs.pageSubtitle")}>
        <div className="grid gap-6 md:grid-cols-3">
          <ProgramCard
            title={t("programs.card1Title")}
            subtitle={t("programs.card1Subtitle")}
          >
            <p>{t("programs.card1P1")}</p>
            <p>{t("programs.card1P2")}</p>
          </ProgramCard>

          <ProgramCard title={t("programs.card2Title")}>
            <p>{t("programs.card2P1")}</p>
          </ProgramCard>

          <ProgramCard title={t("programs.card3Title")}>
            <p>{t("programs.card3P1")}</p>
          </ProgramCard>
        </div>
      </Section>

      <Section title={t("programs.actionTitle")} subtitle={t("programs.actionSubtitle")}>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
          {/* Gallery (no internal header so it doesn't repeat the Section title) */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <Gallery images={galleries.programs} showHeader={false} />
          </div>

          <div className="space-y-3 text-sm text-slate-700">
            <p>{t("programs.actionP1")}</p>
            <p>{t("programs.actionP2")}</p>
          </div>
        </div>
      </Section>

      <Section title={t("programs.serveTitle")} subtitle={t("programs.serveSubtitle")}>
        <div className="grid gap-8 md:grid-cols-[2fr,3fr] text-sm text-slate-700">
          <div className="space-y-3">
            <p>{t("programs.serveP1")}</p>
            <p>{t("programs.serveP2")}</p>
          </div>

          <div className="space-y-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-base font-semibold text-slate-900">
              {t("programs.rolesTitle")}
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>{t("programs.role1")}</li>
              <li>{t("programs.role2")}</li>
              <li>{t("programs.role3")}</li>
              <li>{t("programs.role4")}</li>
              <li>{t("programs.role5")}</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
