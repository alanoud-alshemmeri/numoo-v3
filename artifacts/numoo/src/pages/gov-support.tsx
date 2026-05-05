import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Landmark,
  Phone,
  Globe,
  MapPin,
  CheckCircle2,
  FileText,
  Lightbulb,
  Clock,
  ChevronDown,
  ListChecks,
} from "lucide-react";
import { Layout } from "@/components/layout";
import { WhatsAppShareButton } from "@/components/whatsapp-share-button";
import { shareGovResource } from "@/lib/share";
import {
  SUPPORT_RESOURCES,
  RESOURCE_CATEGORIES,
  type ResourceType,
  type SupportResource,
} from "@/lib/gov-resources";
import { useLangStore } from "@/lib/lang-store";

const TXT: Record<"ar" | "en", {
  backToResults: string;
  title: string;
  subtitle: string;
  intro: string;
  all: string;
  noteTitle: string;
  noteBody: string;
  sectionWhat: string;
  sectionWho: string;
  sectionSteps: string;
  sectionDocs: string;
  sectionTip: string;
  contactTitle: string;
}> = {
  ar: {
    backToResults: "النتائج",
    title: "دليل الدعم الحكومي",
    subtitle:
      "كل ما تحتاجين معرفته عن البطاقة، التأمين، والجمعيات بالكويت",
    intro:
      "معظم الأمهات يدفعن آلاف الدنانير من جيوبهن وهنّ يستحققن دعماً رسمياً. هذا الدليل يساعدكِ على معرفة حقّكِ بالضبط.",
    all: "الكل",
    noteTitle: "ملاحظة مهمة",
    noteBody:
      "هذه المعلومات محدثة لـ٢٠٢٦ بقدر ما توصّلنا. القوانين والرسوم ممكن تتغير. اتصلي بالجهة المعنية للتأكد قبل أي إجراء رسمي.",
    sectionWhat: "ماذا بتحصلين عليه",
    sectionWho: "مين يستحق",
    sectionSteps: "الخطوات بالترتيب",
    sectionDocs: "الأوراق المطلوبة",
    sectionTip: "نصيحة من نمو",
    contactTitle: "📞 معلومات التواصل",
  },
  en: {
    backToResults: "Results",
    title: "Government Support Guide",
    subtitle:
      "Everything you need to know about the disability card, insurance, and support societies in Kuwait",
    intro:
      "Most mothers pay thousands of dinars out of their own pockets when they're entitled to official support. This guide helps you know exactly what your rights are.",
    all: "All",
    noteTitle: "Important note",
    noteBody:
      "This information is current through 2026 to the best of our knowledge. Laws and fees can change. Please contact the relevant authority to confirm before taking any official step.",
    sectionWhat: "What you'll receive",
    sectionWho: "Who qualifies",
    sectionSteps: "Steps in order",
    sectionDocs: "Documents needed",
    sectionTip: "A tip from Numoo",
    contactTitle: "📞 Contact information",
  },
};

export default function GovSupport() {
  const { lang } = useLangStore();
  const T = TXT[lang];
  const [filter, setFilter] = useState<"all" | ResourceType>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return SUPPORT_RESOURCES;
    return SUPPORT_RESOURCES.filter((r) => r.type === filter);
  }, [filter]);

  return (
    <Layout>
      <div className="pb-32 bg-[#f4fafa] min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0d9488] via-[#0f766e] to-[#115e59] text-white px-5 pt-6 pb-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white" />
          </div>
          <Link href="/results">
            <button className="relative z-10 mb-4 flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium">
              <ArrowRight size={16} />
              {T.backToResults}
            </button>
          </Link>
          <div className="relative z-10 flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
              <Landmark size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold leading-tight">
                {T.title}
              </h1>
              <p className="text-sm text-white/85 mt-1">
                {T.subtitle}
              </p>
            </div>
          </div>
          <div className="relative z-10 mt-4 bg-white/10 rounded-2xl p-3 text-[12px] leading-relaxed">
            {T.intro}
          </div>
        </div>

        {/* Filter */}
        <div className="px-5 pt-5">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label={T.all}
              count={SUPPORT_RESOURCES.length}
            />
            {RESOURCE_CATEGORIES.map((c) => {
              const count = SUPPORT_RESOURCES.filter(
                (r) => r.type === c.type,
              ).length;
              return (
                <FilterChip
                  key={c.type}
                  active={filter === c.type}
                  onClick={() => setFilter(c.type)}
                  label={`${c.emoji} ${c.label}`}
                  count={count}
                  color={c.color}
                />
              );
            })}
          </div>

          {/* Resources */}
          <div className="space-y-3 mt-4">
            {filtered.map((r, i) => (
              <ResourceCard
                key={r.id}
                resource={r}
                isOpen={openId === r.id}
                onToggle={() => setOpenId(openId === r.id ? null : r.id)}
                index={i}
                t={T}
                lang={lang}
              />
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-3xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <p className="text-sm font-bold text-amber-900 mb-1">
                  {T.noteTitle}
                </p>
                <p className="text-[12px] text-amber-800 leading-relaxed">
                  {T.noteBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FilterChip({
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
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-extrabold border-2 transition-all whitespace-nowrap ${
        active
          ? "text-white border-transparent shadow-sm"
          : "bg-white text-foreground border-border hover:border-primary/40"
      }`}
      style={
        active
          ? { backgroundColor: color ?? "#0d9488", borderColor: color ?? "#0d9488" }
          : undefined
      }
    >
      {label}
      <span
        className={`mr-1.5 inline-block px-1.5 py-0.5 rounded-full text-[10px] ${
          active ? "bg-white/20" : "bg-muted"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function ResourceCard({
  resource,
  isOpen,
  onToggle,
  index,
  t,
  lang,
}: {
  resource: SupportResource;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  t: (typeof TXT)["ar"];
  lang: "ar" | "en";
}) {
  const cat = RESOURCE_CATEGORIES.find((c) => c.type === resource.type)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white rounded-3xl border border-border overflow-hidden"
    >
      <button
        onClick={onToggle}
        className={`w-full p-4 ${lang === "ar" ? "text-right" : "text-left"} hover:bg-muted/30 transition-colors`}
      >
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${cat.color}15` }}
          >
            {cat.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span
                className="text-[10px] font-extrabold text-white px-2 py-0.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              >
                {cat.label}
              </span>
              {resource.estimatedTime && (
                <span className="text-[10px] text-muted-foreground font-bold flex items-center gap-1">
                  <Clock size={10} />
                  {resource.estimatedTime}
                </span>
              )}
            </div>
            <h3 className="text-base font-extrabold text-foreground leading-tight mb-1">
              {resource.name}
            </h3>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              {resource.shortDesc}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown size={20} className="text-muted-foreground" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 space-y-3 border-t border-border pt-4">
              <Section
                icon={<CheckCircle2 size={15} />}
                title={t.sectionWhat}
                color={cat.color}
              >
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {resource.what}
                </p>
              </Section>

              <Section
                icon={<ListChecks size={15} />}
                title={t.sectionWho}
                color="#0d9488"
              >
                <p className="text-sm text-foreground leading-relaxed">
                  {resource.who}
                </p>
              </Section>

              <Section
                icon={<ListChecks size={15} />}
                title={t.sectionSteps}
                color="#2563eb"
              >
                <ol className="space-y-2">
                  {resource.steps.map((step, i) => (
                    <li
                      key={i}
                      className="text-sm text-foreground leading-relaxed flex gap-2"
                    >
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded-full text-white text-[10px] font-extrabold flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: "#2563eb" }}
                      >
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section
                icon={<FileText size={15} />}
                title={t.sectionDocs}
                color="#9333ea"
              >
                <ul className="space-y-1.5">
                  {resource.documents.map((doc, i) => (
                    <li
                      key={i}
                      className="text-sm text-foreground leading-relaxed flex gap-2"
                    >
                      <span className="text-purple-600 flex-shrink-0 mt-1">
                        •
                      </span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {resource.tip && (
                <Section
                  icon={<Lightbulb size={15} />}
                  title={t.sectionTip}
                  color="#d97706"
                >
                  <p className="text-sm text-foreground leading-relaxed">
                    {resource.tip}
                  </p>
                </Section>
              )}

              {resource.contact && (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-3.5 border border-slate-200">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="font-extrabold text-sm text-slate-700 flex items-center gap-1.5">
                      {t.contactTitle}
                    </div>
                    <WhatsAppShareButton
                      text={shareGovResource({
                        name: resource.name,
                        shortDesc: resource.shortDesc,
                        phone: resource.contact.phone,
                        website: resource.contact.website,
                        lang,
                      })}
                      variant="icon"
                      testId={`button-share-gov-${resource.id}`}
                    />
                  </div>
                  <div className="space-y-2">
                    {resource.contact.phone && (
                      <a
                        href={`tel:${resource.contact.phone.replace(/[^0-9+]/g, "")}`}
                        className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                        dir="ltr"
                      >
                        <Phone size={14} className="text-emerald-600" />
                        {resource.contact.phone}
                      </a>
                    )}
                    {resource.contact.website && (
                      <a
                        href={resource.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors break-all"
                      >
                        <Globe size={14} className="text-blue-600" />
                        {resource.contact.website.replace(/^https?:\/\//, "")}
                      </a>
                    )}
                    {resource.contact.address && (
                      <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>{resource.contact.address}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Section({
  icon,
  title,
  color,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="flex items-center gap-1.5 mb-2 font-extrabold text-sm"
        style={{ color }}
      >
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}
