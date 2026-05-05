import { MessageCircle } from "lucide-react";
import { openWhatsApp } from "@/lib/share";
import { useLangStore } from "@/lib/lang-store";

const TXT = {
  ar: { share: "شاركي بالواتساب", shareShort: "واتساب" },
  en: { share: "Share on WhatsApp", shareShort: "WhatsApp" },
} as const;

interface Props {
  text: string;
  variant?: "full" | "compact" | "icon";
  className?: string;
  testId?: string;
}

export function WhatsAppShareButton({
  text,
  variant = "full",
  className = "",
  testId,
}: Props) {
  const lang = useLangStore((s) => s.lang);
  const t = TXT[lang];

  const handleClick = () => openWhatsApp(text);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={t.share}
        title={t.share}
        className={
          "w-9 h-9 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] flex items-center justify-center transition-colors flex-shrink-0 " +
          className
        }
        data-testid={testId}
      >
        <MessageCircle size={16} />
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] text-xs font-bold transition-colors " +
          className
        }
        data-testid={testId}
      >
        <MessageCircle size={12} />
        {t.shareShort}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1fb858] text-white font-bold text-sm transition-colors " +
        className
      }
      data-testid={testId}
    >
      <MessageCircle size={16} />
      {t.share}
    </button>
  );
}
