import {
  BookOpen,
  Calculator,
  CheckCircle2,
  FileText,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Calculator,
      title: "Automated Analysis",
      description:
        "Input parameters manually or let AI extract them from your questions",
      color: "blue",
    },
    {
      icon: Shield,
      title: "BS 5950 Compliant",
      description: "All calculations follow British Standard design codes",
      color: "green",
    },
    {
      icon: FileText,
      title: "Step-by-Step Solutions",
      description: "Detailed calculation steps with clause references",
      color: "orange",
    },
    {
      icon: BookOpen,
      title: "Interactive Clauses",
      description: "Click on any clause reference to view full standard text",
      color: "blue",
    },
    {
      icon: Zap,
      title: "Fast & Accurate",
      description: "Get instant results with professional-grade precision",
      color: "green",
    },
    {
      icon: TrendingUp,
      title: "Track History",
      description: "Save and review all your previous calculations",
      color: "orange",
    },
  ];

  const connectionTypes = [
    "Bearing-type connections",
    "Slip-resistant connections",
    "Tension connections",
    "Shear connections",
    "Combined shear and tension",
    "All ordinary bolt grades (4.6, 8.8)",
  ];

  return (
    <div className="min-h-screen font-sans bg-transparent">
      {/* Hero Section */}
      <section className="relative text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6">
            <span className="badge bg-white/5 text-amber-300 border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(232,160,32,0.2)]">
              CVE505 | Design of Steel Structures
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            Block Shear Analysis
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-400 to-amber-400 drop-shadow-[0_0_10px_rgba(232,160,32,0.4)]">
              Made Simple
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Professional block shear failure analysis for bolted connections
            following BS 5950 standards. Built for engineering students and
            professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/analyze"
              className="btn-primary hover:shadow-[0_0_20px_rgba(232,160,32,0.5)] text-lg px-8 py-4 flex items-center gap-2"
            >
              Start Analysis
              <Calculator className="w-5 h-5" />
            </Link>
            <Link
              to="/clauses"
              className="btn-secondary text-lg px-8 py-4 flex items-center gap-2"
            >
              Browse BS 5950
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-20 max-w-3xl mx-auto bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-2xl shadow-amber-900/20">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2 drop-shadow-[0_0_10px_rgba(232,160,32,0.4)]">
                100%
              </div>
              <div className="text-sm text-white/60">BS 5950 Compliant</div>
            </div>
            <div className="text-center border-l border-r border-white/10">
              <div className="text-4xl font-bold text-amber-400 mb-2 drop-shadow-[0_0_10px_rgba(232,160,32,0.4)]">
                AI
              </div>
              <div className="text-sm text-white/60">Powered Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2 drop-shadow-[0_0_10px_rgba(232,160,32,0.4)]">
                ∞
              </div>
              <div className="text-sm text-white/60">Free Calculations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-black/40 backdrop-blur-sm border-y border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-300">
              Everything You Need
            </h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Powerful features designed to make block shear analysis effortless
              and educational
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="card p-6 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(232,160,32,0.3)] transition-all`}
                >
                  <feature.icon
                    className={`w-7 h-7 text-white/80 group-hover:text-amber-400`}
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Types Coverage */}
      <section className="py-24 px-4 bg-transparent relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-300 mb-4">
              Comprehensive Coverage
            </h2>
            <p className="text-lg text-white/60">
              Supports all bolted connection types per BS 5950
            </p>
          </div>

          <div className="card-elevated p-8 bg-black/40 border-white/10 shadow-[0_0_50px_rgba(232,160,32,0.1)]">
            <div className="grid md:grid-cols-2 gap-4">
              {connectionTypes.map((type, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-amber-500/30 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0 drop-shadow-[0_0_5px_rgba(232,160,32,0.5)]" />
                  <span className="text-white/80 font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-black/60 relative z-10 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-elevated p-12 bg-gradient-to-b from-amber-900/20 to-transparent border border-white/10 shadow-[0_0_30px_rgba(232,160,32,0.15)] backdrop-blur-md">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to Analyze Your First Connection?
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto font-light">
              Join students and professionals using the most advanced block
              shear analysis tool. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="btn-primary flex justify-center items-center text-lg px-8 py-4 shadow-[0_0_20px_rgba(232,160,32,0.4)]"
              >
                Create Free Account
              </Link>
              <Link
                to="/analyze"
                className="btn-secondary flex justify-center items-center text-lg px-8 py-4"
              >
                Try Without Signup
              </Link>
            </div>
            <p className="text-sm text-white/40 mt-6">
              Full access • No installation required • Works on any device
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050508] text-white/50 py-12 px-4 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <circle cx="8" cy="8" r="2" fill="white" />
                  <circle cx="16" cy="8" r="2" fill="white" />
                  <circle cx="8" cy="16" r="2" fill="white" />
                  <circle cx="16" cy="16" r="2" fill="white" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">
                Block Shear Analyzer
              </span>
            </div>
            <p className="text-steel-400 mb-4">
              Professional structural analysis tool for CVE505: Design of Steel
              Structures
            </p>
          </div>

          <div className="border-t border-steel-700 pt-6">
            <p className="text-sm text-steel-400">
              © 2026 Block Shear Analyzer. Built with React, Tailwind CSS, and
              FastAPI.
            </p>
            <p className="text-xs text-steel-500 mt-2">
              All calculations follow BS 5950-1:2000 standards
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
