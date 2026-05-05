import { Layout } from "@/components/layout";
import { useT } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, RotateCcw, Shield, MessageSquare, BookOpen, AlertTriangle, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { ARTICLES, SOURCES } from "@/lib/library";

type Citation = { id: string; title: string; sourceName: string; url: string };

type Msg = {
  role: "user" | "bot";
  text: string;
  citations?: Citation[];
  needsSpecialist?: boolean;
  error?: boolean;
};

const SUGGESTED: { ar: string; en: string }[] = [
  { ar: "ما الفرق بين تأخّر الكلام والتوحّد؟", en: "What's the difference between speech delay and autism?" },
  { ar: "متى يبدأ التدخّل المبكر يُحدث فرقاً؟", en: "When does early intervention start making a difference?" },
  { ar: "ما هو فحص M-CHAT-R/F؟", en: "What is the M-CHAT-R/F screening?" },
  { ar: "كيف أتعامل مع نوبة انفعال لدى طفلي؟", en: "How do I handle my child's meltdown?" },
  { ar: "هل التطعيمات تُسبّب التوحّد؟", en: "Do vaccines cause autism?" },
  { ar: "ما معنى علاج ABA؟", en: "What does ABA therapy mean?" },
];

const ARTICLE_CATALOG = ARTICLES.map((a) => ({
  id: a.id,
  title: a.title.ar,
  summary: a.summary,
}));

export default function Chatbot() {
  const { t, lang } = useT();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === "ar";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const q = text.trim();
    if (!q || isTyping) return;
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, articles: ARTICLE_CATALOG }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = (await res.json()) as {
        answer: string;
        citationIds: string[];
        needsSpecialist: boolean;
      };

      const citations: Citation[] = (data.citationIds || [])
        .map((id) => {
          const article = ARTICLES.find((a) => a.id === id);
          if (!article) return null;
          const source = SOURCES[article.source];
          return {
            id: article.id,
            title: article.title.ar,
            sourceName: source?.shortName || "",
            url: article.url,
          } as Citation;
        })
        .filter((c): c is Citation => c !== null);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.answer,
          citations,
          needsSpecialist: data.needsSpecialist,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            lang === "ar"
              ? "عذراً، حدث خطأ في الاتصال. حاولي مرة أخرى بعد لحظات. وإن كان السؤال لا يحتمل التأخير، فيُرجى التواصل مع مختصّ مباشرة."
              : "Sorry, a connection error occurred. Please try again in a moment. If your question can't wait, please contact a specialist directly.",
          error: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setIsTyping(false);
  };

  const hasMessages = messages.length > 0;

  return (
    <Layout hideFooter>
      <div className="h-[100dvh] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white px-6 pt-20 pb-5 flex-shrink-0">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
              <Sparkles size={20} className="text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-black truncate">{t("chatTitle")}</h2>
              <p className="text-[11px] text-white/60 leading-tight truncate flex items-center gap-1.5">
                <BookOpen size={11} className="text-[#0BB4B0]" />
                {lang === "ar"
                  ? `مدعوم بـ ${ARTICLES.length} مقالاً علمياً معتمداً`
                  : `Powered by ${ARTICLES.length} peer-reviewed sources`}
              </p>
            </div>
          </div>
          {hasMessages && (
            <button
              onClick={resetChat}
              aria-label={t("newChat")}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-background min-h-0">
        <div
          className="flex-1 overflow-y-auto px-4 pt-5 pb-4"
          style={{ scrollbarWidth: "thin" }}
        >
          {!hasMessages ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto text-center pt-4"
            >
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary to-[#089b98] flex items-center justify-center shadow-lg shadow-primary/30 mb-5">
                <Sparkles size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-black text-foreground mb-2">
                {t("chatWelcomeTitle")}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 px-4">
                {lang === "ar"
                  ? "اسألي أي سؤال — سأُجيبكِ بناءً على مقالات معتمدة من CDC وMayo وHarvard وYale وWHO وغيرها."
                  : "Ask anything — I'll answer based on vetted articles from CDC, Mayo, Harvard, Yale, WHO and others."}
              </p>
              <div className="inline-flex items-center gap-1.5 bg-[#0BB4B0]/10 border border-[#0BB4B0]/30 rounded-full px-3 py-1 mb-6">
                <Shield size={11} className="text-[#0BB4B0]" />
                <span className="text-[10px] font-bold text-[#0BB4B0]">
                  {lang === "ar" ? "إجابات بمصادر — بلا اختلاق" : "Answers with sources — no hallucination"}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3 px-1">
                <MessageSquare size={14} className="text-primary" />
                <h3 className="text-xs font-black text-foreground uppercase tracking-wider">
                  {t("chatSuggestedTitle")}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {SUGGESTED.map((chip, i) => {
                  const text = lang === "ar" ? chip.ar : chip.en;
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                      onClick={() => handleSend(text)}
                      className={`group bg-card hover:bg-primary/5 border border-border hover:border-primary/40 rounded-2xl px-4 py-3 text-sm font-medium text-foreground transition-all flex items-center gap-3 shadow-sm ${
                        isRtl ? "text-right" : "text-left"
                      }`}
                    >
                      <span className="w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary text-xs font-black transition-colors">
                        {i + 1}
                      </span>
                      <span className="flex-1">{text}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              {messages.map((m, i) => (
                <Bubble key={i} msg={m} isRtl={isRtl} lang={lang} />
              ))}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-primary to-[#089b98] flex items-center justify-center flex-shrink-0">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <div className="bg-card border border-border rounded-3xl rounded-bl-md px-4 py-3 flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        <div className="flex-shrink-0 bg-background/95 backdrop-blur-md border-t border-border px-4 pt-3 pb-28">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex gap-2 max-w-2xl mx-auto"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chatInputPlaceholder")}
              disabled={isTyping}
              className="flex-1 h-12 rounded-full bg-card border-border px-5 text-sm focus-visible:ring-primary"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label={t("chatTitle")}
              className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 hover:bg-primary/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-primary/20"
            >
              <Send size={18} className={isRtl ? "rotate-180" : ""} />
            </button>
          </form>
          <div className="flex items-center justify-center gap-1.5 mt-2.5 max-w-2xl mx-auto">
            <Shield size={11} className="text-muted-foreground/60 flex-shrink-0" />
            <p className="text-[10px] text-muted-foreground/80 leading-tight text-center">
              {t("chatPrivacyNotice")}
            </p>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
}

function Bubble({ msg, isRtl, lang }: { msg: Msg; isRtl: boolean; lang: "ar" | "en" }) {
  if (msg.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isRtl ? "justify-start" : "justify-end"}`}
      >
        <div
          className={`max-w-[80%] bg-primary text-primary-foreground rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isRtl ? "rounded-bl-md" : "rounded-br-md"
          }`}
        >
          {msg.text}
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2"
    >
      <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-primary to-[#089b98] flex items-center justify-center flex-shrink-0 shadow-md shadow-primary/20 mt-1">
        <Sparkles size={14} className="text-white" />
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div
          className={`max-w-[88%] ${msg.error ? "bg-destructive/5 border-destructive/30" : "bg-card border-border"} border text-foreground rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
            isRtl ? "rounded-br-md" : "rounded-bl-md"
          }`}
        >
          {msg.text}
        </div>

        {msg.needsSpecialist && (
          <div className="max-w-[88%] bg-amber-50 border border-amber-300 rounded-2xl px-3 py-2 flex items-start gap-2">
            <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 leading-relaxed">
              <strong>
                {lang === "ar" ? "هذا السؤال يستلزم مختصّاً." : "This question requires a specialist."}
              </strong>{" "}
              <Link href="/doctors" className="underline font-bold">
                {lang === "ar" ? "اطّلعي على قائمة الأطباء الموصى بهم" : "See the recommended doctors list"}
              </Link>
              .
            </p>
          </div>
        )}

        {msg.citations && msg.citations.length > 0 && (
          <div className="max-w-[88%] space-y-1.5">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider px-1">
              {lang === "ar" ? "المصادر:" : "Sources:"}
            </p>
            {msg.citations.map((c) => {
              const article = ARTICLES.find((a) => a.id === c.id);
              const label = article ? (lang === "ar" ? article.title.ar : article.title.en) : c.title;
              return (
              <Link key={c.id} href={`/library/${c.id}`}>
                <div className="bg-[#FFF7EE] hover:bg-[#FFF0DE] border border-[#E0A858]/40 rounded-xl px-3 py-2 cursor-pointer transition-colors flex items-start gap-2">
                  <BookOpen size={12} className="text-[#E0A858] flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-[#0D2137] leading-snug">
                      {label}
                    </div>
                    <div className="text-[9px] text-muted-foreground mt-0.5 flex items-center gap-1">
                      <span>{c.sourceName}</span>
                      <ExternalLink size={9} />
                    </div>
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
