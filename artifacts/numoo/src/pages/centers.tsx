import { useMemo, useState } from "react";
import { Layout } from "@/components/layout";
import { useT } from "@/lib/i18n";
import { motion } from "framer-motion";
import { Phone, MapPin, Building, Mail, Globe, Search, Map, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DIRECTORY,
  CATEGORY_LABELS,
  GOVERNORATE_LABELS,
  type DirectoryCategory,
  type Governorate,
} from "@/lib/directory";
import { useFavoritesStore } from "@/lib/favorites-store";

const CATEGORY_ORDER: DirectoryCategory[] = [
  "nurseries",
  "arabicSchools",
  "foreignSchools",
  "rehab",
  "evening",
];

const GOVERNORATE_ORDER: Governorate[] = [
  "العاصمة",
  "حولي",
  "الفروانية",
  "الأحمدي",
  "الجهراء",
  "مبارك الكبير",
];

export default function Centers() {
  const { t, lang } = useT();
  const [activeCat, setActiveCat] = useState<DirectoryCategory | "all" | "favorites">("all");
  const [activeGov, setActiveGov] = useState<Governorate | "all">("all");
  const [query, setQuery] = useState("");
  const favIds = useFavoritesStore((s) => s.ids);
  const toggleFav = useFavoritesStore((s) => s.toggle);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DIRECTORY.filter((e) => {
      if (activeCat === "favorites") {
        if (!favIds.includes(e.id)) return false;
      } else if (activeCat !== "all" && e.category !== activeCat) {
        return false;
      }
      if (activeGov !== "all" && e.governorate !== activeGov) return false;
      if (q) {
        const hay = (
          e.name +
          " " +
          e.address +
          " " +
          (e.notes ?? "") +
          " " +
          e.governorate
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [activeCat, activeGov, query, favIds]);

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white p-6 pt-24 pb-8 flex-shrink-0">
        <h2 className="text-2xl font-black mb-2">{t("centersTitle")}</h2>
        <p className="text-sm text-white/60">{t("centersDesc")}</p>
      </div>

      <div className="p-6 bg-background flex-1 pb-32">
        {/* PADA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-[#089b98] rounded-3xl p-6 text-white mb-6 shadow-lg shadow-primary/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Building size={24} />
            </div>
            <div>
              <h3 className="font-black text-lg mb-1">{t("padaName")}</h3>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                {t("padaDesc")}
              </p>
              <a
                href="tel:133"
                className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full text-sm font-bold hover:bg-white/90 transition-colors"
              >
                <Phone size={16} />
                <span dir="ltr">133</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={18}
            className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${lang === "ar" ? "right-4" : "left-4"}`}
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className={`h-12 rounded-2xl bg-card border-border text-foreground ${lang === "ar" ? "pr-11" : "pl-11"}`}
          />
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-1 px-1 scrollbar-thin">
          <CatChip
            active={activeCat === "all"}
            onClick={() => setActiveCat("all")}
            label={t("filterAll")}
            count={DIRECTORY.length}
          />
          <CatChip
            active={activeCat === "favorites"}
            onClick={() => setActiveCat("favorites")}
            label={`⭐ ${t("favoritesFilter")}`}
            count={favIds.length}
          />
          {CATEGORY_ORDER.map((cat) => {
            const count = DIRECTORY.filter((e) => e.category === cat).length;
            return (
              <CatChip
                key={cat}
                active={activeCat === cat}
                onClick={() => setActiveCat(cat)}
                label={CATEGORY_LABELS[cat][lang]}
                count={count}
              />
            );
          })}
        </div>

        {/* Governorate Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-1 px-1 scrollbar-thin">
          <GovChip
            active={activeGov === "all"}
            onClick={() => setActiveGov("all")}
            label={t("filterAllGov")}
          />
          {GOVERNORATE_ORDER.map((gov) => (
            <GovChip
              key={gov}
              active={activeGov === gov}
              onClick={() => setActiveGov(gov)}
              label={GOVERNORATE_LABELS[gov][lang]}
            />
          ))}
        </div>

        {/* Results count */}
        <div className="text-xs text-muted-foreground mb-4 font-bold">
          {filtered.length} {t("resultsCount")}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="bg-card rounded-3xl p-8 text-center text-muted-foreground border border-border">
            {activeCat === "favorites" && favIds.length === 0
              ? t("noFavorites")
              : t("noResults")}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.4) }}
                className="bg-card rounded-3xl p-5 shadow-sm border border-border"
              >
                <div className="flex gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground leading-snug mb-1">
                      {e.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                        {CATEGORY_LABELS[e.category][lang]}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold">
                        {GOVERNORATE_LABELS[e.governorate][lang]}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFav(e.id)}
                    aria-label={
                      favIds.includes(e.id)
                        ? t("removeFavorite")
                        : t("addFavorite")
                    }
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      favIds.includes(e.id)
                        ? "bg-yellow-100 text-yellow-500 hover:bg-yellow-200"
                        : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-yellow-500"
                    }`}
                  >
                    <Star
                      size={20}
                      fill={favIds.includes(e.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                  {e.address}
                </p>

                {e.notes && (
                  <p className="text-xs text-foreground/80 bg-muted/40 rounded-xl px-3 py-2 mb-3">
                    <span className="font-bold">{t("notesLabel")}:</span> {e.notes}
                  </p>
                )}

                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${e.name} ${e.address} ${lang === "ar" ? "الكويت" : "Kuwait"}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#089b98]/10 hover:bg-[#089b98]/20 text-[#089b98] px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                  >
                    <Map size={12} />
                    {t("mapBtn")}
                  </a>
                  {e.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\D/g, "")}`}
                      className="inline-flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                      dir="ltr"
                    >
                      <Phone size={12} />
                      {p}
                    </a>
                  ))}
                  {e.email && (
                    <a
                      href={`mailto:${e.email}`}
                      className="inline-flex items-center gap-1.5 bg-secondary/10 hover:bg-secondary/20 text-secondary px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                      dir="ltr"
                    >
                      <Mail size={12} />
                      {t("emailBtn")}
                    </a>
                  )}
                  {e.website && (
                    <a
                      href={`https://${e.website.replace(/^https?:\/\//, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-secondary/10 hover:bg-secondary/20 text-secondary px-3 py-1.5 rounded-full text-xs font-bold transition-colors"
                      dir="ltr"
                    >
                      <Globe size={12} />
                      {t("websiteBtn")}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center px-4 space-y-2">
          <p className="text-xs text-muted-foreground">{t("centersWarning")}</p>
          <p className="text-[10px] text-muted-foreground/70">
            {t("directorySource")}
          </p>
        </div>
      </div>
    </Layout>
  );
}

function CatChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
        active
          ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
          : "bg-card text-foreground border border-border hover:border-primary/50"
      }`}
    >
      {label}{" "}
      <span className={active ? "text-primary-foreground/70" : "text-muted-foreground"}>
        ({count})
      </span>
    </button>
  );
}

function GovChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
        active
          ? "bg-secondary text-secondary-foreground"
          : "bg-card text-muted-foreground border border-border hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
