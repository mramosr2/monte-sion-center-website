import Section from "../components/Section.jsx";
import Gallery from "../components/Gallery.jsx";
import { galleries } from "../galleries.js";
import { useLanguage } from "../i18n/LanguageProvider.jsx";

export default function Mission() {
  const { t } = useLanguage();

  return (
    <>
      <Section title={t("mission.pageTitle")} subtitle={t("mission.pageSubtitle")}>
        <div className="space-y-6">
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-slate-700">
            <p className="font-semibold text-slate-900">{t("mission.leadTitle")}</p>
            <p>{t("mission.leadP1")}</p>
            <p>{t("mission.leadP2")}</p>
          </div>

          <Gallery images={galleries.mission} size="sm" />
        </div>
      </Section>

      <Section title={t("mission.statementTitle")} subtitle={t("mission.statementSubtitle")}>
        <div className="max-w-4xl space-y-4 text-sm leading-relaxed text-slate-700">
          <p>{t("mission.statementP1")}</p>
          <p>{t("mission.statementP2")}</p>
          <p>{t("mission.statementP3")}</p>
          <p>{t("mission.statementP4")}</p>
        </div>
      </Section>

      <Section title={t("mission.principlesTitle")} subtitle={t("mission.principlesSubtitle")}>
        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-3 text-sm text-slate-700">
            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-base font-semibold text-slate-900">
                {t("mission.p1Title")}
              </h3>
              <p className="mt-2">{t("mission.p1Body")}</p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-base font-semibold text-slate-900">
                {t("mission.p2Title")}
              </h3>
              <p className="mt-2">{t("mission.p2Body")}</p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-base font-semibold text-slate-900">
                {t("mission.p3Title")}
              </h3>
              <p className="mt-2">{t("mission.p3Body")}</p>
            </div>
          </div>

          {/* Full principles text (readable, scannable) */}
          <div className="max-w-4xl space-y-4 text-sm leading-relaxed text-slate-700">
            <p>{t("mission.principlesP1")}</p>
            <p>{t("mission.principlesP2")}</p>
            <p>{t("mission.principlesP3")}</p>
            <p>{t("mission.principlesP4")}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
