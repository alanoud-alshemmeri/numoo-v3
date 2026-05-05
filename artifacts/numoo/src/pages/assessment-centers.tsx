import { Layout } from "@/components/layout";
import { useT } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ShieldCheck, Phone, Hash, BadgeCheck, Info } from "lucide-react";
import { WhatsAppShareButton } from "@/components/whatsapp-share-button";
import { shareCenter } from "@/lib/share";
import {
  ASSESSMENT_CENTERS,
  AUTHORITY_META,
  type CenterAuthority,
} from "@/lib/assessment-centers";

const toArabic = (n: string | number) =>
  String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

export default function AssessmentCentersPage() {
  const { t, lang } = useT();

  // Group by authority for cleaner presentation
  const grouped: Record<CenterAuthority, typeof ASSESSMENT_CENTERS> = {
    pada: [],
    moe: [],
    moh: [],
  };
  ASSESSMENT_CENTERS.forEach((c) => grouped[c.authority].push(c));

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0D2137] via-[#0a3d5c] to-[#063048] text-white p-6 pt-24 pb-10 flex-shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center border-2 border-primary/30">
            <ShieldCheck size={28} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-black mb-1">
              <BadgeCheck size={10} />
              {t("assessmentOfficialBadge")}
            </div>
            <h2 className="text-2xl font-black leading-tight">
              {t("assessmentTitle")}
            </h2>
          </div>
        </div>
        <p className="text-sm text-white/80 leading-relaxed">
          {t("assessmentDesc")}
        </p>
      </div>

      <div className="p-6 bg-background flex-1 pb-32">
        {/* Hero: Why this matters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-[#089b98] rounded-3xl p-6 text-white mb-6 shadow-lg shadow-primary/20"
        >
          <h3 className="font-black text-lg mb-2 flex items-center gap-2">
            <Info size={20} />
            {t("assessmentWhyTitle")}
          </h3>
          <p className="text-sm text-white/90 leading-relaxed">
            {t("assessmentWhyDesc")}
          </p>
        </motion.div>

        {/* Authority groups */}
        {(Object.keys(grouped) as CenterAuthority[]).map((auth, gi) => {
          const meta = AUTHORITY_META[auth];
          const items = grouped[auth];
          if (items.length === 0) return null;

          return (
            <motion.section
              key={auth}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * 0.08 }}
              className="mb-6"
            >
              {/* Authority header */}
              <div
                className="rounded-3xl p-4 mb-3 text-white shadow-md"
                style={{
                  background: `linear-gradient(135deg, ${meta.color}, ${meta.color}cc)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl drop-shadow">{meta.emoji}</span>
                  <div className="flex-1">
                    <h3 className="font-black text-base leading-tight">
                      {meta.label[lang]}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/25 text-xs font-black">
                    {items.length}
                  </span>
                </div>
              </div>

              {/* Center cards */}
              <div className="space-y-3">
                {items.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-card rounded-3xl p-5 shadow-sm border border-border hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      {/* Number badge */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-black text-lg shadow-md"
                        style={{ background: meta.color }}
                      >
                        {lang === "ar" ? toArabic(c.number) : c.number}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-black text-foreground leading-snug flex-1">
                            {c.unit[lang]}
                          </h4>
                          <WhatsAppShareButton
                            text={shareCenter({
                              name: `${c.unit[lang]} — ${c.parentName[lang]}`,
                              phone: c.phone ?? undefined,
                              lang,
                            })}
                            variant="icon"
                            testId={`button-share-center-${c.id}`}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                          <Hash size={10} />
                          {c.parentName[lang]}
                        </p>

                        {c.details && (
                          <p className="text-xs text-foreground/80 bg-muted/40 rounded-xl px-3 py-2 mb-3 leading-relaxed">
                            {c.details[lang]}
                          </p>
                        )}

                        {c.phone && (
                          <a
                            href={`tel:${c.phone}`}
                            className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold transition-colors"
                            dir="ltr"
                          >
                            <Phone size={14} />
                            {c.phone}
                          </a>
                        )}

                        {/* Official certification badge */}
                        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black border border-emerald-200 dark:border-emerald-900/50">
                          <BadgeCheck size={11} />
                          {t("assessmentRecognized")}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-900/50 rounded-3xl p-5 mt-2"
        >
          <div className="flex items-start gap-3">
            <BadgeCheck size={22} className="text-emerald-600 dark:text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <p className="font-black mb-1">{t("assessmentFooterTitle")}</p>
              <p>{t("assessmentFooterDesc")}</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-4 text-center">
          <p className="text-[11px] text-muted-foreground/70">{t("assessmentSource")}</p>
        </div>
      </div>
    </Layout>
  );
}
