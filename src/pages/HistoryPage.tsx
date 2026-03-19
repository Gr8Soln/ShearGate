import {
  Calendar,
  CheckCircle2,
  History as HistoryIcon,
  Trash2,
  XCircle,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { mockCalculations } from "../data/mockData";

const HistoryPage: React.FC = () => {
  const calculations = mockCalculations;

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <HistoryIcon className="w-7 h-7 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold text-white">
              Calculation History
            </h1>
          </div>
          <p className="text-lg text-white/70">
            View and manage your previous block shear analyses
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 border-white/10">
            <p className="text-sm text-white/50 mb-2">Total Calculations</p>
            <p className="text-3xl font-bold text-white">
              {calculations.length}
            </p>
          </div>
          <div className="card p-6 border-white/10">
            <p className="text-sm text-white/50 mb-2">Safe Connections</p>
            <p className="text-3xl font-bold text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.3)]">
              {calculations.filter((c) => !c.result.blockShearOccurs).length}
            </p>
          </div>
          <div className="card p-6 border-white/10">
            <p className="text-sm text-white/50 mb-2">Failed Connections</p>
            <p className="text-3xl font-bold text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
              {calculations.filter((c) => c.result.blockShearOccurs).length}
            </p>
          </div>
        </div>

        {/* Calculations List */}
        <div className="space-y-4">
          {calculations.map((calc) => {
            const isSafe = !calc.result.blockShearOccurs;

            return (
              <div
                key={calc.id}
                className="card p-6 border-white/10 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all"
              >
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isSafe
                        ? "bg-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.2)]"
                        : "bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                    }`}
                  >
                    {isSafe ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white mb-1">
                          {calc.questionText || "Manual Input Calculation"}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-white/50">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(calc.timestamp)}
                          </span>
                          <span
                            className={`badge ${
                              isSafe
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}
                          >
                            {isSafe ? "SAFE" : "UNSAFE"}
                          </span>
                        </div>
                      </div>

                      <button className="btn-ghost text-white/40 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {[
                        {
                          label: "Capacity",
                          value: `${calc.result.blockShearCapacity} kN`,
                        },
                        {
                          label: "Applied",
                          value: `${calc.result.appliedLoad} kN`,
                        },
                        {
                          label: "Utilization",
                          value: (
                            <span
                              className={
                                calc.result.utilizationRatio &&
                                parseFloat(calc.result.utilizationRatio) < 1
                                  ? "text-green-400"
                                  : "text-red-500"
                              }
                            >
                              {calc.result.utilizationRatio}
                            </span>
                          ),
                        },
                        {
                          label: "Bolts",
                          value: `${calc.inputs.numberOfBolts} × M${calc.inputs.boltDiameter}`,
                        },
                      ].map((stat, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 p-3 rounded-lg border border-white/5"
                        >
                          <p className="text-xs text-white/40 mb-1">
                            {stat.label}
                          </p>
                          <p className="font-semibold text-white/90">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Link
                      to="/results"
                      state={{ inputs: calc.inputs, result: calc.result }}
                      className="btn-secondary text-sm inline-block"
                    >
                      View Full Report
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State (when no calculations) */}
        {calculations.length === 0 && (
          <div className="card p-12 text-center border-white/10">
            <HistoryIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No calculations yet
            </h3>
            <p className="text-white/50 mb-6">
              Start analyzing bolted connections to see them here
            </p>
            <Link
              to="/analyze"
              className="btn-primary shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            >
              Start First Analysis
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
