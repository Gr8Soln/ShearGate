export const normalizeReferenceId = (
  id: string,
  type: "clause" | "table",
): string => {
  const cleaned = id.trim().replace(/[\]\[(),;:.]+$/g, "");

  if (type === "clause") {
    return cleaned.replace(/^clause\s+/i, "");
  }

  // Table normalization examples:
  // "Table 9" -> "T.9", "T9" -> "T.9", "t.30" -> "T.30", "30" -> "T.30"
  const withoutPrefix = cleaned.replace(/^table\s*/i, "").replace(/^t\.?/i, "");

  return `T.${withoutPrefix}`;
};
