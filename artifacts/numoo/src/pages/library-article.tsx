import { Link, useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Clock, ShieldCheck, Languages, AlertCircle, Star } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { ARTICLES, SOURCES } from "@/lib/library";
import { getArticleContent } from "@/lib/library-content";
import { useBookmarksStore } from "@/lib/bookmarks";
import { WhatsAppShareButton } from "@/components/whatsapp-share-button";
import { shareArticle } from "@/lib/share";

export default function LibraryArticle() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { lang } = useT();
  const id = params.id;
  const article = ARTICLES.find(a => a.id === id);

  if (!article) {
    return (
      <Layout>
        <div className="px-5 pt-8 pb-32 text-center">
          <h1 className="text-xl font-bold mb-2">المقال غير موجود</h1>
          <Button onClick={() => setLocation("/library")}>الرجوع للمكتبة</Button>
        </div>
      </Layout>
    );
  }

  const src = SOURCES[article.source];
  const content = getArticleContent(article.id);
  const isBookmarked = useBookmarksStore((s) => s.ids.includes(article.id));
  const toggleBookmark = useBookmarksStore((s) => s.toggle);

  return (
    <Layout>
      <div className="pb-32">
        {/* Source hero */}
        <div
          className="px-5 pt-6 pb-8 text-white relative overflow-hidden"
          style={{ backgroundColor: src.color }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white" />
          </div>

          <div className="relative z-10 mb-5 flex items-center justify-between">
            <Link href="/library">
              <button className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium">
                <ArrowRight size={16} />
                {lang === "ar" ? "المكتبة" : "Library"}
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleBookmark(article.id)}
                aria-pressed={isBookmarked}
                className="flex items-center gap-1.5 px-3 h-9 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-xs font-bold transition-all"
              >
                <Star size={14} className={isBookmarked ? "fill-amber-300 text-amber-300" : ""} />
                {isBookmarked ? "محفوظ" : "احفظي"}
              </button>
              <WhatsAppShareButton
                text={shareArticle({
                  id: article.id,
                  title: lang === "ar" ? article.title.ar : article.title.en,
                  summary: lang === "ar" ? article.summary : undefined,
                  lang,
                })}
                variant="icon"
                className="!bg-white/15 hover:!bg-white/25 !text-white backdrop-blur-sm"
                testId="button-share-article-whatsapp"
              />
            </div>
          </div>

          <div className="relative z-10 flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white font-black text-xs text-center px-1">
              {src.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span className="text-xs font-bold">{src.shortName}</span>
                <span className="text-xs">{src.country}</span>
              </div>
              <p className="text-[11px] text-white/80">{src.prestige}</p>
              <p className="text-[10px] text-white/70 mt-1">
                {lang === "ar" ? src.name.ar : src.name.en}
              </p>
            </div>
          </div>

          <h1 className="relative z-10 text-2xl font-extrabold leading-tight mb-2">
            {lang === "ar" ? article.title.ar : article.title.en}
          </h1>
          {lang === "ar" && (
            <p className="relative z-10 text-sm text-white/80" dir="ltr">
              {article.title.en}
            </p>
          )}

          <div className="relative z-10 flex items-center gap-3 mt-4 text-[11px] text-white/85">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {article.readMinutes} د قراءة
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} />
              مرجع موثوق
            </span>
            {content && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 font-bold">
                <Languages size={11} />
                مترجم للعربية
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 pt-6"
        >
          {content ? (
            <ArabicContent markdown={content} />
          ) : (
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-sm text-amber-900 dark:text-amber-200">
                  الترجمة العربية قريباً
                </h3>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                نعمل على ترجمة هذا المقال للعربية. حالياً تستطيعين قراءة الملخص أدناه أو الذهاب
                للمصدر الأصلي.
              </p>
            </div>
          )}

          {/* Summary fallback */}
          {!content && (
            <div className="bg-card border border-border rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-sm mb-2">ملخص المقال</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{article.summary}</p>
            </div>
          )}

          {/* Source link CTA */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 rounded-3xl p-5 mb-4">
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-[10px] text-center px-1"
                style={{ backgroundColor: src.color }}
              >
                {src.initials}
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-foreground mb-0.5">
                  للتحقق والاستزادة
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  هذا الملخص بالعربية مأخوذ من مصدر موثوق. للقراءة الكاملة بالإنجليزية:
                </p>
              </div>
            </div>
            <Button
              asChild
              className="w-full rounded-2xl h-11 font-bold gap-2"
              style={{ backgroundColor: src.color }}
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={15} />
                المصدر الأصلي بالإنجليزي
              </a>
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-[10px] text-muted-foreground text-center px-4 leading-relaxed mt-4">
            هذا المحتوى للتثقيف فقط ولا يغني عن استشارة طبيب مختص بنمو الطفل.
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

/** Lightweight Arabic-friendly markdown renderer (h2/h3/bold/lists/paragraphs) */
function ArabicContent({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const blocks: React.ReactNode[] = [];
  let listBuf: string[] = [];
  let paraBuf: string[] = [];

  const flushList = () => {
    if (listBuf.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="space-y-1.5 mb-4 pr-4">
        {listBuf.map((item, i) => (
          <li key={i} className="text-sm text-foreground leading-relaxed flex gap-2">
            <span className="text-primary font-bold flex-shrink-0 mt-1">•</span>
            <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
          </li>
        ))}
      </ul>
    );
    listBuf = [];
  };

  const flushPara = () => {
    if (paraBuf.length === 0) return;
    const text = paraBuf.join(" ").trim();
    if (text) {
      blocks.push(
        <p
          key={`p-${blocks.length}`}
          className="text-sm text-foreground leading-relaxed mb-3"
          dangerouslySetInnerHTML={{ __html: renderInline(text) }}
        />
      );
    }
    paraBuf = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      flushPara();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      flushPara();
      blocks.push(
        <h2
          key={`h2-${blocks.length}`}
          className="text-lg font-extrabold text-foreground mt-6 mb-3 pb-2 border-b border-primary/20"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      flushPara();
      blocks.push(
        <h3 key={`h3-${blocks.length}`} className="text-base font-bold text-primary mt-4 mb-2">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      flushPara();
      listBuf.push(line.slice(2));
    } else {
      flushList();
      paraBuf.push(line);
    }
  }
  flushList();
  flushPara();

  return <article className="prose prose-sm max-w-none">{blocks}</article>;
}

function renderInline(text: string): string {
  // Escape HTML
  let safe = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  // Bold **text**
  safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
  return safe;
}
