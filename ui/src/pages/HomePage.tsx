import React from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  Sparkles,
  ShieldCheck,
  FileText,
  Zap,
  History,
  ArrowRight,
  ChevronRight,
  Globe
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0f172a]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#e8a020]/5 rounded-full blur-[120px] animate-pulse delay-700" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles className="text-[#e8a020]" size={16} />
            <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">Next-Gen Structural Analysis</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            ShearGate <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e8a020] via-[#f59e0b] to-[#fbbf24]">
              Reimagined.
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            The world's first industrial-grade block shear analyzer powered by
            <span className="text-white font-bold ml-1">Gemini 2.0 Flash</span>.
            Precision calculations for BS 5950-1:2000 bolted connections.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link
              to={isAuthenticated ? "/analyze" : "/auth"}
              className="group px-8 py-5 rounded-[2rem] bg-white text-[#0f172a] font-black text-xl flex items-center space-x-3 shadow-2xl shadow-white/5 hover:scale-105 transition-all"
            >
              <span>{isAuthenticated ? "Launch Workspace" : "Get Started Free"}</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/clauses"
              className="px-8 py-5 rounded-[2rem] bg-slate-900 border border-slate-800 text-slate-300 font-bold text-lg hover:bg-slate-800 transition-all"
            >
              Explore Standard
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles size={32} />}
              title="AI Parameter Extraction"
              description="Upload sketches or paste problem text. Our Gemini-powered engine extracts design variables in seconds."
              delay="delay-[400ms]"
            />
            <FeatureCard
              icon={<ShieldCheck size={32} />}
              title="BS 5950 Compliance"
              description="Rock-solid calculations following Clause 6.2.4 strictly. Verified against industry standard benchmarks."
              delay="delay-[500ms]"
            />
            <FeatureCard
              icon={<FileText size={32} />}
              title="Narrative Explanations"
              description="Get plain-English walk-throughs of every design check. Perfect for audit reports and engineering learning."
              delay="delay-[600ms]"
            />
          </div>
        </div>
      </section>

      {/* Visual Teaser */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto bg-gradient-to-b from-slate-900 to-[#0f172a] border border-slate-800 rounded-[3rem] p-12 md:p-20 shadow-2xl text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-black text-white">Trusted by Structural Engineers</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              Streamline your connection design workflow. Go from design question to certified calculation in under 60 seconds.
            </p>
            <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <StatItem label="Steel Grades" val="S275/S355" />
              <StatItem label="Bolts Supported" val="4.6 / 8.8" />
              <StatItem label="Code Basis" val="BS 5950" />
              <StatItem label="AI Model" val="Flash 2.0" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-slate-600 text-sm font-bold">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
              <Calculator size={16} />
            </div>
            <span className="text-slate-400">ShearGate Enterprise</span>
          </div>
          <div className="flex items-center space-x-8">
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
          <p>© 2026 Structural Logic Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string, delay: string }> = ({ icon, title, description, delay }) => (
  <div className={`p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 hover:border-indigo-500/30 transition-all group animate-in fade-in slide-in-from-bottom-8 duration-1000 ${delay}`}>
    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-white mb-8 group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-indigo-600/20">
      {icon}
    </div>
    <h3 className="text-2xl font-black text-white mb-4 group-hover:text-indigo-400 transition-colors">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-medium">{description}</p>
  </div>
);

const StatItem: React.FC<{ label: string, val: string }> = ({ label, val }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-black uppercase tracking-widest">{label}</p>
    <p className="text-xl font-black text-white">{val}</p>
  </div>
);

export default HomePage;
