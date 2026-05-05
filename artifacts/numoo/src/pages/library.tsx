import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Search, BookMarked, ShieldCheck, Clock, Pin, Languages, Star } from "lucide-react";
import { Layout } from "@/components/layout";
import { useT } from "@/lib/i18n";
import { Input } from "@/components/ui/input";
import { ARTICLES, SOURCES, CATEGORIES, type LibraryCategory } from "@/lib/library";
import { getArticleContent } from "@/lib/library-content";
import { useBookmarksStore } from "@/lib/bookmarks";

export default function Library() {
  const { t, lang } = useT();
  const [cat, setCat] = useState<"all" | LibraryCategory>("all");
  const [q, setQ] = useState("");
  const [favOnly, setFavOnly] = useState(false);
  const bookmarkIds = useBookmarksStore((s) => s.ids);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return ARTICLES.filter(a => {
      if (favOnly && !bookmarkIds.includes(a.id)) return false;
      if (cat !== "all" && a.category !== cat) return false;
      if (!s) return true;
      const src = SOURCES[a.source];
      return (
        a.title.ar.toLowerCase().includes(s) ||
        a.title.en.toLowerCase().includes(s) ||
        a.summary.toLowerCase().includes(s) ||
        src.shortName.toLowerCase().includes(s) ||
        src.name.ar.includes(s)
      );
    });
  }, [cat, q, favOnly, bookmarkIds]);

  const pinned = favOnly ? [] : filtered.filter(a => a.pinned);
  const rest = favOnly ? filtered : filtered.filter(a => !a.pinned);

  const sourceCount = Object.keys(SOURCES).length;
  const articleCount = ARTICLES.length;

  return (
    <Layout>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#0D2137] via-[#0a3d5c] to-[#063048] text-white p-6 pt-24 pb-8 flex-shrink-0 overflow-hidden">
        <div className="absolute top-[-30%] right-[-20%] w-[400px] h-[400px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          {lang === "en" && (
            <div className="mb-4 inline-flex items-center gap-2 bg-[#E0A858]/15 border border-[#E0A858]/40 rounded-full px-3 py-1.5">
              <Languages size={12} className="text-[#E0A858]" />
              <span className="text-[11px] text-[#E0A858] font-bold">
                Article body content is currently Arabic-only.
              </span>
            </div>
          )}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 backdrop-blur flex items-center justify-center">
              <BookMarked className="text-primary" size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-black leading-tight">
                {lang === "ar" ? "مكتبة المراجع" : "Library"}
              </h2>
              <div className="flex items-center gap-1 text-[11px] text-primary/90 font-bold">
                <ShieldCheck size={12} />
                {lang === "ar" ? "مصادر موثوقة فقط" : "Trusted sources only"}
              </div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            {lang === "ar"
              ? "مقالات مختارة بعناية من أعرق المستشفيات والجامعات والهيئات الصحية بالعالم."
              : "Hand-picked articles from the world's most trusted hospitals, universities, and health agencies."}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-2.5 text-center">
              <div className="text-xl font-black text-primary">{articleCount}</div>
              <div className="text-[10px] text-white/70 mt-0.5">
                {lang === "ar" ? "مقال" : "Articles"}
              </div>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-2.5 text-center">
              <div className="text-xl font-black text-primary">{sourceCount}</div>
              <div className="text-[10px] text-white/70 mt-0.5">
                {lang === "ar" ? "جهة عالمية" : "Sources"}
              </div>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-2.5 text-center">
              <div className="text-xl font-black text-primary">100%</div>
              <div className="text-[10px] text-white/70 mt-0.5">
                {lang === "ar" ? "مجاناً" : "Free"}
              </div>
            </div>
          </div>

          {/* Source logos strip */}
          <div className="flex flex-wrap gap-1.5">
            {Object.values(SOURCES).slice(0, 8).map(src => (
              <div
                key={src.id}
                className="px-2 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold text-white/90 flex items-center gap-1"
              >
                <span>{src.country}</span>
                {src.shortName}
              </div>
            ))}
            <div className="px-2 py-1 rounded-full bg-primary/20 border border-primary/30 text-[10px] font-bold text-primary">
              +{sourceCount - 8}
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-background px-6 pt-5 sticky top-0 z-20">
        <div className="relative">
          <Search
            size={16}
            className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${
              lang === "ar" ? "right-3" : "left-3"
            }`}
          />
          <Input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder={lang === "ar" ? "ابحثي عن مقال أو جهة..." : "Search article or source..."}
            className={`h-11 rounded-2xl bg-card border-border ${
              lang === "ar" ? "pr-10 text-right" : "pl-10"
            }`}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 pt-3 -mx-6 px-6 scrollbar-thin">
          <button
            onClick={() => setFavOnly(!favOnly)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all flex items-center gap-1 ${
              favOnly
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-card text-muted-foreground border-border hover:border-amber-400"
            }`}
          >
            <Star size={12} className={favOnly ? "fill-white" : ""} />
            {lang === "ar" ? "مفضلتي" : "My Saves"} · {bookmarkIds.length}
          </button>
          <button
            onClick={() => { setCat("all"); setFavOnly(false); }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
              cat === "all" && !favOnly
                ? "bg-primary text-white border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {lang === "ar" ? "الكل" : "All"} · {ARTICLES.length}
          </button>
          {CATEGORIES.map(c => {
            const count = ARTICLES.filter(a => a.category === c.id).length;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${
                  cat === c.id
                    ? "bg-primary text-white border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                <span className="mr-1">{c.emoji}</span>
                {lang === "ar" ? c.ar : c.en} · {count}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles */}
      <div className="bg-background flex-1 px-6 pt-4 pb-32 space-y-3">
        {pinned.length > 0 && (
          <>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary mt-2 mb-1">
              <Pin size={12} />
              {lang === "ar" ? "مقالات مختارة" : "Featured"}
            </div>
            {pinned.map((a, i) => (
              <ArticleCard key={a.id} article={a} index={i} featured />
            ))}
          </>
        )}

        {rest.length > 0 && pinned.length > 0 && (
          <div className="text-[11px] font-bold text-muted-foreground mt-4 mb-1">
            {lang === "ar" ? "كل المقالات" : "All articles"}
          </div>
        )}

        {rest.map((a, i) => (
          <ArticleCard key={a.id} article={a} index={i} />
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">🔎</div>
            <div className="text-sm text-muted-foreground">
              {lang === "ar" ? "ما لقينا نتائج" : "No results found"}
            </div>
          </div>
        )}

        {/* Trust footer */}
        <div className="mt-8 p-4 rounded-2xl bg-primary/5 border border-primary/15 text-center">
          <ShieldCheck className="mx-auto mb-2 text-primary" size={20} />
          <div className="text-[11px] text-muted-foreground leading-relaxed">
            {lang === "ar"
              ? "كل المقالات من مصادرها الأصلية. نمو لا يدّعي ملكيتها — هدفنا توصيلكِ إلى المعرفة الموثوقة بأسرع طريق."
              : "All articles link to their original sources. Numoo doesn't claim ownership — our goal is to connect you to trusted knowledge."}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ArticleCard({
  article,
  index,
  featured = false,
}: {
  article: (typeof ARTICLES)[number];
  index: number;
  featured?: boolean;
}) {
  const { lang } = useT();
  const src = SOURCES[article.source];
  const hasArabicContent = !!getArticleContent(article.id);
  const isBookmarked = useBookmarksStore((s) => s.ids.includes(article.id));
  const toggleBookmark = useBookmarksStore((s) => s.toggle);

  const handleStar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(article.id);
  };

  return (
    <Link href={`/library/${article.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.04, 0.3) }}
        className={`relative block bg-card rounded-3xl p-4 border transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer ${
          featured ? "border-primary/30 shadow-md" : "border-border hover:border-primary/40"
        }`}
      >
      <button
        type="button"
        onClick={handleStar}
        aria-label={isBookmarked ? "إزالة من المفضلة" : "حفظ بالمفضلة"}
        aria-pressed={isBookmarked}
        className={`absolute top-3 ${lang === "ar" ? "left-3" : "right-3"} z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
          isBookmarked
            ? "bg-amber-100 text-amber-500"
            : "bg-muted/50 text-muted-foreground hover:text-amber-500"
        }`}
      >
        <Star size={16} className={isBookmarked ? "fill-amber-500" : ""} />
      </button>
      <div className="flex items-start gap-3">
        {/* Source badge */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-[10px] text-center leading-tight px-1"
          style={{ backgroundColor: src.color }}
        >
          {src.initials}
        </div>

        <div className={`flex-1 min-w-0 ${lang === "ar" ? "pl-10" : "pr-10"}`}>
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="text-[10px] font-bold text-foreground">{src.shortName}</span>
            <span className="text-[10px]">{src.country}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
              {src.prestige}
            </span>
          </div>

          <h3 className="font-bold text-sm text-foreground leading-snug mb-1.5">
            {lang === "ar" ? article.title.ar : article.title.en}
          </h3>

          {lang === "ar" && (
            <div className="text-[10px] text-muted-foreground mb-1.5 line-clamp-1" dir="ltr">
              {article.title.en}
            </div>
          )}

          <p className="text-xs text-muted-foreground leading-relaxed mb-2.5 line-clamp-3">
            {article.summary}
          </p>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <Clock size={11} />
              {article.readMinutes} {lang === "ar" ? "د قراءة" : "min read"}
              {hasArabicContent && (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Languages size={9} />
                  مترجم
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-primary">
              {lang === "ar" ? "افتحي المقال ←" : "Open →"}
            </div>
          </div>
        </div>
      </div>
      </motion.div>
    </Link>
  );
}
