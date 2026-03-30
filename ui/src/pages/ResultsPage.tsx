import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Info,
  Loader2,
  Sparkles,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { BlockMath } from "react-katex";
import { Link, useLocation, useParams } from "react-router-dom";

import { explainApi, sessionApi } from "../api/client";
import { BS5950_CLAUSES, BS5950_TABLES } from "../data/bs5950";
import type { ConnectionInputs } from "../types";
import { ParseDescription } from "../utils/parseDescription";
import { normalizeReferenceId } from "../utils/referenceIds";

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

  const state = location.state as {
    inputs: ConnectionInputs;
    result: CalculationResult;
  } | null;
  const [inputs, setInputs] = useState<ConnectionInputs | null>(
    state?.inputs || null,
  );
  const [result, setResult] = useState<CalculationResult | null>(
    state?.result || null,
  );

  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [selectedRef, setSelectedRef] = useState<{
    id: string;
    type: "clause" | "table";
  } | null>(null);

  useEffect(() => {
    if (!state && sessionId && sessionId !== "temporary") {
      sessionApi.get(sessionId).then((data) => {
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
    setSelectedRef({ id: normalizeReferenceId(id, type), type });
  };

  if (!inputs || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090a0c] text-white">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin mx-auto text-[#e8a020]" size={32} />
          <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">
            Loading analysis...
          </p>
        </div>
      </div>
    );
  }

  const isSafe = result.pass;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto space-y-10">
      {/* Navbar Actions */}
      <div className="flex items-center justify-between no-print">
        <Link
          to="/analyze"
          className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-xs font-black uppercase tracking-widest">
            Back to Analyze
          </span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Scorecard */}
          <div className="card-premium p-10 md:p-12 relative overflow-hidden">
            <div
              className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 ${isSafe ? "bg-emerald-500" : "bg-rose-500"}`}
            />

            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-10">
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 border ${isSafe ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" : "bg-rose-500/10 border-rose-500/30 text-rose-500"}`}
              >
                {isSafe ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
              </div>

              <div className="flex-1 space-y-8 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h1 className="text-4xl font-black text-white tracking-tight">
                      {isSafe ? "Connection Safe" : "Analysis Failed"}
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[0.6rem]">
                      BS 5950-1:2000 | Clause 6.2.4 Check
                    </p>
                  </div>
                  <div
                    className={`px-5 py-2.5 rounded-xl font-black text-xl border ${isSafe ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20" : "bg-rose-500/5 text-rose-500 border-rose-500/20"}`}
                  >
                    {(result.utilization * 100).toFixed(1)}%{" "}
                    <span className="text-[10px] opacity-60 uppercase ml-1">
                      Utilization
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-white/5">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-600">
                      Design Capacity
                    </p>
                    <p className="text-2xl font-mono font-black text-white">
                      {result.Pbs.toFixed(1)}
                      <span className="text-xs ml-1 opacity-30">kN</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-600">
                      Applied Force
                    </p>
                    <p className="text-2xl font-mono font-black text-white">
                      {(inputs.appliedLoad || 0).toFixed(1)}
                      <span className="text-xs ml-1 opacity-30">kN</span>
                    </p>
                  </div>
                  <div className="space-y-1 hidden lg:block">
                    <p className="text-[10px] uppercase tracking-widest font-black text-slate-600">
                      Material Grade
                    </p>
                    <p className="text-2xl font-mono font-black text-[#e8a020]">
                      {inputs.plateMaterial}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Narrative */}
          <div className="card-premium overflow-hidden">
            <div className="p-8 border-b border-white/5 bg-[#e8a020]/[0.02] flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8a020]/10 flex items-center justify-center text-[#e8a020] border border-[#e8a020]/20">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    Engineering Narrative
                  </h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    Logic breakdown by AI
                  </p>
                </div>
              </div>
              {!aiExplanation && (
                <button
                  onClick={handleExplain}
                  disabled={isExplaining}
                  className="btn-primary py-2 px-6 text-sm inline-flex items-center gap-2"
                >
                  {isExplaining ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Generating...
                    </>
                  ) : (
                    "Generate Narrative"
                  )}
                </button>
              )}
            </div>
            <div className="p-10">
              {aiExplanation ? (
                <div className="text-slate-300 leading-relaxed font-medium opacity-90 text-lg">
                  <ParseDescription
                    text={aiExplanation}
                    onRefClick={onRefClick}
                  />
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <p className="text-slate-500 font-medium italic">
                    Get a professional narrative explanation of this connection
                    check.
                  </p>
                  <button
                    onClick={handleExplain}
                    disabled={isExplaining}
                    className="text-[#e8a020] text-sm font-black uppercase tracking-widest hover:underline disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    {isExplaining ? (
                      <Loader2 className="animate-spin" size={14} />
                    ) : null}
                    {isExplaining ? "Analyzing..." : "Start AI Analysis"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Steps */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 ml-2">
              <div className="w-1 h-4 bg-[#e8a020] rounded-full" />
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                Calculation Breakdown
              </h3>
            </div>
            <div className="space-y-4">
              {result.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="card p-6 flex flex-col md:flex-row items-center md:items-start gap-4 hover:border-white/10 group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-xs font-black text-slate-500 group-hover:bg-[#e8a020]/10 group-hover:text-[#e8a020] transition-colors">
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <h4 className="font-black text-white text-[1.1rem]">
                        {step.title}
                      </h4>
                      {step.clause && (
                        <button
                          onClick={() => onRefClick(step.clause!, "clause")}
                          className="badge-glow bg-white/5 text-slate-500 border-white/10 hover:border-[#e8a020]/30 hover:text-white transition-all lowercase"
                        >
                          Clause {step.clause}
                        </button>
                      )}
                    </div>
                    <div className="text-slate-400 text-sm leading-relaxed font-medium">
                      <ParseDescription
                        text={step.description}
                        onRefClick={onRefClick}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="card p-8 space-y-8 min-h-[400px]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#e8a020]/10 flex items-center justify-center text-[#e8a020] border border-[#e8a020]/20">
                <BookOpen size={16} />
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">
                Reference Context
              </h3>
            </div>

            {selectedRef ? (
              <div className="animate-fade-in space-y-6">
                <div className="pb-4 border-b border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e8a020]">
                    {selectedRef.type} {selectedRef.id}
                  </span>
                  <button
                    onClick={() => setSelectedRef(null)}
                    className="text-slate-600 hover:text-white transition-colors"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
                <ReferenceDetail
                  id={selectedRef.id}
                  type={selectedRef.type}
                  onRefClick={onRefClick}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-30">
                <Info size={48} className="text-slate-600" />
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 max-w-[180px]">
                  Select a reference link to view full details
                </p>
              </div>
            )}
          </div>

          <div className="card p-6 bg-[#e8a020]/5 border-[#e8a020]/10">
            <h4 className="text-[#e8a020] font-black text-[10px] uppercase tracking-widest mb-3">
              Notice
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Calculations are based on BS 5950-1:2000. Verify partial safety
              factors (γm) and material properties for your specific
              application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReferenceDetail: React.FC<{
  id: string;
  type: "clause" | "table";
  onRefClick: (id: string, type: "clause" | "table") => void;
}> = ({ id, type, onRefClick }) => {
  const clause = type === "clause" ? BS5950_CLAUSES[id] : null;
  const table = type === "table" ? BS5950_TABLES[id] : null;

  if (clause)
    return (
      <div className="space-y-4">
        <h5 className="font-black text-white text-lg tracking-tight leading-tight">
          {clause.title}
        </h5>
        <div className="text-sm text-slate-400 leading-relaxed font-medium">
          <ParseDescription text={clause.content} onRefClick={onRefClick} />
        </div>
        {clause.equation && (
          <div className="formula-box text-center p-4 text-[#e8a020]">
            <BlockMath math={clause.equation} />
          </div>
        )}
      </div>
    );

  if (table)
    return (
      <div className="space-y-4">
        <h5 className="font-black text-white text-lg tracking-tight leading-tight">
          {table.title}
        </h5>
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/20">
          <table className="w-full text-[10px] text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                {table.headers.map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-[8px] font-black text-slate-600 uppercase tracking-widest border-b border-white/5"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-slate-400">
              {table.rows.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="px-3 py-2 border-b border-white/[0.02] font-medium"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

  return (
    <p className="text-slate-600 italic text-xs">
      Full technical details are available in the master PDF document.
    </p>
  );
};

export default ResultsPage;
