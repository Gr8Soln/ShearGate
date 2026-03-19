import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  Printer,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ClauseCard from "../components/ClauseCard";
import { getClause } from "../data/clauses";
import { mockCalculations } from "../data/mockData";
import type {
  BS5950Clause,
  CalculationResult,
  ConnectionInputs,
} from "../types";

interface LocationState {
  inputs: ConnectionInputs;
  result: CalculationResult;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const { inputs, result } = state || { inputs: null, result: null };

  // Use mock data if no state is passed (for demo purposes)
  const mockCalc = mockCalculations[0];
  const displayInputs = inputs || mockCalc.inputs;
  const displayResult = result || mockCalc.result;
  const steps = mockCalc.steps;

  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);
  const [selectedClause, setSelectedClause] = useState<BS5950Clause | null>(
    null,
  );

  const toggleStep = (stepNumber: number): void => {
    setExpandedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((s) => s !== stepNumber)
        : [...prev, stepNumber],
    );
  };

  const handleClauseClick = (clauseNumber: string): void => {
    const clause = getClause(clauseNumber);
    setSelectedClause(clause);
  };

  if (!displayInputs || !displayResult) {
    return (
      <div className="min-h-screen bg-transparent py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/70">No calculation data available.</p>
          <Link to="/analyze" className="btn-primary mt-4">
            Start New Analysis
          </Link>
        </div>
      </div>
    );
  }

  const isSafe = !displayResult.blockShearOccurs;

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/analyze" className="btn-ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Analyze
          </Link>
          <div className="flex gap-2 no-print">
            <button className="btn-ghost">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
            <button className="btn-ghost">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
          </div>
        </div>

        {/* Result Summary Card */}
        <div
          className={`card-elevated p-8 mb-8 border-l-4 ${
            isSafe
              ? "border-l-green-400 bg-gradient-to-r from-green-500/10 to-transparent"
              : "border-l-red-500 bg-gradient-to-r from-red-500/10 to-transparent"
          }`}
        >
          <div className="flex items-start gap-6">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isSafe
                  ? "bg-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                  : "bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
              }`}
            >
              {isSafe ? (
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              ) : (
                <XCircle className="w-10 h-10 text-red-500" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {displayResult.verdict}
              </h1>
              <p className="text-white/70 mb-6">
                Block shear analysis completed per BS 5950-1:2000 Clause 6.2.4
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#0A0A0F]/50 p-4 rounded-lg border border-white/10">
                  <p className="text-sm text-white/50 mb-1">
                    Block Shear Capacity
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {displayResult.blockShearCapacity}{" "}
                    <span className="text-lg font-normal text-white/50">
                      kN
                    </span>
                  </p>
                </div>
                <div className="bg-[#0A0A0F]/50 p-4 rounded-lg border border-white/10">
                  <p className="text-sm text-white/50 mb-1">Applied Load</p>
                  <p className="text-2xl font-bold text-white">
                    {displayResult.appliedLoad}{" "}
                    <span className="text-lg font-normal text-white/50">
                      kN
                    </span>
                  </p>
                </div>
                <div className="bg-[#0A0A0F]/50 p-4 rounded-lg border border-white/10">
                  <p className="text-sm text-white/50 mb-1">
                    Utilization Ratio
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      displayResult.utilizationRatio < 1
                        ? "text-green-400"
                        : "text-red-500"
                    }`}
                  >
                    {displayResult.utilizationRatio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Parameters Summary */}
        <div className="card p-6 mb-8 border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">
            Input Parameters
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {[
              {
                label: "Bolt Grade",
                value: `Grade ${displayInputs.boltGrade}`,
              },
              {
                label: "Bolt Diameter",
                value: `${displayInputs.boltDiameter} mm`,
              },
              {
                label: "Number of Bolts",
                value: `${displayInputs.numberOfBolts}`,
              },
              {
                label: "Plate Material",
                value: `${displayInputs.plateMaterial}`,
              },
              {
                label: "Plate Thickness",
                value: `${displayInputs.plateThickness} mm`,
              },
              { label: "Pitch", value: `${displayInputs.pitch} mm` },
              {
                label: "Edge Distance",
                value: `${displayInputs.edgeDistance} mm`,
              },
              { label: "Gauge", value: `${displayInputs.gauge} mm` },
              {
                label: "Connection Type",
                value: (
                  <span className="capitalize">
                    {displayInputs.connectionType}
                  </span>
                ),
              },
            ].map((item, idx) => (
              <div key={idx}>
                <p className="text-white/50">{item.label}:</p>
                <p className="font-semibold text-white/90">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calculation Steps */}
        <div className="card p-6 mb-8 border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">
            Calculation Steps
          </h2>
          <div className="space-y-3">
            {steps.map((step) => (
              <div
                key={step.step}
                className="border border-white/10 rounded-lg overflow-hidden bg-white/5"
              >
                <button
                  onClick={() => toggleStep(step.step)}
                  className="w-full p-4 hover:bg-white/10 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-white/90 text-left">
                      {step.title}
                    </h3>
                  </div>
                  {expandedSteps.includes(step.step) ? (
                    <ChevronUp className="w-5 h-5 text-white/60" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/60" />
                  )}
                </button>

                {expandedSteps.includes(step.step) && (
                  <div className="p-6 bg-[#0A0A0F]/80 animate-fade-in border-t border-white/10">
                    <div className="mb-4">
                      <p className="text-white/80 whitespace-pre-line leading-relaxed">
                        {step.content}
                      </p>
                    </div>

                    {step.formulas && step.formulas.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {step.formulas.map((formula, idx) => (
                          <div
                            key={idx}
                            className="font-mono text-sm bg-black/60 text-cyan-300 px-4 py-3 rounded-md border border-cyan-500/20 shadow-inner"
                          >
                            {formula}
                          </div>
                        ))}
                      </div>
                    )}

                    {step.clause && (
                      <button
                        onClick={() => handleClauseClick(step.clause)}
                        className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 hover:underline font-medium mt-2"
                      >
                        📖 BS 5950 Clause {step.clause}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Clause Detail */}
        {selectedClause && (
          <div className="mb-8 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-white">
                Referenced Clause
              </h2>
              <button
                onClick={() => setSelectedClause(null)}
                className="btn-ghost text-sm"
              >
                Close
              </button>
            </div>
            <ClauseCard clause={selectedClause} />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
          <Link
            to="/analyze"
            className="btn-primary shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          >
            New Analysis
          </Link>
          <Link to="/history" className="btn-secondary">
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
