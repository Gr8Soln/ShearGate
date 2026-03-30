import {
  BookOpen,
  Calculator,
  FileText,
  History,
  ShieldCheck,
  Zap,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen relative bg-[#090a0c]">
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-16 sm:pb-20 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center">
            <span className="badge-glow animate-fade-in">
              CVE505 | Design of Steel Structures
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter leading-none animate-slide-up">
            ShearGate Analysis <br />
            <span className="text-[#e8a020]">Made Simple</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
            Professional ShearGate failure analysis for bolted connections
            following BS 5950 standards. Built for engineering students and
            professionals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to={isAuthenticated ? "/analyze" : "/auth"}
              className="btn-primary flex items-center gap-2 group"
            >
              <span>Start Analysis</span>
              <Calculator
                size={18}
                className="group-hover:rotate-12 transition-transform"
              />
            </Link>
            <Link
              to="/clauses"
              className="btn-secondary flex items-center gap-2"
            >
              <span>Browse BS 5950</span>
              <BookOpen size={18} />
            </Link>
          </div>
        </div>

        {/* Hero Features Row */}
        <div className="max-w-4xl mx-auto mt-16 sm:mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 py-8 sm:py-10 px-4 sm:px-6 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm">
            <HeroStat label="100%" sub="BS 5950 Compliant" />
            <HeroStat label="AI" sub="Powered Analysis" border />
            <HeroStat label="∞" sub="Free Calculations" border />
          </div>
        </div>
      </section>

      {/* Block Shear Explainer */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="card-premium p-6 sm:p-10 md:p-12 space-y-8 border border-[#e8a020]/15">
            <div className="space-y-4">
              <div className="inline-flex items-center">
                <span className="badge-glow">Core Concept</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                Will The Connection Tear Out?
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl">
                Block shear failure is a connection failure mode where a block
                of plate material tears out around bolts. It occurs under a
                combination of tension and shear stresses, so safe design must
                verify that the connection block shear capacity is greater than
                the applied load.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              <ExplainerCard
                icon={<ShieldCheck size={18} />}
                title="What ShearGate Determines"
                description="Whether your bolted connection passes or fails against block shear, with clear utilization and step-by-step reasoning."
              />
              <ExplainerCard
                icon={<FileText size={18} />}
                title="What The Check Depends On"
                description="Material strengths, bolt geometry, spacing, and edge/end distances all directly affect the tear-out resistance."
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <FactorPill label="Yield Strength (py)" />
              <FactorPill label="Ultimate Strength (fu)" />
              <FactorPill label="Bolt Layout & Spacing" />
              <FactorPill label="Edge and End Distances" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 sm:py-24 px-4 bg-[#090a0c]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Everything You Need
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto font-medium">
              Powerful features designed to make connection analysis effortless
              and educational
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureItem
              icon={<Zap size={20} />}
              title="Automated Analysis"
              desc="Input parameters manually or let AI extract them from your questions"
            />
            <FeatureItem
              icon={<ShieldCheck size={20} />}
              title="BS 5950 Compliant"
              desc="All calculations follow British Standard design codes strictly"
            />
            <FeatureItem
              icon={<FileText size={20} />}
              title="Step-by-Step Solutions"
              desc="Detailed calculation steps with clause references for every check"
            />
            <FeatureItem
              icon={<BookOpen size={20} />}
              title="Interactive Clauses"
              desc="Click on any clause reference to view full standard text instantly"
            />
            <FeatureItem
              icon={<Zap size={20} className="text-[#e8a020]" />}
              title="Fast & Accurate"
              desc="Get instant results with professional-grade precision every time"
            />
            <FeatureItem
              icon={<History size={20} />}
              title="Track History"
              desc="Save and review all your previous calculations in one dashboard"
            />
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-16 sm:py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Comprehensive Coverage
            </h2>
            <p className="text-slate-500 mt-2 font-medium">
              Supports all bolted connection types per BS 5950
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <CoverageItem text="Bearing-type connections" />
            <CoverageItem text="Slip-resistant connections" />
            <CoverageItem text="Tension connections" />
            <CoverageItem text="Shear connections" />
            <CoverageItem text="Combined shear and tension" />
            <CoverageItem text="All ordinary bolt grades (4.6, 8.8)" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto p-6 sm:p-10 md:p-16 bg-gradient-to-br from-[#161a1f] to-[#090a0c] border border-white/5 rounded-[2.5rem] text-center space-y-6 sm:space-y-8 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            Ready to Analyze Your First <br /> Connection?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">
            Join students and professionals using the most advanced ShearGate
            analysis tool.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to={isAuthenticated ? "/analyze" : "/auth"}
              className="btn-primary px-10"
            >
              Sign In to Get Started
            </Link>
          </div>
          <p className="text-xs text-slate-600 font-bold uppercase tracking-widest pt-4">
            Full access • No installation required • Works on any device
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 text-center space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#e8a020] border border-white/5">
            <Calculator size={16} />
          </div>
          <span className="text-white font-black uppercase tracking-widest text-sm">
            ShearGate Analyzer
          </span>
        </div>
        <p className="text-slate-600 text-[0.7rem] max-w-lg mx-auto leading-loose uppercase tracking-[0.1em] font-bold">
          Professional structural analysis tool for CVE505: Design of Steel
          Structures
        </p>
        <div className="pt-8 text-slate-700 text-[0.65rem] font-bold">
          © 2026 ShearGate Analyzer. Built with React, Tailwind CSS, and
          FastAPI. <br /> All calculations follow BS 5950-1:2000 standards.
        </div>
      </footer>
    </div>
  );
};

const HeroStat: React.FC<{ label: string; sub: string; border?: boolean }> = ({
  label,
  sub,
  border,
}) => (
  <div
    className={`flex flex-col items-center justify-center space-y-1 ${border ? "md:border-l border-white/10" : ""}`}
  >
    <span className="text-3xl font-black text-[#e8a020]">{label}</span>
    <span className="text-[0.65rem] font-black uppercase tracking-widest text-slate-500">
      {sub}
    </span>
  </div>
);

const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
}> = ({ icon, title, desc }) => (
  <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-[#e8a020]/30 hover:bg-white/[0.07] transition-all group">
    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 group-hover:bg-[#e8a020]/10 group-hover:text-[#e8a020] transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-[1.1rem] font-black text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

const ExplainerCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
    <div className="w-9 h-9 rounded-lg bg-[#e8a020]/10 border border-[#e8a020]/20 text-[#e8a020] flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-white font-black text-lg mb-2">{title}</h3>
    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
      {description}
    </p>
  </div>
);

const FactorPill: React.FC<{ label: string }> = ({ label }) => (
  <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-bold text-slate-300 text-center">
    {label}
  </div>
);

const CoverageItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/[0.08] transition-colors group">
    <div className="w-6 h-6 rounded-full bg-[#e8a020]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
      <div className="w-2.5 h-2.5 rounded-full bg-[#e8a020]" />
    </div>
    <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">
      {text}
    </span>
  </div>
);

export default HomePage;
