import { FileText, Search } from "lucide-react";
import React, { useState } from "react";
import ClauseCard from "../components/ClauseCard";
import { bs5950Clauses, searchClauses } from "../data/clauses";
import type { BS5950Clause } from "../types";

const ClausesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredClauses, setFilteredClauses] = useState<BS5950Clause[]>(
    Object.values(bs5950Clauses),
  );
  const [selectedClause, setSelectedClause] = useState<BS5950Clause | null>(
    Object.values(bs5950Clauses)[0],
  );

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredClauses(Object.values(bs5950Clauses));
    } else {
      const results = searchClauses(query);
      setFilteredClauses(results);
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-8 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-8 border-b border-[#272b35] pb-6">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-[#e8a020] border border-[#9a6b15] bg-[rgba(232,160,32,0.12)] px-2.5 py-[3px] rounded-[3px]">
              Reference
            </span>
          </div>
          <h1 className="font-syne text-3xl font-bold text-[#e8eaf0] mb-2">
            BS 5950 Clauses
          </h1>
          <p className="text-sm text-[#8890a0] max-w-2xl">
            Browse and search design clauses related to bolted connections and
            block shear failure
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8 items-start">
          {/* Left Column - List */}
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="bg-[#13161b] border border-[#272b35] rounded-lg p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555d6b]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search clauses..."
                  className="w-full bg-[#1a1d24] border border-[#272b35] rounded-md text-[#e8eaf0] font-mono text-xs p-2 pl-9 outline-none focus:border-[#9a6b15] transition-colors"
                />
              </div>
              <p className="text-xs text-[#555d6b] mt-2 font-mono">
                {filteredClauses.length} results
              </p>
            </div>

            {/* Buttons */}
            <div className="bg-[#13161b] border border-[#272b35] rounded-lg p-2 max-h-[600px] overflow-y-auto custom-scrollbar">
              {filteredClauses.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {filteredClauses.map((clause, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedClause(clause)}
                      className={`text-left px-3 py-2.5 rounded-md text-sm transition-all flex flex-col gap-1 border border-transparent ${
                        selectedClause?.id === clause.id
                          ? "bg-[rgba(232,160,32,0.07)] border-[rgba(232,160,32,0.2)] text-[#e8a020]"
                          : "text-[#8890a0] hover:bg-[#1e2229] hover:text-[#e8eaf0] hover:border-[#363d4a]"
                      }`}
                    >
                      <span className="font-mono text-xs opacity-70">
                        Clause {clause.number}
                      </span>
                      <span className="font-semibold">{clause.title}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-[#8890a0] text-sm mb-2">No matches</p>
                  <button
                    onClick={() => handleSearch("")}
                    className="text-[#e8a020] text-xs hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="bg-[#13161b] border border-[#272b35] rounded-xl p-6 min-h-[400px]">
            {selectedClause ? (
              <div className="animate-fade-in">
                <ClauseCard clause={selectedClause} compact={false} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-[#555d6b] gap-3">
                <FileText className="w-10 h-10 opacity-50" />
                <p>Select a clause to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClausesPage;
