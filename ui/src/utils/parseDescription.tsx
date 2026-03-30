import "katex/dist/katex.min.css";
import React from "react";
import { InlineMath } from "react-katex";
import { BS5950_CLAUSES, BS5950_TABLES } from "../data/bs5950";

interface ParseDescriptionProps {
  text: string;
  onRefClick: (refId: string, refType: "clause" | "table") => void;
}

export const parseDescription = (
  text: string,
  onRefClick: (refId: string, refType: "clause" | "table") => void,
) => {
  if (!text) return null;

  // First, parse references like [CLAUSE:x.x.x]
  const refRegex = /\[(CLAUSE|TABLE):([\w\.]+)\]/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = refRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const [, type, id] = match;
    const isClause = type === "CLAUSE";
    const refType = isClause ? "clause" : "table";
    const exists = isClause ? !!BS5950_CLAUSES[id] : !!BS5950_TABLES[id];

    parts.push(
      <button
        key={`ref-${match.index}`}
        onClick={(e) => {
          e.preventDefault();
          onRefClick(id, refType);
        }}
        className={`inline-flex items-center px-1.5 py-0.5 rounded font-mono text-xs font-bold mx-0.5 transition-all
          ${
            exists
              ? "bg-[#e8a020]/10 text-[#e8a020] border border-[#e8a020]/30 hover:bg-[#e8a020]/20"
              : "bg-[#4f9cf9]/10 text-[#4f9cf9] border border-[#4f9cf9]/30 hover:bg-[#4f9cf9]/20"
          }`}
      >
        {isClause ? `Clause ${id}` : `Table ${id}`}
      </button>,
    );

    lastIndex = refRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  // Second pass: Parse LaTeX math blocks ($...$) within the parts that are strings
  return parts.flatMap((part, i) => {
    if (typeof part !== "string") return part;

    const mathRegex = /\$([^$]+)\$/g;
    const mathParts: (string | JSX.Element)[] = [];
    let mathLastIndex = 0;
    let mathMatch;

    while ((mathMatch = mathRegex.exec(part)) !== null) {
      if (mathMatch.index > mathLastIndex) {
        mathParts.push(part.substring(mathLastIndex, mathMatch.index));
      }

      const MathFormula = mathMatch[1];
      mathParts.push(
        <span
          key={`math-${i}-${mathMatch.index}`}
          className="inline-block px-1 align-middle"
        >
          <InlineMath math={MathFormula} />
        </span>,
      );

      mathLastIndex = mathRegex.lastIndex;
    }

    if (mathLastIndex < part.length) {
      mathParts.push(part.substring(mathLastIndex));
    }

    return mathParts;
  });
};

export const ParseDescription: React.FC<ParseDescriptionProps> = ({
  text,
  onRefClick,
}) => {
  return (
    <span className="whitespace-pre-wrap break-words">
      {parseDescription(text, onRefClick)}
    </span>
  );
};
