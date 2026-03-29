import React, { useState, useMemo } from "react";
import { 
  Search, 
  BookOpen, 
  Table as TableIcon, 
  Sparkles, 
  ChevronRight, 
  Loader2,
  Info,
  Filter,
  Layers
} from "lucide-react";
import { BS5950_CLAUSES, BS5950_TABLES, REFERENCE_GROUPS } from "../data/bs5950";
import { explainApi } from "../api/client";
import { ParseDescription } from "../utils/parseDescription";

const ClausesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>("3.4.3");
  const [selectedType, setSelectedType] = useState<"clause" | "table">("clause");
  
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const filteredGroups = useMemo(() => {
    return REFERENCE_GROUPS.map(group => ({
      ...group,
      items: group.items.filter(id => {
        const item = BS5950_CLAUSES[id] || BS5950_TABLES[id];
        if (!item) return false;
        const searchStr = `${id} ${"title" in item ? item.title : ""}`.toLowerCase();
        return searchStr.includes(searchQuery.toLowerCase());
      })
    })).filter(group => group.items.length > 0);
  }, [searchQuery]);

  const selectedItem = selectedType === "clause" ? BS5950_CLAUSES[selectedId] : BS5950_TABLES[selectedId];

  const handleExplain = async () => {
    if (!selectedId) return;
    setIsExplaining(true);
    setAiInsight(null);
    try {
      const { explanation } = await explainApi.explainReference(selectedId, selectedType);
      setAiInsight(explanation);
    } catch (err) {
      console.error("AI Insight failed", err);
    } finally {
      setIsExplaining(false);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSelectedType(BS5950_CLAUSES[id] ? "clause" : "table");
    setAiInsight(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-12 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen size={14} />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-5xl font-black text-white tracking-tight">BS 5950 Explorer</h1>
        <p className="text-slate-500 text-lg max-w-2xl">
          Browse design provisions, verify tables, and get AI-powered insights into the British Standard.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Navigation */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search clauses or tables..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-xl"
            />
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="max-h-[600px] overflow-y-auto custom-scrollbar p-6 space-y-8">
              {filteredGroups.map((group, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-2 flex items-center space-x-2">
                    <Layers size={12} />
                    <span>{group.title}</span>
                  </h3>
                  <div className="space-y-1">
                    {group.items.map(id => {
                      const item = BS5950_CLAUSES[id] || BS5950_TABLES[id];
                      const isClause = !!BS5950_CLAUSES[id];
                      const isActive = selectedId === id;
                      return (
                        <button
                          key={id}
                          onClick={() => handleSelect(id)}
                          className={`w-full flex items-center space-x-3 p-3 rounded-xl text-left transition-all ${
                            isActive 
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg ${isActive ? "bg-white/20" : "bg-slate-800"}`}>
                            {isClause ? <BookOpen size={14} /> : <TableIcon size={14} />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-black opacity-60 uppercase tracking-tighter">{isClause ? "Clause" : "Table"} {id}</p>
                            <p className="text-sm font-bold truncate">{item.title}</p>
                          </div>
                          {isActive && <ChevronRight size={16} />}
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
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              {/* Main Content Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5">
                  {selectedType === "clause" ? <BookOpen size={200} /> : <TableIcon size={200} />}
                </div>
                
                <div className="relative">
                  <div className="flex items-center space-x-3 text-[#e8a020] mb-4">
                    <span className="text-xs font-black uppercase tracking-widest">{selectedType} {selectedId}</span>
                  </div>
                  <h2 className="text-4xl font-black text-white mb-6 leading-tight">{selectedItem.title}</h2>
                  
                  {selectedType === "clause" && "content" in selectedItem && (
                    <div className="space-y-6">
                      <p className="text-xl text-slate-300 leading-relaxed font-norma">{selectedItem.content}</p>
                      {selectedItem.equation && (
                        <div className="p-8 bg-slate-950 rounded-3xl border border-indigo-500/20 text-center shadow-inner">
                          <p className="text-2xl font-mono text-indigo-400">{selectedItem.equation}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedType === "table" && "headers" in selectedItem && (
                    <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-800/50">
                            {selectedItem.headers.map(h => (
                              <th key={h} className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-800">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="text-slate-300">
                          {selectedItem.rows.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-800/20 transition-colors">
                              {row.map((cell, j) => (
                                <td key={j} className="px-6 py-4 border-b border-slate-900/50 text-sm font-medium">{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Insight Card */}
              <div className="bg-indigo-600/5 border border-indigo-600/10 rounded-[2.5rem] overflow-hidden">
                <div className="bg-indigo-600/10 p-6 flex items-center justify-between border-b border-indigo-600/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                      <Sparkles className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Gemini Insight</h3>
                      <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">AI Engineering Context</p>
                    </div>
                  </div>
                  {!aiInsight && (
                    <button 
                      onClick={handleExplain}
                      disabled={isExplaining}
                      className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all disabled:opacity-50 shadow-lg shadow-indigo-600/20"
                    >
                      {isExplaining ? <Loader2 className="animate-spin" size={18} /> : "Analyze Provisions"}
                    </button>
                  )}
                </div>
                <div className="p-10">
                  {aiInsight ? (
                    <div className="prose prose-invert prose-indigo max-w-none text-slate-300 leading-relaxed text-lg font-medium">
                      <ParseDescription text={aiInsight} onRefClick={handleSelect} />
                    </div>
                  ) : (
                    <div className="py-6 text-center text-slate-500 italic">
                      Ask Gemini to explain how this provision impacts real-world connection designs.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[600px] bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-slate-600 p-12 text-center">
              <Info size={64} className="mb-6 opacity-20" />
              <h3 className="text-2xl font-bold text-white/50 mb-2">No clause selected</h3>
              <p className="max-w-xs mx-auto">Select a clause or table from the list on the left to explore its technical details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClausesPage;
