import { useState } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  CloudOff,
  Copy,
  RefreshCw,
  ShieldCheck,
  KeyRound,
} from "lucide-react";
import { Link } from "wouter";
import {
  useBackupStore,
  createOrUpdateBackup,
  isCloudBackupAvailable,
} from "@/lib/cloud-backup";
import { useLangStore } from "@/lib/lang-store";
import { SaveCodeReminderModal } from "@/components/save-code-reminder-modal";

const TXT = {
  ar: {
    kicker: "النسخ الاحتياطي",
    title: "احفظي بياناتكِ في السحابة",
    desc: "إذا تعطّل الهاتف أو غيّرتِه، يمكنكِ استعادة كل النتائج والمفضّلة برمز استرجاع قصير.",
    descNoCode: "احفظي رمز الاسترجاع في مكان آمن. أي شخص يحصل على الرمز يستطيع الاطّلاع على نسختكِ والتعديل عليها.",
    create: "أنشئي رمز استرجاع",
    creating: "جاري الإنشاء...",
    yourCode: "رمز الاسترجاع",
    sync: "تحديث النسخة الآن",
    syncing: "جاري التحديث...",
    lastSync: "آخر تحديث:",
    copy: "نسخ",
    copied: "تم النسخ ✓",
    restoreCta: "عندكِ رمز سابق؟ استرجعي نسختكِ",
    offlineTitle: "النسخ الاحتياطي السحابي غير متاح",
    offlineDesc: "هذه ميزة تحتاج إنترنت. استخدمي نسخة الموقع على numoo.site لحفظ بياناتكِ في السحابة.",
    error: "تعذّر الحفظ. حاولي بعد قليل.",
    errorNotFound: "الرمز المرتبط بالبيانات لم يعد موجوداً. أنشئي رمزاً جديداً.",
    safeNote: "بدون بريد إلكتروني • احفظي الرمز لكِ وحدكِ",
  },
  en: {
    kicker: "CLOUD BACKUP",
    title: "Save your data to the cloud",
    desc: "If your phone breaks or you switch devices, you can restore all your results and bookmarks with a short recovery code.",
    descNoCode: "Keep this code private. Anyone with it can read or overwrite your backup — no email or account needed.",
    create: "Create recovery code",
    creating: "Creating...",
    yourCode: "Recovery code",
    sync: "Sync now",
    syncing: "Syncing...",
    lastSync: "Last sync:",
    copy: "Copy",
    copied: "Copied ✓",
    restoreCta: "Have an existing code? Restore your data",
    offlineTitle: "Cloud backup unavailable",
    offlineDesc: "This feature requires internet. Visit numoo.site to back up your data to the cloud.",
    error: "We couldn't save. Please try again.",
    errorNotFound: "The saved code no longer exists. Please create a new one.",
    safeNote: "No email • Keep your code private",
  },
} as const;

export function CloudBackupCard() {
  const lang = useLangStore((s) => s.lang);
  const t = TXT[lang];
  const code = useBackupStore((s) => s.code);
  const lastSyncAt = useBackupStore((s) => s.lastSyncAt);
  const acknowledgedSaved = useBackupStore((s) => s.acknowledgedSaved);
  const setCode = useBackupStore((s) => s.setCode);
  const setLastSync = useBackupStore((s) => s.setLastSync);
  const acknowledgeSaved = useBackupStore((s) => s.acknowledgeSaved);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  const available = isCloudBackupAvailable();

  if (!available) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-3xl p-5 shadow-sm border border-border"
        data-testid="cloud-backup-offline"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0">
            <CloudOff size={18} />
          </div>
          <div>
            <span className="text-[10px] font-black text-muted-foreground tracking-wider uppercase block mb-1">
              {t.kicker}
            </span>
            <h3 className="font-bold text-foreground">{t.offlineTitle}</h3>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{t.offlineDesc}</p>
      </motion.div>
    );
  }

  const handleSync = async () => {
    setBusy(true);
    setError(null);
    const isFirstTime = !code;
    try {
      const r = await createOrUpdateBackup(code);
      setCode(r.code);
      setLastSync(r.updatedAt);
      // After creating a brand-new code, surface the save-the-code reminder
      // unless the user has already acknowledged it before.
      if (isFirstTime && !acknowledgedSaved) {
        setShowReminder(true);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "unknown";
      if (msg === "code_not_found") {
        setError(t.errorNotFound);
        setCode(null);
      } else {
        setError(t.error);
      }
    } finally {
      setBusy(false);
    }
  };

  const handleAcknowledge = () => {
    acknowledgeSaved();
    setShowReminder(false);
  };

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  const formattedDate = lastSyncAt
    ? new Date(lastSyncAt).toLocaleString(lang === "ar" ? "ar-KW" : "en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-3xl p-5 shadow-sm border border-border"
      data-testid="cloud-backup-card"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#0BB4B0]/10 text-[#0BB4B0] flex items-center justify-center flex-shrink-0">
          <Cloud size={18} />
        </div>
        <div>
          <span className="text-[10px] font-black text-[#0BB4B0] tracking-wider uppercase block mb-1">
            {t.kicker}
          </span>
          <h3 className="font-bold text-foreground">{t.title}</h3>
        </div>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
        {code ? t.descNoCode : t.desc}
      </p>

      {code && (
        <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] rounded-2xl p-4 mb-3 text-white">
          <div className="flex items-center gap-2 mb-2">
            <KeyRound size={14} className="text-[#E0A858]" />
            <span className="text-[10px] font-black tracking-wider uppercase text-white/70">
              {t.yourCode}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <code
              dir="ltr"
              className="text-2xl font-black tracking-[0.2em] text-[#E0A858] font-mono select-all"
              data-testid="text-recovery-code"
            >
              {code}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-xs font-bold"
              data-testid="button-copy-code"
            >
              <Copy size={12} />
              {copied ? t.copied : t.copy}
            </button>
          </div>
          {formattedDate && (
            <p className="text-[10px] text-white/50 mt-2">
              {t.lastSync} {formattedDate}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={handleSync}
          disabled={busy}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#0BB4B0] hover:bg-[#099b97] disabled:opacity-50 transition-colors text-white font-bold text-sm"
          data-testid="button-sync-backup"
        >
          {busy ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              {code ? t.syncing : t.creating}
            </>
          ) : (
            <>
              <Cloud size={16} />
              {code ? t.sync : t.create}
            </>
          )}
        </button>

        <Link
          href="/restore"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border-2 border-border hover:border-primary/40 transition-colors text-foreground font-bold text-sm"
          data-testid="link-restore"
        >
          <KeyRound size={16} />
          {t.restoreCta}
        </Link>
      </div>

      {error && (
        <p className="text-xs text-red-600 mt-3 text-center" data-testid="text-backup-error">
          {error}
        </p>
      )}

      <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-muted-foreground">
        <ShieldCheck size={12} className="text-[#0BB4B0]" />
        <span>{t.safeNote}</span>
      </div>
    </motion.div>

    <SaveCodeReminderModal
      open={showReminder}
      code={code}
      onClose={handleAcknowledge}
    />
    </>
  );
}
