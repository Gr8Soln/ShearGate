import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Printer,
  Download,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  MessageSquare,
  Loader2,
  ChevronRight,
  Info
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { explainApi, sessionApi } from "../api/client";
import { BS5950_CLAUSES, BS5950_TABLES } from "../data/bs5950";
import { ParseDescription } from "../utils/parseDescription";
import type { ConnectionInputs, BS5950Clause, BS5950Table } from "../types";

interface CalculationStep {
  title: string;
  description: string;
  clause?: string;
}

interface CalculationResult {
  py: number;
  fu: number;
  Av: number;
  At: number;
  Atn: number;
  Pbs1: number;
  Pbs2: number;
  Pbs: number;
  utilization: number;
  pass: boolean;
  steps: CalculationStep[];
}

const ResultsPage: React.FC = () => {
  const { id: sessionId } = useParams();
  const location = useLocation();
  const { user } = useAuth();

  const state = location.state as { inputs: ConnectionInputs, result: CalculationResult } | null;
  const [inputs, setInputs] = useState<ConnectionInputs | null>(state?.inputs || null);
  const [result, setResult] = useState<CalculationResult | null>(state?.result || null);

  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [selectedRef, setSelectedRef] = useState<{ id: string, type: "clause" | "table" } | null>(null);

  // Fetch session data if not provided in state (e.g. on refresh)
  useEffect(() => {
    if (!state && sessionId && sessionId !== "temporary") {
      sessionApi.get(sessionId).then(data => {
        if (data.messages && data.messages.length > 0) {
          const lastMsg = data.messages[data.messages.length - 1];
          if (lastMsg.input_parsed && lastMsg.result) {
            setInputs(lastMsg.input_parsed);
            setResult(lastMsg.result);
            setAiExplanation(lastMsg.ai_explanation || null);
          }
        }
      });
    }
  }, [sessionId, state]);

  const handleExplain = async () => {
    if (!inputs || !result) return;
    setIsExplaining(true);
    try {
      const { explanation } = await explainApi.explainResult(inputs, result);
      setAiExplanation(explanation);
    } catch (err) {
      console.error("AI Explanation failed", err);
    } finally {
      setIsExplaining(false);
    }
  };

  const onRefClick = (id: string, type: "clause" | "table") => {
    setSelectedRef({ id, type });
  };

  if (!inputs || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4" size={32} />
          <p>Loading analysis results...</p>
        </div>
      </div>
    );
  }

  const isSafe = result.pass;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto">
      {/* Navbar Actions */}
      <div className="flex items-center justify-between mb-10 no-print">
        <Link to="/analyze" className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm font-bold">Back to Analyze</span>
        </Link>
        <div className="flex items-center space-x-3">
          <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors">
            <Printer size={18} />
          </button>
          <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 hover:bg-indigo-600/20 transition-all font-bold text-sm">
            <Download size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Calculation Results */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Scorecard */}
          <div className={`relative overflow-hidden p-10 rounded-[2.5rem] border ${isSafe ? 'border-emerald-500/20 shadow-emerald-500/5' : 'border-rose-500/20 shadow-rose-500/5'} bg-slate-900/50 backdrop-blur-xl shadow-2xl`}>
            {/* Background Glow */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] ${isSafe ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`} />

            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 shadow-lg ${isSafe ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-rose-500 shadow-rose-500/20'}`}>
                {isSafe ? <CheckCircle2 className="text-white" size={48} /> : <XCircle className="text-white" size={48} />}
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-4xl font-black text-white mb-1">
                      {isSafe ? "Connection Safe" : "Action Required"}
                    </h1>
                    <p className="text-slate-500 font-medium">Standard Check per BS 5950-1:2000 Clause 6.2.4</p>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl font-black text-lg ${isSafe ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                    {(result.utilization * 100).toFixed(1)}% <span className="text-xs opacity-60">Util.</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Design Capacity</p>
                    <p className="text-2xl font-mono font-bold text-white">{result.Pbs.toFixed(1)}<span className="text-sm ml-1 opacity-40">kN</span></p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Applied Force</p>
                    <p className="text-2xl font-mono font-bold text-white">{(inputs.appliedLoad || 0).toFixed(1)}<span className="text-sm ml-1 opacity-40">kN</span></p>
                  </div>
                  <div className="space-y-1 hidden lg:block">
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Steel Grade</p>
                    <p className="text-2xl font-mono font-bold text-indigo-400">{inputs.plateMaterial}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Narrative Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            <div className="bg-gradient-to-r from-indigo-500/10 via-transparent to-transparent p-8 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">AI Engineering Explanation</h3>
                  <p className="text-xs text-slate-500">Narrative generated by Gemini 2.0 Flash</p>
                </div>
              </div>
              {!aiExplanation && (
                <button
                  onClick={handleExplain}
                  disabled={isExplaining}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all disabled:opacity-50"
                >
                  {isExplaining ? <Loader2 className="animate-spin" size={18} /> : "Generate Narrative"}
                </button>
              )}
            </div>
            <div className="p-10">
              {aiExplanation ? (
                <div className="prose prose-invert prose-indigo max-w-none text-slate-300 leading-relaxed text-lg font-medium">
                  <ParseDescription text={aiExplanation} onRefClick={onRefClick} />
                </div>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <p className="text-slate-500 max-w-sm mx-auto">Get a personalized, clause-by-clause explanation of your results using ShearGate's AI engine.</p>
                  <button onClick={handleExplain} className="text-indigo-400 font-bold hover:underline">Click to start AI analysis</button>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Steps */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold font-syne text-white flex items-center space-x-3">
              <Calculator className="text-[#e8a020]" size={24} />
              <span>Full Step-by-Step Breakdown</span>
            </h3>
            <div className="grid gap-4">
              {result.steps.map((step, idx) => (
                <div key={idx} className="group bg-slate-900/50 border border-slate-800 hover:border-slate-700 p-6 rounded-[2rem] transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-black text-slate-400">{idx + 1}</span>
                      <h4 className="font-bold text-white text-lg">{step.title}</h4>
                    </div>
                    {step.clause && (
                      <button
                        onClick={() => onRefClick(step.clause!, "clause")}
                        className="text-[10px] font-black uppercase text-indigo-400 hover:text-indigo-300 tracking-tighter"
                      >
                        Clause {step.clause}
                      </button>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm pl-11 leading-relaxed">
                    <ParseDescription text={step.description} onRefClick={onRefClick} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Reference Sandbox */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative group">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity">
              <BookOpen className="text-slate-600" size={40} />
            </div>

            <SectionHeader title="BS 5950 Reference" subtitle="Context for this calculation" icon={<BookOpen size={16} />} />

            <div className="mt-8">
              {selectedRef ? (
                <ReferenceDetail id={selectedRef.id} type={selectedRef.type} onClear={() => setSelectedRef(null)} />
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-slate-600">
                    <Info size={32} />
                  </div>
                  <p className="text-sm text-slate-500 px-4">Select a reference link in the explanation to see full clause details here.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#e8a020]/10 border border-[#e8a020]/20 rounded-[2.5rem] p-8">
            <h4 className="text-[#e8a020] font-black text-sm uppercase tracking-widest mb-4">Engineering Note</h4>
            <p className="text-slate-200 text-sm leading-relaxed">
              Verify all edge/end distances against Table 29 before finalizing production designs. AI explanations are for guidance purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helpers ---

const SectionHeader: React.FC<{ title: string, subtitle: string, icon: React.ReactNode }> = ({ title, subtitle, icon }) => (
  <div className="flex flex-col">
    <div className="flex items-center space-x-2 text-[#e8a020] mb-1">
      {icon}
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{title}</span>
    </div>
    <h2 className="text-xl font-bold text-white">{subtitle}</h2>
  </div>
);

const ReferenceDetail: React.FC<{ id: string, type: "clause" | "table", onClear: () => void }> = ({ id, type, onClear }) => {
  const clause = type === "clause" ? BS5950_CLAUSES[id] : null;
  const table = type === "table" ? BS5950_TABLES[id] : null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
        <span className="text-sm font-black text-indigo-400 uppercase tracking-widest">{type} {id}</span>
        <button onClick={onClear} className="text-slate-600 hover:text-white transition-colors"><XCircle size={18} /></button>
      </div>

      {clause && (
        <div className="space-y-4">
          <h5 className="text-lg font-bold text-white leading-tight">{clause.title}</h5>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">{clause.content}</p>
          {clause.equation && (
            <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-500/20 font-mono text-xs text-indigo-400 text-center">
              {clause.equation}
            </div>
          )}
        </div>
      )}

      {table && (
        <div className="space-y-4">
          <h5 className="text-lg font-bold text-white leading-tight">{table.title}</h5>
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-800/50 text-slate-400">
                <tr>
                  {table.headers.map(h => <th key={h} className="px-3 py-2 border-b border-slate-700">{h}</th>)}
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {table.rows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    {row.map((cell, j) => <td key={j} className="px-3 py-2 border-b border-slate-800/50">{cell}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!clause && !table && (
        <div className="p-10 text-center space-y-4">
          <p className="text-slate-500 italic">Detailed information for {type} {id} is available in the full BS 5950 PDF document.</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
