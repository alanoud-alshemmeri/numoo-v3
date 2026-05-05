import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KeyRound, Copy, Camera, StickyNote, CheckCircle2 } from "lucide-react";
import { useLangStore } from "@/lib/lang-store";

const TXT = {
  ar: {
    saveTitle: "احفظي الرمز قبل أن تخرجي",
    saveDesc: "بدون الرمز لن يمكنكِ استعادة بياناتكِ. اختاري الطريقة المناسبة لكِ:",
    saveCopy: "نسخ الرمز",
    saveCopyDone: "تم النسخ ✓",
    saveScreenshot: "افعلي سكرين شوت لها الصفحة",
    saveNotes: "احفظي الرمز بملاحظات التلفون",
    saveAck: "حفظته ✓",
  },
  en: {
    saveTitle: "Save the code before you leave",
    saveDesc: "Without this code you cannot restore your data. Pick a way to keep it:",
    saveCopy: "Copy code",
    saveCopyDone: "Copied ✓",
    saveScreenshot: "Take a screenshot of this page",
    saveNotes: "Save it in your phone's notes app",
    saveAck: "I saved it ✓",
  },
} as const;

interface Props {
  open: boolean;
  code: string | null;
  onClose: () => void;
}

export function SaveCodeReminderModal({ open, code, onClose }: Props) {
  const lang = useLangStore((s) => s.lang);
  const t = TXT[lang];
  const [copied, setCopied] = useState(false);

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

  return (
    <AnimatePresence>
      {open && code && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={onClose}
          data-testid="save-code-reminder"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 240 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card rounded-3xl p-6 w-full max-w-md shadow-2xl border border-border"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E0A858]/15 text-[#E0A858] flex items-center justify-center flex-shrink-0">
                <KeyRound size={22} />
              </div>
              <h3 className="font-black text-lg text-foreground">{t.saveTitle}</h3>
            </div>

            <div className="bg-gradient-to-br from-[#0D2137] to-[#0a3d5c] rounded-2xl p-4 mb-4 text-center">
              <code
                dir="ltr"
                className="text-2xl font-black tracking-[0.2em] text-[#E0A858] font-mono select-all"
                data-testid="text-reminder-code"
              >
                {code}
              </code>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t.saveDesc}
            </p>

            <div className="space-y-2 mb-5">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-border hover:border-[#0BB4B0] hover:bg-[#0BB4B0]/5 transition-colors text-start"
                data-testid="button-reminder-copy"
              >
                <div className="w-9 h-9 rounded-xl bg-[#0BB4B0]/10 text-[#0BB4B0] flex items-center justify-center flex-shrink-0">
                  <Copy size={16} />
                </div>
                <span className="font-bold text-sm text-foreground flex-1">
                  {copied ? t.saveCopyDone : t.saveCopy}
                </span>
              </button>

              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-dashed border-border">
                <div className="w-9 h-9 rounded-xl bg-[#E0A858]/15 text-[#E0A858] flex items-center justify-center flex-shrink-0">
                  <Camera size={16} />
                </div>
                <span className="text-xs text-muted-foreground flex-1 leading-snug">
                  {t.saveScreenshot}
                </span>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-dashed border-border">
                <div className="w-9 h-9 rounded-xl bg-[#0D2137]/10 text-[#0D2137] flex items-center justify-center flex-shrink-0">
                  <StickyNote size={16} />
                </div>
                <span className="text-xs text-muted-foreground flex-1 leading-snug">
                  {t.saveNotes}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#0D2137] hover:bg-[#0a3d5c] text-white font-bold text-sm"
              data-testid="button-reminder-ack"
            >
              <CheckCircle2 size={16} />
              {t.saveAck}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
