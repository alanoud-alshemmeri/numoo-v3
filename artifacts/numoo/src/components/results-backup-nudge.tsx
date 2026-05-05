import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, RefreshCw, X, ShieldCheck } from "lucide-react";
import {
  useBackupStore,
  createOrUpdateBackup,
  isCloudBackupAvailable,
} from "@/lib/cloud-backup";
import { useLangStore } from "@/lib/lang-store";
import { SaveCodeReminderModal } from "@/components/save-code-reminder-modal";

const TXT = {
  ar: {
    kicker: "احفظي بياناتكِ",
    title: "احفظي نسختكِ بأمان قبل أن تكملي",
    desc: "نتيجتكِ ومفضّلاتكِ محفوظة على الهاتف فقط. أنشئي رمز استرجاع من ٨ خانات — وإذا تغيّر الهاتف أو حُذف التطبيق، يمكنكِ استعادة بياناتكِ في ثوانٍ.",
    cta: "أنشئي رمز استرجاع الآن",
    creating: "جاري الإنشاء…",
    later: "ليس الآن",
    error: "تعذّر الحفظ. حاولي بعد قليل.",
    safe: "بدون بريد إلكتروني • ثواني فقط",
  },
  en: {
    kicker: "BACK UP YOUR DATA",
    title: "Save your results before you continue",
    desc: "Your assessment and bookmarks live only on this device. Create an 8-character recovery code — if you change phones or clear the app, you can restore in seconds.",
    cta: "Create recovery code now",
    creating: "Creating…",
    later: "Not now",
    error: "We couldn't save. Please try again.",
    safe: "No email • Takes seconds",
  },
} as const;

export function ResultsBackupNudge() {
  const lang = useLangStore((s) => s.lang);
  const t = TXT[lang];

  const code = useBackupStore((s) => s.code);
  const acknowledgedSaved = useBackupStore((s) => s.acknowledgedSaved);
  const setCode = useBackupStore((s) => s.setCode);
  const setLastSync = useBackupStore((s) => s.setLastSync);
  const acknowledgeSaved = useBackupStore((s) => s.acknowledgeSaved);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  const showNudge = isCloudBackupAvailable() && !code && !dismissed;

  const handleCreate = async () => {
    setBusy(true);
    setError(null);
    try {
      const result = await createOrUpdateBackup(null);
      setCode(result.code);
      setLastSync(result.updatedAt);
      setCreatedCode(result.code);
      if (!acknowledgedSaved) {
        setShowReminder(true);
      }
    } catch (e: unknown) {
      setError(t.error);
      void e;
    } finally {
      setBusy(false);
    }
  };

  const handleClose = () => {
    acknowledgeSaved();
    setShowReminder(false);
  };

  return (
    <>
      {showNudge && (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-[#0BB4B0]/10 via-[#0BB4B0]/5 to-transparent border-2 border-[#0BB4B0]/30 rounded-3xl p-5 mt-6"
        data-testid="results-backup-nudge"
      >
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute top-3 end-3 w-7 h-7 rounded-full hover:bg-foreground/10 flex items-center justify-center text-muted-foreground transition-colors"
          aria-label={t.later}
          data-testid="button-nudge-dismiss"
        >
          <X size={14} />
        </button>

        <div className="flex items-center gap-3 mb-3 pe-8">
          <div className="w-11 h-11 rounded-2xl bg-[#0BB4B0]/15 text-[#0BB4B0] flex items-center justify-center flex-shrink-0">
            <Cloud size={20} />
          </div>
          <div>
            <span className="text-[10px] font-black text-[#0BB4B0] tracking-wider uppercase block mb-0.5">
              {t.kicker}
            </span>
            <h3 className="font-black text-foreground text-base leading-tight">
              {t.title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          {t.desc}
        </p>

        <button
          type="button"
          onClick={handleCreate}
          disabled={busy}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#0BB4B0] hover:bg-[#099b97] disabled:opacity-50 transition-colors text-white font-bold text-sm"
          data-testid="button-nudge-create"
        >
          {busy ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              {t.creating}
            </>
          ) : (
            <>
              <Cloud size={16} />
              {t.cta}
            </>
          )}
        </button>

        {error && (
          <p
            className="text-xs text-red-600 mt-3 text-center"
            data-testid="text-nudge-error"
          >
            {error}
          </p>
        )}

        <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-muted-foreground">
          <ShieldCheck size={12} className="text-[#0BB4B0]" />
          <span>{t.safe}</span>
        </div>
      </motion.div>
      )}

      <SaveCodeReminderModal
        open={showReminder && !acknowledgedSaved}
        code={createdCode}
        onClose={handleClose}
      />
    </>
  );
}
