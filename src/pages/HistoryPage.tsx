import React from 'react';
import { Link } from 'react-router-dom';
import { History, Calendar, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { mockCalculations } from '../data/mockData';

const HistoryPage: React.FC = () => {
  const calculations = mockCalculations;

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-steel-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-accent-blue/10 rounded-xl flex items-center justify-center">
              <History className="w-7 h-7 text-accent-blue" />
            </div>
            <h1 className="text-4xl font-bold text-steel-900">Calculation History</h1>
          </div>
          <p className="text-lg text-steel-600">
            View and manage your previous block shear analyses
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <p className="text-sm text-steel-600 mb-2">Total Calculations</p>
            <p className="text-3xl font-bold text-steel-900">{calculations.length}</p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-steel-600 mb-2">Safe Connections</p>
            <p className="text-3xl font-bold text-accent-green">
              {calculations.filter(c => !c.result.blockShearOccurs).length}
            </p>
          </div>
          <div className="card p-6">
            <p className="text-sm text-steel-600 mb-2">Failed Connections</p>
            <p className="text-3xl font-bold text-accent-red">
              {calculations.filter(c => c.result.blockShearOccurs).length}
            </p>
          </div>
        </div>

        {/* Calculations List */}
        <div className="space-y-4">
          {calculations.map((calc) => {
            const isSafe = !calc.result.blockShearOccurs;
            
            return (
              <div key={calc.id} className="card hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isSafe ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {isSafe ? (
                        <CheckCircle2 className="w-6 h-6 text-accent-green" />
                      ) : (
                        <XCircle className="w-6 h-6 text-accent-red" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-steel-900 mb-1">
                            {calc.questionText || 'Manual Input Calculation'}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-steel-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(calc.timestamp)}
                            </span>
                            <span className={`badge ${isSafe ? 'badge-green' : 'badge-red'}`}>
                              {isSafe ? 'SAFE' : 'UNSAFE'}
                            </span>
                          </div>
                        </div>

                        <button className="btn-ghost text-steel-400 hover:text-accent-red">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="bg-steel-50 p-3 rounded-lg">
                          <p className="text-xs text-steel-600">Capacity</p>
                          <p className="font-semibold text-steel-900">{calc.result.blockShearCapacity} kN</p>
                        </div>
                        <div className="bg-steel-50 p-3 rounded-lg">
                          <p className="text-xs text-steel-600">Applied</p>
                          <p className="font-semibold text-steel-900">{calc.result.appliedLoad} kN</p>
                        </div>
                        <div className="bg-steel-50 p-3 rounded-lg">
                          <p className="text-xs text-steel-600">Utilization</p>
                          <p className={`font-semibold ${
                            calc.result.utilizationRatio < 1 ? 'text-accent-green' : 'text-accent-red'
                          }`}>
                            {calc.result.utilizationRatio}
                          </p>
                        </div>
                        <div className="bg-steel-50 p-3 rounded-lg">
                          <p className="text-xs text-steel-600">Bolts</p>
                          <p className="font-semibold text-steel-900">
                            {calc.inputs.numberOfBolts} × M{calc.inputs.boltDiameter}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        to="/results"
                        state={{ inputs: calc.inputs, result: calc.result }}
                        className="btn-secondary text-sm"
                      >
                        View Full Report
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State (when no calculations) */}
        {calculations.length === 0 && (
          <div className="card p-12 text-center">
            <History className="w-16 h-16 text-steel-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-steel-900 mb-2">No calculations yet</h3>
            <p className="text-steel-600 mb-6">
              Start analyzing bolted connections to see them here
            </p>
            <Link to="/analyze" className="btn-primary">
              Start First Analysis
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
