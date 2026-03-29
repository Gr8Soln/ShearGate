"""
Extract key BS 5950-1:2000 sections and write bs5950_context.md
"""

import fitz  # PyMuPDF

doc = fitz.open("data/bs-code-5950.pdf")

def pages(*args):
    """Get text from 1-based page numbers."""
    parts = []
    for n in args:
        t = doc[n-1].get_text("text").strip()
        if t:
            parts.append(t)
    return "\n\n".join(parts)

def page_range(start, end):
    return pages(*range(start, end + 1))

# ── Build markdown ────────────────────────────────────────────────────────────

md = []

md.append("""# BS 5950-1:2000 — Structural Use of Steelwork in Building
## Key Sections for Bolted Connection Design

Extracted from BS 5950-1:2000 for use as AI context. Covers:
- Section 3.4.3 — Net area
- Section 4.6 — Tension members  
- Section 6 — Bolted connections (Cl 6.2.4, 6.3.1–6.3.4)
- Table 3 — Net area coefficient Ke
- Table 9 — Design strength Py
- Table 29 — Minimum edge and end distances
- Table 30 — Design shear strength ps
- Table 31 — Design tension strength pt
- Table 32 — Design bearing strength pbs
- Table 34 — Hole clearances
- Table H.1 — Tensile stress area As

---
""")

# ── SECTION 3.4.3 NET AREA ─────────────────────────────────────────────────
md.append("## Section 3.4 — Local Capacity\n### 3.4.3 Net Area\n")
md.append(page_range(36, 37))

# ── TABLE 3 (Ke) ──────────────────────────────────────────────────────────
md.append("\n---\n## Table 3 — Net Area Coefficient Ke\n")
# Table 3 appears in the tables section near start of doc (page 26)
md.append(pages(26))

# ── TABLE 9 (Py) ──────────────────────────────────────────────────────────
md.append("\n---\n## Table 9 — Design Strength Py\n")
md.append(pages(34))

# ── SECTION 4.6 — TENSION MEMBERS ──────────────────────────────────────────
md.append("\n---\n## Section 4.6 — Tension Members\n")
md.append(page_range(80, 87))

# ── SECTION 6 — CONNECTIONS ────────────────────────────────────────────────
md.append("\n---\n## Section 6 — Connections\n")
# Main connection clauses: 6.1, 6.2, 6.2.4, 6.3, 6.3.1–6.3.4
md.append(page_range(128, 158))

# ── TABLE 29 (Edge distances) ──────────────────────────────────────────────
md.append("\n---\n## Table 29 — Minimum Edge and End Distances\n")
md.append(page_range(141, 143))

# ── TABLE 30 (ps — shear strength) ────────────────────────────────────────
md.append("\n---\n## Table 30 — Design Shear Strength ps\n")
md.append(page_range(143, 145))

# ── TABLE 31 (pt — tension strength) ──────────────────────────────────────
md.append("\n---\n## Table 31 — Design Tension Strength pt\n")
md.append(pages(145))

# ── TABLE 32 (pbs — bearing strength) ─────────────────────────────────────
md.append("\n---\n## Table 32 — Design Bearing Strength pbs\n")
md.append(pages(146))

# ── TABLE 34 (hole clearances) ────────────────────────────────────────────
md.append("\n---\n## Table 34 — Clearances for Ordinary Bolts (Hole Tolerances)\n")
md.append(page_range(147, 149))

# ── APPENDIX H / Bolt tensile stress areas ────────────────────────────────
md.append("\n---\n## Appendix H — Bolt Tensile Stress Areas\n")
# Scan pages 200-220 for tensile stress area table
for pg in range(200, 223):
    t = doc[pg-1].get_text("text")
    if "tensile stress area" in t.lower() or "stress area" in t.lower():
        md.append(f"_(Page {pg})_\n")
        md.append(t.strip())
        break

md.append("\n\n---\n_End of BS 5950-1:2000 extracted context_\n")

# ── Write file ────────────────────────────────────────────────────────────
output = "\n\n".join(md)
with open("bs5950_context.md", "w", encoding="utf-8") as f:
    f.write(output)

doc.close()
chars = len(output)
print(f"✓ Written bs5950_context.md — {chars:,} characters ({chars//4:,} approx tokens)")
