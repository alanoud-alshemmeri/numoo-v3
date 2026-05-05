import { useLocation } from "wouter";
import { useT } from "@/lib/i18n";
import { useAssessmentStore } from "@/lib/store";
import { QDB, RW } from "@/lib/data";
import { Layout } from "@/components/layout";
import { ResultsBackupNudge } from "@/components/results-backup-nudge";
import { WhatsAppShareButton } from "@/components/whatsapp-share-button";
import { shareResults } from "@/lib/share";
import { motion } from "framer-motion";
import {
  Stethoscope,
  BookOpen,
  Phone,
  Users,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Download,
  Loader2,
  Copy,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

function getAgeGroupLabel(
  ageGroup: "toddler" | "preschool" | "school" | "teen" | null,
  lang: "ar" | "en",
): string {
  if (!ageGroup) return "";
  const labels = {
    ar: {
      toddler: "صغار",
      preschool: "ما قبل المدرسة",
      school: "مدرسة",
      teen: "مراهق",
    },
    en: {
      toddler: "Toddler",
      preschool: "Preschool",
      school: "School age",
      teen: "Teen",
    },
  } as const;
  return labels[lang][ageGroup];
}

export default function Results() {
  const { t, lang } = useT();
  const [, setLocation] = useLocation();
  const { score, riskLevel, ageGroup, reportCode, reportDate } = useAssessmentStore();
  const reportRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    if (!reportCode) return;
    try {
      await navigator.clipboard.writeText(reportCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = reportCode;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // ignore
      }
      document.body.removeChild(ta);
    }
  };

  // Animation state for the gauge needle
  const [needleAngle, setNeedleAngle] = useState(-90);

  // Compute the actual maximum possible score for this age band's question set
  // (sum of max RW per question id), so the gauge needle scales correctly.
  const maxPossible = (() => {
    if (!ageGroup) return 30;
    const items = QDB[ageGroup] ?? [];
    let max = 0;
    for (const q of items) {
      const w = (RW as Record<string, number[]>)[q.id];
      if (w && w.length) max += Math.max(...w);
    }
    return max > 0 ? max : 30;
  })();

  useEffect(() => {
    if (!ageGroup) {
      setLocation("/");
      return;
    }

    // Map 0 -> -90deg, maxPossible -> +90deg
    const normalizedScore = Math.min(Math.max(score, 0), maxPossible);
    const targetAngle = -90 + (normalizedScore / maxPossible) * 180;

    setTimeout(() => {
      setNeedleAngle(targetAngle);
    }, 300);
  }, [score, ageGroup, maxPossible, setLocation]);

  if (!ageGroup) return null;

  const isRtl = lang === "ar";
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  const getRiskColor = () => {
    if (riskLevel === 'low') return 'text-green-500';
    if (riskLevel === 'medium') return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getRiskBg = () => {
    if (riskLevel === 'low') return 'bg-green-500/10 border-green-500/20';
    if (riskLevel === 'medium') return 'bg-yellow-500/10 border-yellow-500/20';
    return 'bg-red-500/10 border-red-500/20';
  };

  const getRiskLabel = () => {
    if (riskLevel === 'low') return t('resLow');
    if (riskLevel === 'medium') return t('resMedium');
    return t('resHigh');
  };

  // Next steps based on risk
  const getNextSteps = () => {
    const steps = [];
    if (riskLevel === 'high' || riskLevel === 'medium') {
      steps.push({
        icon: <Stethoscope size={20} className="text-primary" />,
        title: t('consultPediatrician'),
        desc: t('consultPediatricianDesc'),
        link: '/centers'
      });
    }
    if (riskLevel === 'low') {
       steps.push({
        icon: <BookOpen size={20} className="text-primary" />,
        title: t('communicationActivities'),
        desc: t('communicationActivitiesDesc'),
        link: '/library'
      });
    }
    steps.push({
      icon: <Users size={20} className="text-primary" />,
      title: t('joinCommunity'),
      desc: t('joinCommunityDesc'),
      link: '/for-mom'
    });
    steps.push({
      icon: <Phone size={20} className="text-primary" />,
      title: t('chatWithAssistant'),
      desc: t('chatWithAssistantDesc'),
      link: '/chatbot'
    });
    return steps;
  };

  const handleDownloadPdf = async () => {
    if (!reportRef.current || isGenerating) return;
    setIsGenerating(true);
    try {
      const dataUrl = await toPng(reportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#f4fafa",
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("image load failed"));
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 24;
      const maxWidth = pageWidth - margin * 2;
      const ratio = img.height / img.width;
      const imgWidth = maxWidth;
      const imgHeight = imgWidth * ratio;

      if (imgHeight <= pageHeight - margin * 2) {
        pdf.addImage(dataUrl, "PNG", margin, margin, imgWidth, imgHeight);
      } else {
        // Slice the tall image across multiple pages
        const pageContentHeight = pageHeight - margin * 2;
        const sliceHeightPx = (pageContentHeight / imgHeight) * img.height;
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = sliceHeightPx;
        const ctx = canvas.getContext("2d")!;
        let y = 0;
        let firstPage = true;
        while (y < img.height) {
          const currentSliceHeight = Math.min(sliceHeightPx, img.height - y);
          canvas.height = currentSliceHeight;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(
            img,
            0,
            y,
            img.width,
            currentSliceHeight,
            0,
            0,
            img.width,
            currentSliceHeight,
          );
          const sliceData = canvas.toDataURL("image/png");
          const sliceImgHeight = (currentSliceHeight / img.width) * imgWidth;
          if (!firstPage) pdf.addPage();
          pdf.addImage(sliceData, "PNG", margin, margin, imgWidth, sliceImgHeight);
          firstPage = false;
          y += currentSliceHeight;
        }
      }

      const filename = lang === "ar" ? "تقرير-نمو.pdf" : "numoo-report.pdf";
      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation failed", err);
      alert(t("reportError"));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout>
      <div className="bg-[#f4fafa] min-h-screen pb-32">
        <div ref={reportRef} className="bg-[#f4fafa]">
        {/* Top Section */}
        <div className="bg-white rounded-b-[40px] shadow-sm border-b border-border pt-20 pb-10 px-6 text-center relative overflow-hidden">
          
          <h1 className="text-3xl font-black text-foreground mb-8">
            {t('assessmentSummary')}
          </h1>
          
          {/* Gauge Meter */}
          <div className="relative w-64 h-32 mx-auto mb-6">
            <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" /> {/* Green */}
                  <stop offset="50%" stopColor="#eab308" /> {/* Yellow */}
                  <stop offset="100%" stopColor="#ef4444" /> {/* Red */}
                </linearGradient>
              </defs>
              {/* Background Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Colored Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="16"
                strokeLinecap="round"
              />
              
              {/* Needle */}
              <motion.g
                initial={{ rotate: -90 }}
                animate={{ rotate: needleAngle }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
                style={{ originX: "100px", originY: "100px" }}
              >
                <polygon points="95,100 105,100 100,20" fill="#0D2137" />
                <circle cx="100" cy="100" r="8" fill="#0D2137" />
                <circle cx="100" cy="100" r="3" fill="white" />
              </motion.g>
            </svg>
          </div>
          
          <div className="flex flex-col items-center">
            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border ${getRiskBg()} ${getRiskColor()} font-black text-lg mb-2`}>
              {getRiskLabel()}
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              {riskLevel === 'low' 
                ? t('resLowDesc')
                : riskLevel === 'medium'
                ? t('resMediumDesc')
                : t('resHighDesc')}
            </p>
          </div>

          {reportCode && (
            <div
              data-testid="report-code-card"
              className="mt-6 mx-auto max-w-sm bg-[#0D2137] text-white rounded-2xl px-5 py-4 flex items-center justify-between gap-4 shadow-md"
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              <div className={lang === "ar" ? "text-right" : "text-left"}>
                <div className="text-[11px] uppercase tracking-widest text-white/60 font-bold">
                  {t("reportCodeLabel")}
                </div>
                <div className="font-mono text-2xl font-black tracking-[0.2em] mt-1">
                  {reportCode}
                </div>
                {reportDate && (
                  <div className="text-[11px] text-white/55 mt-1">
                    {t("reportDateLabel")}:{" "}
                    {new Date(reportDate).toLocaleDateString(
                      lang === "ar" ? "ar-KW" : "en-GB",
                      { year: "numeric", month: "short", day: "numeric" },
                    )}
                  </div>
                )}
              </div>
              <p className={`text-[11px] text-white/60 leading-relaxed max-w-[160px] ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("reportCodeHint")}
              </p>
            </div>
          )}

          <div className="mt-2">
            <ResultsBackupNudge />
          </div>

          {riskLevel && (
            <div className="mt-4 max-w-sm mx-auto">
              <WhatsAppShareButton
                text={shareResults({
                  riskLabel: getRiskLabel(),
                  ageGroupLabel: getAgeGroupLabel(ageGroup, lang),
                  lang,
                })}
                variant="full"
                testId="button-share-results-whatsapp"
              />
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">

          {/* NEW: Personal Toolkit (3 power features) */}
          <div>
            <div className="flex items-center justify-between mb-3 px-2">
              <h2 className="text-xl font-bold text-foreground">
                {lang === "ar" ? "أدواتكِ الشخصية" : "Your Personal Toolkit"}
              </h2>
              <span className="text-[10px] font-extrabold bg-emerald-500 text-white px-2 py-0.5 rounded-full">
                جديد
              </span>
            </div>
            <p className="text-xs text-muted-foreground px-2 mb-4 leading-relaxed">
              ٣ أدوات صنعناها خصيصاً لكِ — تحوّل النتيجة من أرقام إلى خطوات واضحة
            </p>

            <div className="space-y-2.5">
              <ToolCard
                onClick={() => setLocation("/results/visit-prep")}
                gradient="from-[#0BB4B0] to-[#0d9488]"
                emoji="📋"
                title="ورقة زيارة الدكتور"
                desc="ملخّص قابل للطباعة بمعلومات طفلكِ، النتيجة، وأسئلة جاهزة"
                badge="جديد · للطباعة"
                isRtl={isRtl}
              />
              <ToolCard
                onClick={() => setLocation("/results/doctor-questions")}
                gradient="from-[#0d9488] to-[#0f766e]"
                emoji="🩺"
                title="أسئلة جاهزة للطبيب"
                desc="١٠-١٧ سؤال مهم تأخذيها معكِ للزيارة • مع PDF"
                badge="١٠+ أسئلة"
                isRtl={isRtl}
              />
              <ToolCard
                onClick={() => setLocation("/results/family-talk")}
                gradient="from-[#9333ea] to-[#7e22ce]"
                emoji="💬"
                title="كيف أقول لعائلتي؟"
                desc="جمل جاهزة لمحادثة الزوج، الأم، الإخوان، والأقارب"
                badge="٤ سيناريوهات"
                isRtl={isRtl}
              />
              <ToolCard
                onClick={() => setLocation("/results/30-day-plan")}
                gradient="from-[#f59e0b] to-[#d97706]"
                emoji="📅"
                title="خطتي لـ ٣٠ يوم"
                desc="مهمة واحدة كل يوم — لتشعري بأنّكِ تتحرّكين"
                badge="٣٠ يوم"
                isRtl={isRtl}
              />
              <ToolCard
                onClick={() => setLocation("/gov-support")}
                gradient="from-[#0d9488] to-[#115e59]"
                emoji="🏛️"
                title="دليل الدعم الحكومي بالكويت"
                desc="بطاقة الإعاقة، التأمين الصحي، الجمعيات — الخطوات والأرقام"
                badge="٨ جهات"
                isRtl={isRtl}
              />
              <ToolCard
                onClick={() => setLocation("/assessment-centers")}
                gradient="from-[#16a34a] to-[#15803d]"
                emoji="🛡️"
                title="أماكن التقييم المعتمدة رسمياً"
                desc="٧ جهات حكومية تطلع منها شهادة معتمدة لطفلكِ — مع الأرقام"
                badge="معتمد"
                isRtl={isRtl}
              />
              <ToolCard
                onClick={() => setLocation("/doctors")}
                gradient="from-[#0BB4B0] to-[#089b98]"
                emoji="🩺"
                title="دكاترة يستقبلون أطفال الاحتياجات"
                desc="٧ تخصصات (أسنان، عيون، نفسي، أعصاب، أنف، جلد، هضمي) — تجارب الأمهات"
                badge="من الأمهات"
                isRtl={isRtl}
              />
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4 px-2">{t('resNextSteps')}</h2>
            <div className="grid gap-3">
              {getNextSteps().map((step, i) => (
                <motion.button
                  key={i}
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setLocation(step.link)}
                  aria-label={`${step.title} — ${step.desc}`}
                  className="w-full text-start bg-white rounded-2xl p-4 shadow-sm border border-border flex items-center gap-4 cursor-pointer hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-sm mb-1 truncate">{step.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{step.desc}</p>
                  </div>
                  <ChevronIcon className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#fff8ee] border border-[#ffe0a0] rounded-2xl p-4 flex gap-3 mt-8">
            <AlertTriangle className="text-[#d48a00] flex-shrink-0 mt-0.5" size={20} />
            <p className="text-xs text-[#8a6800] leading-relaxed">
              {t('resDisclaimer')}
            </p>
          </div>
          
        </div>
        </div>

        {/* Save & share — outside the captured report area */}
        <div className="px-6 mt-6 space-y-3">
          {reportCode && (
            <div className="bg-white rounded-2xl p-4 border border-border shadow-sm">
              <h3 className="text-sm font-bold text-foreground mb-3 px-1">
                {t("shareReportTitle")}
              </h3>
              <button
                onClick={handleCopyCode}
                data-testid="button-copy-code"
                className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span className="text-sm">
                  {copied ? t("copiedCode") : t("copyCode")}
                </span>
              </button>
              <p className="text-[10px] text-muted-foreground text-center mt-2 px-2">
                {lang === "ar"
                  ? "هذا رمز خاص بكِ — لا تشاركيه مع أحد"
                  : "This code is private — don't share it with anyone"}
              </p>
            </div>
          )}

          <button
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            data-testid="button-download-pdf"
            className="w-full flex items-center justify-center gap-3 bg-[#0D2137] hover:bg-[#0a3d5c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-2xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            {isGenerating ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                <span>{t("generatingReport")}</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>{t("downloadReport")}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}

function ToolCard({
  onClick,
  gradient,
  emoji,
  title,
  desc,
  badge,
  isRtl,
}: {
  onClick: () => void;
  gradient: string;
  emoji: string;
  title: string;
  desc: string;
  badge: string;
  isRtl: boolean;
}) {
  const Chevron = isRtl ? ArrowLeft : ChevronRight;
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-label={`${title} — ${desc}`}
      className={`w-full text-start relative overflow-hidden cursor-pointer rounded-2xl bg-gradient-to-br ${gradient} text-white p-4 shadow-md hover:shadow-lg transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2`}
    >
      <div className="absolute -top-4 -left-4 text-7xl opacity-15 leading-none rotate-12">
        {emoji}
      </div>
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
          {emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-extrabold text-sm">{title}</h3>
            <span className="text-[9px] font-extrabold bg-white/20 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
              {badge}
            </span>
          </div>
          <p className="text-[11px] text-white/90 leading-relaxed">{desc}</p>
        </div>
        <Chevron size={18} className="flex-shrink-0 opacity-80" />
      </div>
    </motion.button>
  );
}
