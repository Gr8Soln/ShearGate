import React from "react";
import { BS5950_CLAUSES, BS5950_TABLES } from "../data/bs5950";

interface ParseDescriptionProps {
  text: string;
  onRefClick: (refId: string, refType: "clause" | "table") => void;
}

export const parseDescription = (text: string, onRefClick: (refId: string, refType: "clause" | "table") => void) => {
  if (!text) return null;

  // Regex to match [CLAUSE:x.x.x] or [TABLE:T.x]
  const regex = /\[(CLAUSE|TABLE):([\w\.]+)\]/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Push the text before the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const [fullMatch, type, id] = match;
    const isClause = type === "CLAUSE";
    const refType = isClause ? "clause" : "table";
    
    // Check if we have the data for it
    const exists = isClause ? !!BS5950_CLAUSES[id] : !!BS5950_TABLES[id];

    parts.push(
      <button
        key={match.index}
        onClick={(e) => {
          e.preventDefault();
          onRefClick(id, refType);
        }}
        className={`inline-flex items-center px-1.5 py-0.5 rounded font-mono text-xs font-bold mx-0.5 transition-all
          ${exists 
            ? "bg-[#e8a020]/10 text-[#e8a020] border border-[#e8a020]/30 hover:bg-[#e8a020]/20" 
            : "bg-[#4f9cf9]/10 text-[#4f9cf9] border border-[#4f9cf9]/30 hover:bg-[#4f9cf9]/20"}`}
      >
        {isClause ? `Clause ${id}` : `Table ${id}`}
      </button>
    );

    lastIndex = regex.lastIndex;
  }

  // Push the remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <>{parts}</>;
};

export const ParseDescription: React.FC<ParseDescriptionProps> = ({ text, onRefClick }) => {
  return <span>{parseDescription(text, onRefClick)}</span>;
};
