import { useState } from "react";
import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { KeyRound, Cloud, ShieldCheck, ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  applySnapshot,
  fetchBackup,
  isCloudBackupAvailable,
  useBackupStore,
  type CloudSnapshot,
} from "@/lib/cloud-backup";
import { useLangStore } from "@/lib/lang-store";

const TXT = {
  ar: {
    kicker: "الاسترجاع",
    title: "استرجعي بياناتكِ",
    desc: "أدخلي رمز الاسترجاع الذي حصلتِ عليه قبل أن يتغيّر التلفون.",
    placeholder: "مثال: ABCD-EFGH",
    submit: "استرجعي",
    submitting: "جاري الاسترجاع...",
    successTitle: "تم استرجاع بياناتكِ بنجاح",
    successDesc: "عادت كل النتائج والمفضّلات إلى هاتفكِ. ستُحدَّث الصفحة الآن...",
    notFound: "الرمز غير موجود. تأكّدي من الأحرف والأرقام (٨ خانات).",
    invalid: "الرمز ناقص. يجب أن يكون ٨ خانات (أحرف وأرقام).",
    error: "حدث خطأ. تأكّدي من الإنترنت وحاولي مرة أخرى.",
    confirmTitle: "تأكيد الاستبدال",
    confirmDesc: "هذه العملية ستستبدل أي بيانات حالية على الهاتف. هل أنتِ متأكدة؟",
    confirmYes: "نعم، استرجعي",
    confirmNo: "إلغاء",
    safeNote: "بدون بريد إلكتروني • احفظي الرمز لكِ وحدكِ",
    backHome: "العودة للرئيسية",
    offlineTitle: "الاسترجاع غير متاح",
    offlineDesc: "هذه ميزة تحتاج إنترنت. افتحي الموقع على numoo.site للاسترجاع.",
  },
  en: {
    kicker: "RESTORE",
    title: "Restore your data",
    desc: "Enter the recovery code you saved before changing your device.",
    placeholder: "e.g. ABCD-EFGH",
    submit: "Restore",
    submitting: "Restoring...",
    successTitle: "Your data was restored successfully",
    successDesc: "All your results and favorites are back on this device. Refreshing...",
    notFound: "Code not found. Please check the letters and numbers (8 characters).",
    invalid: "Code is incomplete. It must be 8 characters (letters and numbers).",
    error: "Something went wrong. Check your internet and try again.",
    confirmTitle: "Confirm replacement",
    confirmDesc: "This will replace any existing data on this device. Are you sure?",
    confirmYes: "Yes, restore",
    confirmNo: "Cancel",
    safeNote: "No email • Keep your code private",
    backHome: "Back to home",
    offlineTitle: "Restore unavailable",
    offlineDesc: "This feature requires internet. Open numoo.site to restore.",
  },
} as const;

export default function RestorePage() {
  const lang = useLangStore((s) => s.lang);
  const t = TXT[lang];
  const [, setLocation] = useLocation();
  const setCode = useBackupStore((s) => s.setCode);
  const setLastSync = useBackupStore((s) => s.setLastSync);

  const [input, setInput] = useState("");
  const [pending, setPending] = useState<CloudSnapshot | null>(null);
  const [pendingCode, setPendingCode] = useState<string | null>(null);
  const [pendingUpdated, setPendingUpdated] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const available = isCloudBackupAvailable();

  if (!available) {
    return (
      <Layout>
        <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white p-6 pt-24 pb-8">
          <h2 className="text-2xl font-black mb-2">{t.offlineTitle}</h2>
          <p className="text-sm text-white/60">{t.offlineDesc}</p>
        </div>
        <div className="p-6 pb-32">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-border font-bold text-sm"
          >
            <ArrowRight size={16} className="rotate-180" />
            {t.backHome}
          </Link>
        </div>
      </Layout>
    );
  }

  const cleaned = input.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const isValidLength = cleaned.length === 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isValidLength) {
      setError(t.invalid);
      return;
    }
    setBusy(true);
    try {
      const r = await fetchBackup(cleaned);
      setPending(r.data);
      setPendingCode(r.code);
      setPendingUpdated(r.updatedAt);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "unknown";
      if (msg === "code_not_found") setError(t.notFound);
      else setError(t.error);
    } finally {
      setBusy(false);
    }
  };

  const confirmRestore = () => {
    if (!pending || !pendingCode) return;
    applySnapshot(pending);
    setCode(pendingCode);
    if (pendingUpdated) setLastSync(pendingUpdated);
    setSuccess(true);
    // Reload after a moment so all stores re-hydrate from localStorage.
    setTimeout(() => {
      window.location.assign("/");
    }, 1400);
  };

  // Format input visually as ABCD-EFGH while typing.
  const handleChange = (val: string) => {
    const c = val.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
    setInput(c.length > 4 ? `${c.slice(0, 4)}-${c.slice(4)}` : c);
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] text-white p-6 pt-24 pb-8">
        <span className="text-[10px] font-black tracking-[0.2em] text-[#E0A858] block mb-1">
          {t.kicker}
        </span>
        <h2 className="text-2xl font-black mb-2">{t.title}</h2>
        <p className="text-sm text-white/60 leading-relaxed">{t.desc}</p>
      </div>

      <div className="p-6 bg-background flex-1 pb-32 space-y-5">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl p-6 text-center"
            data-testid="restore-success"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-black text-lg text-emerald-900 mb-2">
              {t.successTitle}
            </h3>
            <p className="text-sm text-emerald-800">{t.successDesc}</p>
          </motion.div>
        ) : pending ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl p-6 border border-border"
            data-testid="restore-confirm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle size={18} />
              </div>
              <h3 className="font-black text-foreground">{t.confirmTitle}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              {t.confirmDesc}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={confirmRestore}
                className="flex-1 px-4 py-3 rounded-2xl bg-[#0BB4B0] hover:bg-[#099b97] text-white font-bold text-sm"
                data-testid="button-confirm-restore"
              >
                {t.confirmYes}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPending(null);
                  setPendingCode(null);
                  setPendingUpdated(null);
                }}
                className="flex-1 px-4 py-3 rounded-2xl border-2 border-border font-bold text-sm"
                data-testid="button-cancel-restore"
              >
                {t.confirmNo}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl p-6 border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#E0A858]/15 text-[#E0A858] flex items-center justify-center">
                <KeyRound size={18} />
              </div>
              <h3 className="font-bold text-foreground">{t.kicker}</h3>
            </div>
            <input
              type="text"
              dir="ltr"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={t.placeholder}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              className="w-full text-center text-2xl font-black tracking-[0.2em] font-mono uppercase px-4 py-4 rounded-2xl border-2 border-border focus:border-[#0BB4B0] outline-none bg-background mb-3"
              data-testid="input-recovery-code"
            />
            {error && (
              <p
                className="text-xs text-red-600 text-center mb-3"
                data-testid="text-restore-error"
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={busy || !isValidLength}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#0D2137] hover:bg-[#0a3d5c] disabled:opacity-50 text-white font-bold text-sm"
              data-testid="button-submit-restore"
            >
              <Cloud size={16} />
              {busy ? t.submitting : t.submit}
            </button>
            <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-muted-foreground">
              <ShieldCheck size={12} className="text-[#0BB4B0]" />
              <span>{t.safeNote}</span>
            </div>
          </motion.form>
        )}

        <Link
          href="/about"
          className="block text-center text-xs text-muted-foreground hover:text-foreground"
        >
          ← {t.backHome}
        </Link>
      </div>
    </Layout>
  );
}
