import React, { useState } from 'react';
import { Book, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

import type { BS5950Clause } from '../types';

interface ClauseCardProps {
  clause: BS5950Clause | null;
  compact?: boolean;
}

const ClauseCard: React.FC<ClauseCardProps> = ({ clause, compact = false }) => {
  const [isExpanded, setIsExpanded] = useState(!compact);

  if (!clause) return null;

  return (
    <div className="card overflow-hidden">
      <div 
        className={`p-4 bg-steel-50 border-b border-steel-200 flex items-start justify-between ${
          compact ? 'cursor-pointer hover:bg-steel-100 transition-colors' : ''
        }`}
        onClick={() => compact && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 bg-accent-blue/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Book className="w-5 h-5 text-accent-blue" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-sm font-semibold text-accent-blue">
                Clause {clause.number}
              </span>
              <span className="badge badge-blue text-xs">
                {clause.section}
              </span>
            </div>
            <h3 className="font-semibold text-steel-900 mb-1">
              {clause.title}
            </h3>
            {!isExpanded && compact && (
              <p className="text-sm text-steel-600 line-clamp-2">
                {clause.content.substring(0, 120)}...
              </p>
            )}
          </div>
        </div>
        {compact && (
          <button 
            className="ml-2 p-1 hover:bg-steel-200 rounded"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-steel-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-steel-600" />
            )}
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="p-6 space-y-4 animate-fade-in">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-steel-700 leading-relaxed">
              {clause.content}
            </div>
          </div>

          {clause.equation && (
            <div className="bg-steel-900 rounded-lg p-4 border border-steel-700">
              <p className="text-xs text-steel-400 mb-2 uppercase tracking-wide">Equation</p>
              <code className="text-steel-50 font-mono text-sm">
                {clause.equation}
              </code>
            </div>
          )}

          {clause.references && clause.references.length > 0 && (
            <div className="pt-4 border-t border-steel-200">
              <p className="text-sm font-medium text-steel-700 mb-2">Referenced in:</p>
              <div className="flex flex-wrap gap-2">
                {clause.references.map((ref, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-steel-100 text-steel-700 rounded-md text-sm font-mono hover:bg-steel-200 transition-colors cursor-pointer"
                  >
                    {ref}
                    <ExternalLink className="w-3 h-3" />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClauseCard;
