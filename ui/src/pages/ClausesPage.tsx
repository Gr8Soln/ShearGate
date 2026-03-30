import "katex/dist/katex.min.css";
import { BookOpen, Info, Loader2, Search, Sparkles } from "lucide-react";
import React, { useMemo, useState } from "react";
import { BlockMath } from "react-katex";
import { explainApi } from "../api/client";
import {
  BS5950_CLAUSES,
  BS5950_TABLES,
  REFERENCE_GROUPS,
} from "../data/bs5950";
import { ParseDescription } from "../utils/parseDescription";

const ClausesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>("6.2.4");
  const [selectedType, setSelectedType] = useState<"clause" | "table">(
    "clause",
  );

  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const filteredGroups = useMemo(() => {
    return REFERENCE_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((id) => {
        const item = BS5950_CLAUSES[id] || BS5950_TABLES[id];
        if (!item) return false;
        const searchStr =
          `${id} ${"title" in item ? item.title : ""}`.toLowerCase();
        return searchStr.includes(searchQuery.toLowerCase());
      }),
    })).filter((group) => group.items.length > 0);
  }, [searchQuery]);

  const selectedItem =
    selectedType === "clause"
      ? BS5950_CLAUSES[selectedId]
      : BS5950_TABLES[selectedId];

  const handleExplain = async () => {
    if (!selectedId) return;
    setIsExplaining(true);
    setAiInsight(null);
    try {
      const { explanation } = await explainApi.explainReference(
        selectedId,
        selectedType,
      );
      setAiInsight(explanation);
    } catch (err) {
      console.error("AI Insight failed", err);
    } finally {
      setIsExplaining(false);
    }
  };

  const handleSelect = (id: string, type?: "clause" | "table") => {
    setSelectedId(id);
    const resolvedType = type || (BS5950_CLAUSES[id] ? "clause" : "table");
    setSelectedType(resolvedType);
    setAiInsight(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center">
          <span className="badge-glow">Reference</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight leading-none uppercase">
          ShearGate References
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl">
          Browse and search design clauses related to bolted connections and
          ShearGate analysis per BS 5950
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Navigation */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#e8a020] transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder="Search clauses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12 py-3"
            />
          </div>

          <div className="card overflow-hidden">
            <div className="p-2 border-b border-white/5 bg-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 px-3">
                {filteredGroups.reduce((acc, g) => acc + g.items.length, 0)}{" "}
                results
              </span>
            </div>
            <div className="max-h-[500px] overflow-y-auto p-3 space-y-6">
              {filteredGroups.map((group, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] ml-2">
                    {group.title}
                  </h3>
                  <div className="space-y-1">
                    {group.items.map((id) => {
                      const item = BS5950_CLAUSES[id] || BS5950_TABLES[id];
                      const isActive = selectedId === id;
                      return (
                        <button
                          key={id}
                          onClick={() => handleSelect(id)}
                          className={`w-full flex flex-col p-3 rounded-lg text-left transition-all ${
                            isActive
                              ? "bg-[#e8a020]/10 text-white border border-[#e8a020]/20"
                              : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
                          }`}
                        >
                          <span
                            className={`text-[0.65rem] font-black uppercase tracking-widest ${isActive ? "text-[#e8a020]" : "text-slate-600"}`}
                          >
                            {BS5950_CLAUSES[id] ? "Clause" : "Table"} {id}
                          </span>
                          <span className="text-sm font-bold truncate mt-0.5">
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Content Detail */}
        <div className="lg:col-span-8 space-y-8">
          {selectedItem ? (
            <div className="space-y-8 animate-fade-in">
              {/* Main Content Card */}
              <div className="card-premium p-10 md:p-12 relative">
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <span className="badge-glow bg-[#e8a020]/5 text-[#e8a020] border-[#e8a020]/20">
                    {selectedType} {selectedId}
                  </span>
                  {selectedId.includes(".") && (
                    <span className="badge-glow bg-white/5 text-slate-400 border-white/10 uppercase">
                      Engineering Unit
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-black text-white mb-8 tracking-tight">
                  {selectedItem.title}
                </h2>

                {selectedType === "clause" && "content" in selectedItem && (
                  <div className="space-y-8">
                    <div className="text-lg text-slate-300 leading-relaxed font-medium opacity-90">
                      <ParseDescription
                        text={selectedItem.content}
                        onRefClick={handleSelect}
                      />
                    </div>
                    {selectedItem.equation && (
                      <div className="formula-box py-8 px-4 flex items-center justify-center bg-black/40 border-white/5">
                        <div className="text-2xl text-[#e8a020]">
                          <BlockMath math={selectedItem.equation} />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedType === "table" && "headers" in selectedItem && (
                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/30">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/5">
                          {selectedItem.headers.map((h) => (
                            <th
                              key={h}
                              className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="text-slate-300">
                        {selectedItem.rows.map((row, i) => (
                          <tr
                            key={i}
                            className="hover:bg-white/5 transition-colors"
                          >
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className="px-6 py-4 border-b border-white/[0.02] text-sm font-bold"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Sub-references helper */}
                {selectedItem.references &&
                  selectedItem.references.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                        Related References
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.references.map((ref) => (
                          <button
                            key={ref}
                            onClick={() =>
                              handleSelect(ref.replace("Table ", "T."))
                            }
                            className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 hover:border-[#e8a020]/30 hover:text-white transition-all flex items-center gap-2"
                          >
                            {ref} <BookOpen size={10} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              {/* AI Insight Card */}
              <div className="card border-[#e8a020]/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Sparkles size={120} className="text-[#e8a020]" />
                </div>

                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-[#e8a020]/[0.02]">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-[#e8a020]/10 flex items-center justify-center text-[#e8a020] border border-[#e8a020]/20">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">
                        ShearGate Analysis
                      </h3>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                        Engineering AI Context
                      </p>
                    </div>
                  </div>
                  {!aiInsight && (
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
                        "Generate Insight"
                      )}
                    </button>
                  )}
                </div>
                <div className="p-10 bg-black/20">
                  {aiInsight ? (
                    <div className="text-slate-300 leading-relaxed font-medium opacity-90 text-lg">
                      <ParseDescription
                        text={aiInsight}
                        onRefClick={handleSelect}
                      />
                    </div>
                  ) : (
                    <div className="text-center text-slate-600 italic font-medium py-4">
                      Tap the button to have our AI assistant generate a
                      professional ShearGate insight for your analysis session.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[500px] card border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-600 p-12 text-center opacity-50">
              <Info size={48} className="mb-4 opacity-20" />
              <h3 className="text-xl font-black text-white/50 mb-2 uppercase tracking-tight">
                No resource selected
              </h3>
              <p className="max-w-xs mx-auto text-sm font-medium">
                Select an engineering provision or table from the list on the
                left to explore professional insights.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClausesPage;
