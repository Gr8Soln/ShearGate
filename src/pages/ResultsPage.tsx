import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Printer, Download, ArrowLeft } from 'lucide-react';
import ClauseCard from '../components/ClauseCard';
import { getClause } from '../data/clauses';
import { mockCalculations } from '../data/mockData';
import type { ConnectionInputs, CalculationResult, CalculationStep, BS5950Clause } from '../types';

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
  const [selectedClause, setSelectedClause] = useState<BS5950Clause | null>(null);

  const toggleStep = (stepNumber: number): void => {
    setExpandedSteps(prev => 
      prev.includes(stepNumber) 
        ? prev.filter(s => s !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const handleClauseClick = (clauseNumber: string): void => {
    const clause = getClause(clauseNumber);
    setSelectedClause(clause);
  };

  if (!displayInputs || !displayResult) {
    return (
      <div className="min-h-screen bg-steel-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-steel-600">No calculation data available.</p>
          <Link to="/analyze" className="btn-primary mt-4">
            Start New Analysis
          </Link>
        </div>
      </div>
    );
  }

  const isSafe = !displayResult.blockShearOccurs;

  return (
    <div className="min-h-screen bg-steel-50 py-12 px-4">
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
        <div className={`card-elevated p-8 mb-8 border-l-4 ${
          isSafe ? 'border-accent-green' : 'border-accent-red'
        }`}>
          <div className="flex items-start gap-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isSafe ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isSafe ? (
                <CheckCircle2 className="w-10 h-10 text-accent-green" />
              ) : (
                <XCircle className="w-10 h-10 text-accent-red" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-steel-900 mb-2">
                {displayResult.verdict}
              </h1>
              <p className="text-steel-600 mb-6">
                Block shear analysis completed per BS 5950-1:2000 Clause 6.2.4
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-steel-50 p-4 rounded-lg">
                  <p className="text-sm text-steel-600 mb-1">Block Shear Capacity</p>
                  <p className="text-2xl font-bold text-steel-900">
                    {displayResult.blockShearCapacity} <span className="text-lg font-normal text-steel-600">kN</span>
                  </p>
                </div>
                <div className="bg-steel-50 p-4 rounded-lg">
                  <p className="text-sm text-steel-600 mb-1">Applied Load</p>
                  <p className="text-2xl font-bold text-steel-900">
                    {displayResult.appliedLoad} <span className="text-lg font-normal text-steel-600">kN</span>
                  </p>
                </div>
                <div className="bg-steel-50 p-4 rounded-lg">
                  <p className="text-sm text-steel-600 mb-1">Utilization Ratio</p>
                  <p className={`text-2xl font-bold ${
                    displayResult.utilizationRatio < 1 ? 'text-accent-green' : 'text-accent-red'
                  }`}>
                    {displayResult.utilizationRatio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Parameters Summary */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-bold text-steel-900 mb-4">Input Parameters</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-steel-600">Bolt Grade:</p>
              <p className="font-semibold text-steel-900">Grade {displayInputs.boltGrade}</p>
            </div>
            <div>
              <p className="text-steel-600">Bolt Diameter:</p>
              <p className="font-semibold text-steel-900">{displayInputs.boltDiameter} mm</p>
            </div>
            <div>
              <p className="text-steel-600">Number of Bolts:</p>
              <p className="font-semibold text-steel-900">{displayInputs.numberOfBolts}</p>
            </div>
            <div>
              <p className="text-steel-600">Plate Material:</p>
              <p className="font-semibold text-steel-900">{displayInputs.plateMaterial}</p>
            </div>
            <div>
              <p className="text-steel-600">Plate Thickness:</p>
              <p className="font-semibold text-steel-900">{displayInputs.plateThickness} mm</p>
            </div>
            <div>
              <p className="text-steel-600">Pitch:</p>
              <p className="font-semibold text-steel-900">{displayInputs.pitch} mm</p>
            </div>
            <div>
              <p className="text-steel-600">Edge Distance:</p>
              <p className="font-semibold text-steel-900">{displayInputs.edgeDistance} mm</p>
            </div>
            <div>
              <p className="text-steel-600">Gauge:</p>
              <p className="font-semibold text-steel-900">{displayInputs.gauge} mm</p>
            </div>
            <div>
              <p className="text-steel-600">Connection Type:</p>
              <p className="font-semibold text-steel-900 capitalize">{displayInputs.connectionType}</p>
            </div>
          </div>
        </div>

        {/* Calculation Steps */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-bold text-steel-900 mb-6">Calculation Steps</h2>
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.step} className="border border-steel-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleStep(step.step)}
                  className="w-full p-4 bg-steel-50 hover:bg-steel-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-accent-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-steel-900 text-left">{step.title}</h3>
                  </div>
                  {expandedSteps.includes(step.step) ? (
                    <ChevronUp className="w-5 h-5 text-steel-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-steel-600" />
                  )}
                </button>

                {expandedSteps.includes(step.step) && (
                  <div className="p-6 bg-white animate-fade-in">
                    <div className="mb-4">
                      <p className="text-steel-700 whitespace-pre-line leading-relaxed">
                        {step.content}
                      </p>
                    </div>

                    {step.formulas && step.formulas.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {step.formulas.map((formula, idx) => (
                          <div key={idx} className="formula">
                            {formula}
                          </div>
                        ))}
                      </div>
                    )}

                    {step.clause && (
                      <button
                        onClick={() => handleClauseClick(step.clause)}
                        className="inline-flex items-center gap-2 text-sm text-accent-blue hover:underline font-medium"
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
              <h2 className="text-xl font-bold text-steel-900">Referenced Clause</h2>
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
          <Link to="/analyze" className="btn-primary">
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
