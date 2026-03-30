import "katex/dist/katex.min.css";
import React from "react";
import { InlineMath } from "react-katex";
import { BS5950_CLAUSES, BS5950_TABLES } from "../data/bs5950";
import { normalizeReferenceId } from "./referenceIds";

interface ParseDescriptionProps {
  text: string;
  onRefClick: (refId: string, refType: "clause" | "table") => void;
}

const parseSubSupText = (text: string, keyPrefix: string) => {
  const tokenRegex =
    /\b([A-Za-z][A-Za-z0-9]*)_([A-Za-z0-9]+)\b|\b([A-Za-z0-9]+)\^([A-Za-z0-9+\-]+)\b/g;
  const chunks: (string | JSX.Element)[] = [];
  let last = 0;
  let match;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > last) {
      chunks.push(text.substring(last, match.index));
    }

    if (match[1] && match[2]) {
      chunks.push(
        <span key={`${keyPrefix}-sub-${match.index}`}>
          {match[1]}
          <sub className="text-[0.72em] align-sub">{match[2]}</sub>
        </span>,
      );
    } else if (match[3] && match[4]) {
      chunks.push(
        <span key={`${keyPrefix}-sup-${match.index}`}>
          {match[3]}
          <sup className="text-[0.72em] align-super">{match[4]}</sup>
        </span>,
      );
    }

    last = tokenRegex.lastIndex;
  }

  if (last < text.length) {
    chunks.push(text.substring(last));
  }

  return chunks;
};

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
    const normalizedId = normalizeReferenceId(id, refType);
    const exists =
      refType === "clause"
        ? !!BS5950_CLAUSES[normalizedId]
        : !!BS5950_TABLES[normalizedId];

    parts.push(
      <button
        key={`ref-${match.index}`}
        onClick={(e) => {
          e.preventDefault();
          onRefClick(normalizedId, refType);
        }}
        className={`inline-flex items-center px-1.5 py-0.5 rounded font-mono text-xs font-bold mx-0.5 transition-all
          ${
            exists
              ? "bg-[#e8a020]/10 text-[#e8a020] border border-[#e8a020]/30 hover:bg-[#e8a020]/20"
              : "bg-[#4f9cf9]/10 text-[#4f9cf9] border border-[#4f9cf9]/30 hover:bg-[#4f9cf9]/20"
          }`}
      >
        {isClause ? `Clause ${normalizedId}` : `Table ${normalizedId}`}
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

    // Third pass: apply fallback sub/sup formatting in non-LaTeX plain text.
    return mathParts.flatMap((chunk, j) =>
      typeof chunk === "string"
        ? parseSubSupText(chunk, `chunk-${i}-${j}`)
        : chunk,
    );
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
