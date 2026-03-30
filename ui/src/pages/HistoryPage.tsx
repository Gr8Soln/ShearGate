import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Calculator, 
  Trash2, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Inbox,
  Loader2,
  ExternalLink
} from "lucide-react";
import { sessionApi } from "../api/client";

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: sessions, isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => sessionApi.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => sessionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });

  const deletingId = deleteMutation.isPending ? deleteMutation.variables : null;

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
      <div className="min-h-screen pt-28 flex items-center justify-center bg-[#090a0c]">
        <div className="text-center space-y-4">
          <Loader2 className="animate-spin text-[#e8a020] mx-auto" size={40} />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Retrieving audit trail...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-5xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center">
            <span className="badge-glow">Audit Trail</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight leading-none">History</h1>
          <p className="text-slate-500 font-medium max-w-xl">
            Access your recent engineering sessions and AI-explained connection analyses.
          </p>
        </div>
        
        <Link 
          to="/analyze" 
          className="btn-primary py-3 px-8 flex items-center gap-3"
        >
          <Calculator size={20} />
          <span>New Analysis</span>
        </Link>
      </div>

      {sessions && sessions.length > 0 ? (
        <div className="grid gap-4 animate-fade-in">
          {sessions.map((session: any) => (
            <div 
              key={session.id}
              onClick={() => navigate(`/results/${session.id}`)}
              className="card p-6 cursor-pointer hover:border-white/10 group bg-white/[0.02]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 group-hover:bg-[#e8a020]/10 group-hover:text-[#e8a020] group-hover:border-[#e8a020]/20 transition-all">
                    <Calculator size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white mb-2 group-hover:text-[#e8a020] transition-colors leading-none">
                      {session.title || "Untitled Session"}
                    </h3>
                    <div className="flex items-center space-x-4 text-[10px] font-black uppercase tracking-widest text-slate-600">
                      <div className="flex items-center space-x-2">
                        <Calendar size={12} className="text-[#e8a020]/40" />
                        <span>{formatDate(session.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={12} className="text-[#e8a020]/40" />
                        <span>{formatTime(session.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button 
                    onClick={(e) => handleDelete(e, session.id)}
                    disabled={deleteMutation.isPending}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    {deletingId === session.id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
                  </button>
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-600 group-hover:bg-[#e8a020] group-hover:text-[#090a0c] transition-all">
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.01]">
          <div className="w-16 h-16 bg-white/5 rounded-2xl mx-auto flex items-center justify-center text-slate-700 mb-6">
            <Inbox size={32} />
          </div>
          <h2 className="text-xl font-black text-white mb-2 uppercase tracking-tight">No history yet</h2>
          <p className="text-slate-500 font-medium mb-8 max-w-sm mx-auto">Perform your first analysis to see your engineering history here.</p>
          <Link 
            to="/analyze" 
            className="text-[#e8a020] text-sm font-black uppercase tracking-widest hover:underline flex items-center justify-center gap-2"
          >
            Start Analysis <ExternalLink size={16} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
