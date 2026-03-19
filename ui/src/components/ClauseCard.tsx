import { Book, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import React, { useEffect, useState } from "react";

import type { BS5950Clause } from "../types";

interface ClauseCardProps {
  clause: BS5950Clause | null;
  compact?: boolean;
}

const ClauseCard: React.FC<ClauseCardProps> = ({ clause, compact = false }) => {
  const [isExpanded, setIsExpanded] = useState(!compact);

  // When clause changes, reset expanded state if not compact
  useEffect(() => {
    if (!compact) setIsExpanded(true);
  }, [clause, compact]);

  if (!clause) return null;

  return (
    <div className="bg-[#1a1d24] border border-[#272b35] rounded-xl overflow-hidden">
      <div
        className={`p-4 bg-[rgba(39,43,53,0.3)] border-b border-[#272b35] flex items-start justify-between ${
          compact
            ? "cursor-pointer hover:bg-[rgba(39,43,53,0.5)] transition-colors"
            : ""
        }`}
        onClick={() => compact && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4 flex-1">
          <div className="w-10 h-10 bg-[rgba(232,160,32,0.12)] border border-[#9a6b15] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Book className="w-5 h-5 text-[#e8a020]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-mono text-sm font-semibold text-[#e8a020]">
                Clause {clause.number}
              </span>
              <span className="font-mono text-[0.65rem] tracking-wider text-[#4f9cf9] bg-[rgba(79,156,249,0.1)] border border-[rgba(79,156,249,0.3)] px-1.5 py-[1px] rounded-[3px] uppercase">
                {clause.section}
              </span>
            </div>
            <h3 className="font-syne font-semibold text-lg text-[#e8eaf0] mb-1">
              {clause.title}
            </h3>
            {!isExpanded && compact && (
              <p className="text-sm text-[#8890a0] line-clamp-2">
                {clause.content.substring(0, 120)}...
              </p>
            )}
          </div>
        </div>
        {compact && (
          <button
            className="ml-2 p-1.5 hover:bg-[#1e2229] rounded-md transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-[#8890a0]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#8890a0]" />
            )}
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="p-6 space-y-5 animate-fade-in bg-[#13161b]">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap text-[#e8eaf0] font-mono text-sm leading-[1.7]">
              {clause.content}
            </div>
          </div>

          {clause.equation && (
            <div className="bg-[#0d0f12] rounded-lg p-5 border border-[#363d4a]">
              <p className="font-mono text-[0.7rem] tracking-[0.12em] text-[#555d6b] uppercase mb-3">
                Equation
              </p>
              <code className="text-[#3ecf8e] font-mono text-sm block bg-[rgba(62,207,142,0.05)] p-3 rounded-md border border-[rgba(62,207,142,0.2)]">
                {clause.equation}
              </code>
            </div>
          )}

          {clause.references && clause.references.length > 0 && (
            <div className="pt-5 border-t border-[#272b35]">
              <p className="font-mono text-xs text-[#555d6b] uppercase tracking-widest mb-3">
                Related References
              </p>
              <div className="flex flex-wrap gap-2">
                {clause.references.map((ref, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1d24] border border-[#363d4a] text-[#8890a0] hover:text-[#e8eaf0] hover:border-[#8890a0] rounded-md text-xs font-mono transition-colors cursor-pointer"
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
