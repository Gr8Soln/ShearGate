import { BookOpen, Search } from "lucide-react";
import React, { useState } from "react";
import ClauseCard from "../components/ClauseCard";
import { bs5950Clauses, searchClauses } from "../data/clauses";
import type { BS5950Clause } from "../types";

const ClausesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredClauses, setFilteredClauses] = useState<BS5950Clause[]>(
    Object.values(bs5950Clauses),
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
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <BookOpen className="w-7 h-7 text-cyan-400" />
            </div>
            <h1 className="text-4xl font-bold text-white">BS 5950 Clauses</h1>
          </div>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Browse and search design clauses related to bolted connections and
            block shear failure
          </p>
        </div>

        {/* Search Bar */}
        <div className="card p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search clauses... (e.g., 'block shear', 'bolt spacing', 'tension')"
              className="input-field pl-12 bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>
          <p className="text-sm text-white/50 mt-3">
            {filteredClauses.length} clause
            {filteredClauses.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Clauses List */}
        <div className="space-y-6">
          {filteredClauses.length > 0 ? (
            filteredClauses.map((clause, idx) => (
              <div key={idx} className="animate-fade-in">
                <ClauseCard clause={clause} compact={true} />
              </div>
            ))
          ) : (
            <div className="card p-12 text-center border-white/10">
              <p className="text-white/60 mb-2">
                No clauses found matching "{searchQuery}"
              </p>
              <p className="text-sm text-white/40">
                Try different keywords or browse all clauses
              </p>
              <button
                onClick={() => handleSearch("")}
                className="btn-primary mt-4 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              >
                Show All Clauses
              </button>
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="card-elevated p-6 mt-12 bg-gradient-to-br from-white/10 to-transparent border-white/20">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            About BS 5950
          </h3>
          <p className="text-white/70 leading-relaxed">
            BS 5950-1:2000 is the British Standard for structural use of
            steelwork in building. This application implements design provisions
            for bolted connections, including checks for block shear failure,
            bolt spacing, edge distances, and capacity calculations. All
            calculations and clause references are based on the current
            standard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClausesPage;
