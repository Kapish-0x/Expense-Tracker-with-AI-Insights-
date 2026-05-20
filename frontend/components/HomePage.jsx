import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Sparkles, 
  TrendingUp, 
  Cpu, 
  Globe, 
  Layers, 
  Smartphone, 
  Mail, 
  MapPin, 
  Activity,
  QrCode,
  ArrowUpRight
} from "lucide-react";

export default function Homepage() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    if (i18n && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lng);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans antialiased selection:bg-slate-950 selection:text-white flex flex-col">
      {/* NAVBAR */}
      <nav className="max-w-7xl w-full mx-auto px-6 py-5 flex justify-between items-center border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-950 text-white rounded-xl">
            <TrendingUp size={20} strokeWidth={2} />
          </div>
          <span className="text-xl font-bold tracking-tight">CASHFLOW</span>
        </div>

        {/* MULTILINGUAL SELECTOR */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/50">
          <div className="pl-2 pr-1 text-slate-400 hidden sm:block">
            <Globe size={14} />
          </div>
          <button
            onClick={() => changeLanguage("en")}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              i18n.language === "en" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
            }`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("hi")}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              i18n.language === "hi" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => changeLanguage("te")}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
              i18n.language === "te" ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-950"
            }`}
          >
            తెలుగు
          </button>
        </div>
      </nav>

      {/* HORIZONTAL HERO CONTAINER */}
      <main className="max-w-7xl w-full mx-auto px-6 pt-12 md:pt-20 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Clean Minimal Typography & Triggers */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200/60 px-3.5 py-1.5 rounded-full text-[11px] font-medium text-slate-700 w-fit">
            <Sparkles size={12} className="text-amber-500 fill-amber-500" />
            {t("homepage.heroBadge")}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1]">
            {t("homepage.heroTitle")}
          </h1>
          
          <p className="text-slate-500 text-sm md:text-base max-w-md font-normal leading-relaxed">
            {t("homepage.heroSubtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
            <button 
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-950 text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-800 shadow-md active:scale-95 transition-all group"
            >
              {t("homepage.btnRegister")} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto flex items-center justify-center bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
            >
              {t("homepage.btnLogin")}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Asymmetric Content Blocks & System Views */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Main Visual Window (Dashboard Component Wireframe) */}
          <div className="bg-white border border-slate-200/70 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div className="flex gap-1.5 items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="text-[11px] text-slate-400 font-mono ml-2 tracking-tight">secure_dashboard.sys</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950 text-white text-[9px] px-2.5 py-1 font-bold uppercase tracking-wider rounded-lg">
                <Activity size={10} className="animate-pulse text-emerald-400" /> {t("homepage.activeSystem")}
              </div>
            </div>
            
            {/* Dynamic Metric Blocks inside the mock wireframe */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50/80 border border-slate-100 p-5 rounded-2xl">
                <p className="text-slate-400 text-[10px] tracking-widest uppercase font-bold">{t("homepage.totalInflow")}</p>
                <p className="text-2xl font-bold text-slate-950 mt-1">₹75,000</p>
              </div>
              <div className="bg-slate-50/80 border border-slate-100 p-5 rounded-2xl">
                <p className="text-slate-400 text-[10px] tracking-widest uppercase font-bold">{t("homepage.netMetrics")}</p>
                <p className="text-2xl font-bold text-slate-950 mt-1">₹24,500</p>
              </div>
            </div>

            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/30 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-medium text-slate-700">{t("homepage.stripeIngestion")}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">200 OK</span>
            </div>
          </div>

          {/* Sequential Core Protocol Rows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Protocol Row 1 */}
            <div className="bg-white border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between group hover:border-slate-300 transition-colors">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-slate-100 text-slate-950 rounded-xl">
                  <Cpu size={16} />
                </div>
                <ArrowUpRight size={14} className="text-slate-300 group-hover:text-slate-950 transition-colors" />
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-bold text-slate-950 mb-1">{t("homepage.feature1Title")}</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  {t("homepage.feature1Desc")}
                </p>
              </div>
            </div>

            {/* Protocol Row 2 */}
            <div className="bg-white border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between group hover:border-slate-300 transition-colors">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-slate-100 text-slate-950 rounded-xl">
                  <Zap size={16} />
                </div>
                <ArrowUpRight size={14} className="text-slate-300 group-hover:text-slate-950 transition-colors" />
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-bold text-slate-950 mb-1">{t("homepage.feature2Title")}</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  {t("homepage.feature2Desc")}
                </p>
              </div>
            </div>

            {/* Protocol Row 3 */}
            <div className="bg-white border border-slate-200/50 rounded-2xl p-5 flex flex-col justify-between group hover:border-slate-300 transition-colors sm:col-span-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-950 text-white rounded-xl shrink-0">
                    <Shield size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{t("homepage.feature3Title")}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {t("homepage.feature3Desc")}
                    </p>
                  </div>
                </div>
                <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 font-mono uppercase tracking-wider rounded-md shrink-0 hidden sm:block">AES-256</span>
              </div>
            </div>

          </div>

          {/* Quick Sync Tag */}
          <div className="bg-slate-100/50 border border-slate-200/30 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <QrCode size={16} className="text-slate-400" />
              <span className="text-xs text-slate-500 font-medium">{t("homepage.activationMatrix")}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 font-bold">ALPHA_v3.2</span>
          </div>

        </div>
      </main>

      {/* EXTENDED RICH FOOTER WITH CONTACT INFO */}
      <footer className="bg-white border-t border-slate-100 mt-auto pt-14 pb-10 w-full">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-950 text-white rounded-lg">
                <TrendingUp size={16} />
              </div>
              <span className="font-bold tracking-tight text-sm text-slate-950">CASHFLOW</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed uppercase tracking-wider font-medium">
              {t("homepage.footerBrandDesc")}
            </p>
          </div>

          {/* Infrastructure */}
          <div className="flex flex-col gap-3">
            <h5 className="text-[10px] font-bold text-slate-950 uppercase tracking-[2px] flex items-center gap-1.5">
              <Layers size={12} /> {t("homepage.footerCol1Title")}
            </h5>
            <ul className="text-xs text-slate-500 flex flex-col gap-2.5 font-medium">
              <li className="hover:text-slate-950 transition-colors cursor-pointer">{t("homepage.footerCol1Item1")}</li>
              <li className="hover:text-slate-950 transition-colors cursor-pointer">{t("homepage.footerCol1Item2")}</li>
              <li className="hover:text-slate-950 transition-colors cursor-pointer">{t("homepage.footerCol1Item3")}</li>
            </ul>
          </div>

          {/* Platform Info */}
          <div className="flex flex-col gap-3">
            <h5 className="text-[10px] font-bold text-slate-950 uppercase tracking-[2px] flex items-center gap-1.5">
              <Smartphone size={12} /> {t("homepage.footerCol2Title")}
            </h5>
            <ul className="text-xs text-slate-500 flex flex-col gap-2.5 font-medium">
              <li className="hover:text-slate-950 transition-colors cursor-pointer">{t("homepage.footerCol2Item1")}</li>
              <li className="hover:text-slate-950 transition-colors cursor-pointer">{t("homepage.footerCol2Item2")}</li>
              <li className="hover:text-slate-950 transition-colors cursor-pointer">{t("homepage.footerCol2Item3")}</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col gap-3">
            <h5 className="text-[10px] font-bold text-slate-950 uppercase tracking-[2px] flex items-center gap-1.5">
              <Mail size={12} /> {t("homepage.footerCol3Title")}
            </h5>
            <div className="text-xs text-slate-500 flex flex-col gap-3 font-medium">
              <div className="flex items-start gap-2">
                <Mail size={14} className="text-slate-400 mt-0.5 shrink-0" />
                <span className="break-all hover:text-slate-950 transition-colors cursor-pointer">support@cashflow.network</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  {t("homepage.footerAddress")}<br />{t("homepage.footerCountry")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          <p>{t("homepage.footerCopyright")}</p>
          <p className="font-mono bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg text-slate-500 text-[9px]">
            Build alpha_v3.2.0
          </p>
        </div>
      </footer>
    </div>
  );
}