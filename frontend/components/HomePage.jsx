import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Shield, Sparkles, TrendingUp, Cpu } from "lucide-react";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans antialiased selection:bg-slate-950 selection:text-white">
      {/* HEADER / NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-950 text-white rounded-xl">
            <TrendingUp size={20} strokeWidth={2} />
          </div>
          <span className="text-xl font-bold tracking-tight">CASHFLOW</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/login")}
            className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors px-4 py-2"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate("/register")}
            className="bg-slate-950 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200/60 px-4 py-1.5 rounded-full text-xs font-medium text-slate-700 animate-fade-in">
          <Sparkles size={14} className="text-amber-500 fill-amber-500" />
          AI-Powered Smart Expense Tracking Protocols
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-950 max-w-4xl leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700">
          Take absolute control of your money.
        </h1>
        
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl font-normal leading-relaxed">
          An automated, clean, and minimal dashboard engineered to map budgets, sync multi-peer logs, and protect your net floor value in real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <button 
            onClick={() => navigate("/register")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-950 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-slate-800 shadow-xl shadow-slate-950/10 active:scale-95 transition-all group"
          >
            Initialize Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-semibold text-base hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
          >
            Access Account
          </button>
        </div>
      </header>

      {/* INTERACTIVE COMPONENT / PREVIEW ZONE */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-white border border-slate-200/60 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-4 md:p-8 animate-in fade-in zoom-in-95 duration-1000 delay-200">
          <div className="border border-slate-100 rounded-3xl bg-slate-50/50 p-6 flex flex-col gap-6">
            {/* Window control dots mock up */}
            <div className="flex gap-1.5 items-center">
              <span className="w-3 h-3 rounded-full bg-rose-200" />
              <span className="w-3 h-3 rounded-full bg-amber-200" />
              <span className="w-3 h-3 rounded-full bg-emerald-200" />
              <span className="text-xs text-slate-400 font-mono ml-2">secure_session_v3a.exe</span>
            </div>
            
            {/* Content Mock */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-50/40 border border-emerald-100/70 p-6 rounded-2xl">
                <p className="text-slate-400 text-[10px] tracking-widest uppercase font-bold">Total Inflow</p>
                <p className="text-2xl font-semibold text-emerald-600 mt-1">₹75,000.00</p>
              </div>
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-400 text-[10px] tracking-widest uppercase font-bold">Net Metrics</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">₹24,500.00</p>
              </div>
              <div className="bg-rose-50/40 border border-rose-100/70 p-6 rounded-2xl">
                <p className="text-slate-400 text-[10px] tracking-widest uppercase font-bold">Active Breach Threshold</p>
                <p className="text-2xl font-semibold text-rose-600 mt-1">0.00%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES / CORE FEATURES SECTION */}
      <section className="bg-white border-t border-slate-100 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 flex flex-col items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">Engineered Features</h2>
            <p className="text-slate-500 max-w-lg">Advanced protocols optimized for swift fiscal management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 border border-slate-100 rounded-3xl bg-[#fafafa] flex flex-col gap-4 hover:border-slate-300/80 transition-all duration-300">
              <div className="p-3 bg-slate-950 text-white w-fit rounded-xl">
                <Cpu size={20} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">OCR Receipt Extraction</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Scan your bills instantly. Intelligent layout processing interprets vendor logs and structuralizes raw pricing data automatically into your records.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 border border-slate-100 rounded-3xl bg-[#fafafa] flex flex-col gap-4 hover:border-slate-300/80 transition-all duration-300">
              <div className="p-3 bg-slate-950 text-white w-fit rounded-xl">
                <Zap size={20} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Dynamic Safeguards</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Configure your strict budget rules and protective parameters. Receive micro-alerts instantly the moment your net liquid calculations fall under target ranges.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 border border-slate-100 rounded-3xl bg-[#fafafa] flex flex-col gap-4 hover:border-slate-300/80 transition-all duration-300">
              <div className="p-3 bg-slate-950 text-white w-fit rounded-xl">
                <Shield size={20} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Cryptographic Integrity</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                End-to-end user state protection with structuralized token systems. Your financial logs remain isolated, sanitized, and authentic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium uppercase tracking-wider">
        <p>© 2026 Cashflow inc. All computational infrastructure secure.</p>
        <p className="font-mono">Build alpha_v3.1.2</p>
      </footer>
    </div>
  );
}