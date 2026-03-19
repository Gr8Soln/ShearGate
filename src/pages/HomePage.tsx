import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, BookOpen, Zap, Shield, FileText, TrendingUp, CheckCircle2 } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Calculator,
      title: 'Automated Analysis',
      description: 'Input parameters manually or let AI extract them from your questions',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'BS 5950 Compliant',
      description: 'All calculations follow British Standard design codes',
      color: 'green'
    },
    {
      icon: FileText,
      title: 'Step-by-Step Solutions',
      description: 'Detailed calculation steps with clause references',
      color: 'orange'
    },
    {
      icon: BookOpen,
      title: 'Interactive Clauses',
      description: 'Click on any clause reference to view full standard text',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Fast & Accurate',
      description: 'Get instant results with professional-grade precision',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'Track History',
      description: 'Save and review all your previous calculations',
      color: 'orange'
    }
  ];

  const connectionTypes = [
    'Bearing-type connections',
    'Slip-resistant connections',
    'Tension connections',
    'Shear connections',
    'Combined shear and tension',
    'All ordinary bolt grades (4.6, 8.8)'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-engineering text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="badge bg-white/10 text-white border-white/20 backdrop-blur-sm">
              CVE505 | Design of Steel Structures
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Block Shear Analysis
            <br />
            <span className="text-blue-300">Made Simple</span>
          </h1>
          
          <p className="text-xl text-steel-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Professional block shear failure analysis for bolted connections following BS 5950 standards.
            Built for engineering students and professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/analyze" className="btn-primary bg-white text-steel-900 hover:bg-steel-100 shadow-lg text-lg px-8 py-4">
              Start Analysis
              <Calculator className="w-5 h-5 ml-2 inline" />
            </Link>
            <Link to="/clauses" className="btn-secondary bg-transparent text-white border-white/30 hover:bg-white/10 text-lg px-8 py-4">
              Browse BS 5950
              <BookOpen className="w-5 h-5 ml-2 inline" />
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">100%</div>
              <div className="text-sm text-steel-300">BS 5950 Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">AI</div>
              <div className="text-sm text-steel-300">Powered Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">∞</div>
              <div className="text-sm text-steel-300">Free Calculations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-steel-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-steel-600 max-w-2xl mx-auto">
              Powerful features designed to make block shear analysis effortless and educational
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="card p-6 hover:shadow-xl transition-all duration-300 group">
                <div className={`w-14 h-14 bg-accent-${feature.color}/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-accent-${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-steel-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-steel-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Types Coverage */}
      <section className="py-20 px-4 bg-steel-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-steel-900 mb-4">
              Comprehensive Coverage
            </h2>
            <p className="text-lg text-steel-600">
              Supports all bolted connection types per BS 5950
            </p>
          </div>

          <div className="card p-8">
            <div className="grid md:grid-cols-2 gap-4">
              {connectionTypes.map((type, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-steel-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span className="text-steel-700 font-medium">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-elevated p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-steel-900 mb-6">
              Ready to Analyze Your First Connection?
            </h2>
            <p className="text-lg text-steel-600 mb-8 max-w-2xl mx-auto">
              Join students and professionals using the most advanced block shear analysis tool.
              No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg px-8 py-4">
                Create Free Account
              </Link>
              <Link to="/analyze" className="btn-secondary text-lg px-8 py-4">
                Try Without Signup
              </Link>
            </div>
            <p className="text-sm text-steel-500 mt-6">
              Full access • No installation required • Works on any device
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-steel-900 text-steel-300 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                  <circle cx="8" cy="8" r="2" fill="white"/>
                  <circle cx="16" cy="8" r="2" fill="white"/>
                  <circle cx="8" cy="16" r="2" fill="white"/>
                  <circle cx="16" cy="16" r="2" fill="white"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white">Block Shear Analyzer</span>
            </div>
            <p className="text-steel-400 mb-4">
              Professional structural analysis tool for CVE505: Design of Steel Structures
            </p>
          </div>
          
          <div className="border-t border-steel-700 pt-6">
            <p className="text-sm text-steel-400">
              © 2026 Block Shear Analyzer. Built with React, Tailwind CSS, and FastAPI.
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
