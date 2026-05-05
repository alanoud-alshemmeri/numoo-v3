import { useMemo, useState } from "react";
import { Layout } from "@/components/layout";
import { useT } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Search, Stethoscope, MapPin, Heart, AlertTriangle, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { WhatsAppShareButton } from "@/components/whatsapp-share-button";
import { shareDoctor } from "@/lib/share";
import {
  DOCTOR_SPECIALTIES,
  getDoctorCount,
  type DoctorSpecialty,
  type SpecialtyGroup,
} from "@/lib/doctors";

export default function DoctorsPage() {
  const { t, lang } = useT();
  const [activeSpecialty, setActiveSpecialty] = useState<DoctorSpecialty | "all">("all");
  const [query, setQuery] = useState("");

  const total = getDoctorCount();

  const visibleGroups = useMemo<SpecialtyGroup[]>(() => {
    const q = query.trim().toLowerCase();
    return DOCTOR_SPECIALTIES.filter(
      (g) => activeSpecialty === "all" || g.id === activeSpecialty,
    )
      .map((g) => ({
        ...g,
        doctors: g.doctors.filter((d) => {
          if (!q) return true;
          const hay = (
            d.name +
            " " +
            (d.nameEn ?? "") +
            " " +
            (d.location ?? "") +
            " " +
            (d.locationEn ?? "") +
            " " +
            (d.note ?? "") +
            " " +
            g.label.ar +
            " " +
            g.label.en
          ).toLowerCase();
          return hay.includes(q);
        }),
      }))
      .filter((g) => g.doctors.length > 0);
  }, [activeSpecialty, query]);

  const filteredCount = visibleGroups.reduce((s, g) => s + g.doctors.length, 0);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white p-6 pt-24 pb-8 flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Stethoscope size={24} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-black">{t("doctorsTitle")}</h2>
            <p className="text-xs text-white/70 mt-1">{t("doctorsDesc")}</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-background flex-1 pb-32">
        {/* Trust banner: parent-shared */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 rounded-3xl p-5 mb-3"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Heart size={20} className="text-primary" />
            </div>
            <div className="flex-1 text-sm">
              <h3 className="font-black text-foreground mb-1">{t("doctorsTrustTitle")}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("doctorsTrustDesc")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Methodology / transparency card */}
        <motion.details
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#FFF7EE] border border-[#E0A858]/40 rounded-3xl p-4 mb-5 group"
        >
          <summary className="cursor-pointer flex items-start gap-3 list-none">
            <div className="w-9 h-9 rounded-xl bg-[#E0A858]/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={16} className="text-[#8a6800]" />
            </div>
            <div className="flex-1">
              <div className="font-black text-[#0D2137] text-sm mb-0.5">
                {lang === "ar" ? "كيف جُمِعت هذه القائمة؟" : "How was this list compiled?"}
              </div>
              <div className="text-[11px] text-[#8a6800] font-bold">
                {lang === "ar" ? "اضغطي للتفاصيل ↓" : "Tap to expand ↓"}
              </div>
            </div>
          </summary>
          <div className="mt-3 pt-3 border-t border-[#E0A858]/30 space-y-2 text-xs text-[#5a4400] leading-relaxed">
            <p>
              <strong className="text-[#0D2137]">
                {lang === "ar" ? "المصدر: " : "Source: "}
              </strong>
              {lang === "ar"
                ? "تجارب أمّهات كويتيات في مجموعات الدعم. هذه قائمة مرجعية ابتدائية، وليست قائمة معتمدة من جهة طبية رسمية."
                : "Kuwaiti mothers' shared experiences in support groups. This is an initial reference list, not an officially endorsed medical list."}
            </p>
            <p>
              <strong className="text-[#0D2137]">
                {lang === "ar" ? "المنهجية: " : "Methodology: "}
              </strong>
              {lang === "ar"
                ? "كل اسم يجب أن يُذكر إيجاباً من ٣ أمّهات على الأقل قبل الإدراج. لا نتقاضى أي رسوم من الأطبّاء."
                : "Each name must be positively mentioned by at least 3 mothers before inclusion. We accept no fees from doctors."}
            </p>
            <p>
              <strong className="text-[#0D2137]">
                {lang === "ar" ? "تنبيه: " : "Disclaimer: "}
              </strong>
              {lang === "ar"
                ? "اختيار الطبيب قرار شخصي. تحقّقي دائماً من ترخيص الطبيب عبر وزارة الصحة الكويتية قبل الحجز."
                : "Choosing a doctor is a personal decision. Always verify licensing via the Kuwait Ministry of Health before booking."}
            </p>
            <p className="pt-1 text-[10.5px] text-[#8a6800]">
              {lang === "ar"
                ? "تريدين إضافة طبيب أو تصحيح؟ راسلينا: support@numoo.kw"
                : "Want to add a doctor or correct info? Email us: support@numoo.kw"}
            </p>
          </div>
        </motion.details>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={18}
            className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${
              lang === "ar" ? "right-4" : "left-4"
            }`}
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("doctorsSearchPlaceholder")}
            className={`h-12 rounded-2xl bg-card border-border text-foreground ${
              lang === "ar" ? "pr-11" : "pl-11"
            }`}
          />
        </div>

        {/* Specialty filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1 scrollbar-thin">
          <SpecChip
            active={activeSpecialty === "all"}
            onClick={() => setActiveSpecialty("all")}
            label={t("filterAll")}
            count={total}
            color="#0BB4B0"
          />
          {DOCTOR_SPECIALTIES.map((g) => (
            <SpecChip
              key={g.id}
              active={activeSpecialty === g.id}
              onClick={() => setActiveSpecialty(g.id)}
              label={`${g.emoji} ${g.label[lang]}`}
              count={g.doctors.length}
              color={g.color}
            />
          ))}
        </div>

        <div className="text-xs text-muted-foreground mb-4 font-bold">
          {filteredCount} {t("doctorsCountSuffix")}
        </div>

        {/* Specialty groups */}
        {visibleGroups.length === 0 ? (
          <div className="bg-card rounded-3xl p-8 text-center text-muted-foreground border border-border">
            {t("noResults")}
          </div>
        ) : (
          <div className="space-y-6">
            {visibleGroups.map((group, gi) => (
              <motion.section
                key={group.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(gi * 0.04, 0.2) }}
              >
                {/* Group header */}
                <div
                  className="rounded-3xl p-4 mb-3 text-white shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${group.color}, ${group.color}cc)`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl drop-shadow">{group.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-black text-lg leading-tight">
                        {group.label[lang]}
                      </h3>
                      <p className="text-xs text-white/85 mt-0.5">
                        {group.intro[lang]}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/25 text-xs font-black">
                      {group.doctors.length}
                    </span>
                  </div>
                </div>

                {/* Doctor cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {group.doctors.map((d, i) => (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.02, 0.3) }}
                      className="bg-card rounded-2xl p-4 shadow-sm border border-border hover:border-primary/40 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-base font-black"
                          style={{
                            background: `${group.color}1a`,
                            color: group.color,
                          }}
                        >
                          {group.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-foreground leading-snug">
                            {lang === "en" && d.nameEn ? d.nameEn : d.name}
                          </h4>
                          {(d.location || d.locationEn) && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                              <MapPin size={12} className="flex-shrink-0" />
                              <span className="truncate">
                                {lang === "en" && d.locationEn
                                  ? d.locationEn
                                  : d.location}
                              </span>
                            </div>
                          )}
                          {(d.note || d.noteEn) && (
                            <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                              <Sparkles size={10} />
                              {lang === "en" && d.noteEn ? d.noteEn : d.note}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1.5">
                          <WhatsAppShareButton
                            text={shareDoctor({
                              name:
                                lang === "en" && d.nameEn ? d.nameEn : d.name,
                              specialty: group.label[lang],
                              location:
                                lang === "en" && d.locationEn
                                  ? d.locationEn
                                  : d.location,
                              note:
                                lang === "en" && d.noteEn ? d.noteEn : d.note,
                              lang,
                            })}
                            variant="icon"
                            testId={`button-share-doctor-${d.id}`}
                          />
                          <a
                            href={`https://www.google.com/search?q=${encodeURIComponent(
                              (lang === "en" && d.nameEn ? d.nameEn : d.name) +
                                " " +
                                (d.location ?? "") +
                                " الكويت",
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-primary hover:underline whitespace-nowrap"
                          >
                            {t("doctorsSearchOnline")}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-900/50 rounded-3xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <p className="font-black mb-1">{t("doctorsWarningTitle")}</p>
              <p>{t("doctorsWarningDesc")}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-[11px] text-muted-foreground/70">{t("doctorsSource")}</p>
        </div>
      </div>
    </Layout>
  );
}

function SpecChip({
  active,
  onClick,
  label,
  count,
  color,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border-2"
      style={
        active
          ? { background: color, color: "white", borderColor: color }
          : {
              background: "var(--card)",
              color: "var(--foreground)",
              borderColor: `${color}40`,
            }
      }
    >
      {label}{" "}
      <span className={active ? "text-white/75" : "text-muted-foreground"}>
        ({count})
      </span>
    </button>
  );
}
