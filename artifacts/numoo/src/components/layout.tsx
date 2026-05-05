import { Link, useLocation } from "wouter";
import { useLangStore } from "@/lib/lang-store";
import { useT } from "@/lib/i18n";
import { Home, ClipboardCheck, Building2, MessageCircle } from "lucide-react";

export function Layout({ children, hideNav = false, hideFooter = false }: { children: React.ReactNode; hideNav?: boolean; hideFooter?: boolean }) {
  const { lang, setLang } = useLangStore();
  const { t } = useT();
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans">
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => setLang("ar")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all backdrop-blur-md border-2 border-white/20 ${
            lang === "ar" ? "bg-primary text-primary-foreground border-primary" : "bg-white/10 text-foreground hover:bg-white/20"
          }`}
        >
          AR
        </button>
        <button
          onClick={() => setLang("en")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all backdrop-blur-md border-2 border-white/20 ${
            lang === "en" ? "bg-primary text-primary-foreground border-primary" : "bg-white/10 text-foreground hover:bg-white/20"
          }`}
        >
          EN
        </button>
      </div>

      <main className="flex-1 flex flex-col">{children}</main>

      {!hideFooter && (
        <footer className="bg-[#0D2137] text-white py-12 px-6 mt-12 pb-32">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl overflow-hidden flex items-center justify-center">
                  <img src="/numoo-logo.png" alt="Numoo Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-black">{t('appTitle')}</span>
              </div>
              <p className="text-sm text-white/60 mb-6">{t('appTagline')}</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t('platform')}</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/about">{t('footerAbout')}</Link></li>
                <li><Link href="/privacy">{t('privacy')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">{t('resources')}</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/sources" className="hover:text-primary transition-colors">{t('sources')}</Link></li>
                <li><Link href="/centers" className="hover:text-primary transition-colors">{t('navCenters')}</Link></li>
                <li><Link href="/library" className="hover:text-primary transition-colors">{lang === 'ar' ? 'مكتبة المراجع' : 'Library'}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-[#E0A858]">
                {lang === 'ar' ? 'خطوط الدعم في الكويت' : 'Kuwait Support Lines'}
              </h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center justify-between gap-2">
                  <span>{lang === 'ar' ? 'الطوارئ' : 'Emergency'}</span>
                  <a href="tel:112" className="font-black text-white hover:text-primary">١١٢</a>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>{lang === 'ar' ? 'حماية الطفل' : 'Child Protection'}</span>
                  <a href="tel:147" className="font-black text-white hover:text-primary">١٤٧</a>
                </li>
                <li className="flex items-center justify-between gap-2">
                  <span>{lang === 'ar' ? 'الإعاقة (PADA)' : 'Disability (PADA)'}</span>
                  <a href="tel:1861111" className="font-black text-white hover:text-primary text-[12px]">١٨٦١١١١</a>
                </li>
                <li className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                  <MessageCircle size={14} />
                  <a href="mailto:support@numoo.kw" className="hover:text-primary text-[12px]">support@numoo.kw</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-12 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/40 mb-2">{t('resDisclaimer')}</p>
            <p className="text-xs text-white/40">{t('copyright')}</p>
          </div>
        </footer>
      )}

      {!hideNav && (() => {
        const tabs = [
          {
            href: "/",
            icon: Home,
            label: t("navHome"),
            isActive: location === "/",
          },
          {
            href: "/age",
            icon: ClipboardCheck,
            label: t("navScreening"),
            isActive:
              location.startsWith("/age") ||
              location.startsWith("/screening") ||
              location.startsWith("/results"),
          },
          {
            href: "/centers",
            icon: Building2,
            label: t("navCenters"),
            isActive: location === "/centers",
          },
          {
            href: "/chatbot",
            icon: MessageCircle,
            label: t("navAsk"),
            isActive: location === "/chatbot",
          },
        ];

        return (
          <nav
            aria-label={t("navHome")}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] max-w-md"
          >
            <div className="relative bg-[#0D2137]/92 backdrop-blur-2xl border border-white/10 shadow-[0_18px_50px_rgba(6,16,28,0.55)] rounded-[28px] px-2 py-2 grid grid-cols-4 gap-1">
              {tabs.map((tab, i) => {
                const Icon = tab.icon;
                return (
                  <Link key={i} href={tab.href}>
                    <div
                      aria-current={tab.isActive ? "page" : undefined}
                      className={`relative flex flex-col items-center justify-center gap-1 py-2 rounded-2xl text-[10.5px] cursor-pointer transition-all duration-300 ${
                        tab.isActive
                          ? "bg-primary text-white shadow-[0_6px_18px_rgba(10,191,188,0.45)] font-extrabold scale-[1.02]"
                          : "text-white/55 hover:text-white hover:bg-white/5 font-semibold"
                      }`}
                    >
                      {tab.isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E0A858] shadow-[0_0_8px_rgba(224,168,88,0.7)]"
                        />
                      )}
                      <Icon
                        size={19}
                        strokeWidth={tab.isActive ? 2.4 : 1.9}
                      />
                      <span className="leading-none">{tab.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
        );
      })()}
    </div>
  );
}
