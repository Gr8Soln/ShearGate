import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Calculator, 
  Trash2, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Search, 
  Filter,
  Inbox,
  Loader2,
  MoreVertical,
  ExternalLink
} from "lucide-react";
import { sessionApi } from "../api/client";
import { useAuth } from "../contexts/AuthContext";

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: sessions, isLoading, error } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => sessionApi.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => sessionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this session?")) {
      deleteMutation.mutate(id);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", { 
      day: "2-digit", 
      month: "short", 
      year: "numeric" 
    });
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-GB", { 
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-indigo-500 mx-auto" size={40} />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Retrieving session history</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Clock size={14} />
            <span>Audit Trail</span>
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight">History</h1>
          <p className="text-slate-500 text-lg max-w-xl">
            Access your recent engineering sessions and AI-explained connection analyses.
          </p>
        </div>
        
        <Link 
          to="/analyze" 
          className="px-6 py-3 rounded-2xl bg-[#e8a020] hover:bg-[#f59e0b] text-[#0f172a] font-bold flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Calculator size={20} />
          <span>New Analysis</span>
        </Link>
      </div>

      {sessions && sessions.length > 0 ? (
        <div className="grid gap-4">
          {sessions.map((session: any) => (
            <div 
              key={session.id}
              onClick={() => navigate(`/results/${session.id}`)}
              className="group relative bg-slate-900 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-[2.5rem] transition-all cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                    <Calculator size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                      {session.title || "Untitled Session"}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1.5">
                        <Calendar size={14} />
                        <span>{formatDate(session.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Clock size={14} />
                        <span>{formatTime(session.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button 
                    onClick={(e) => handleDelete(e, session.id)}
                    className="p-3 rounded-xl bg-slate-800/50 text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="p-3 rounded-xl bg-slate-800 text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border-2 border-dashed border-slate-800 rounded-[3rem]">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl mx-auto flex items-center justify-center text-slate-700 mb-6">
            <Inbox size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">No history yet</h2>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">Perform your first analysis to see your engineering history here.</p>
          <Link 
            to="/analyze" 
            className="inline-flex items-center space-x-2 text-indigo-400 font-bold hover:text-indigo-300"
          >
            <span>Start an analysis</span>
            <ExternalLink size={18} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
