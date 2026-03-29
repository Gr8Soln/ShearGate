import { BS5950Clause, BS5950Table } from "../types";

export const BS5950_CLAUSES: Record<string, BS5950Clause> = {
  "3.4.3": {
    number: "3.4.3",
    title: "Effective Net Area",
    section: "Section 3.4",
    content: "The effective net area ae of each element of a cross-section with bolt holes should be determined from: ae = Ke * an, but ae <= ag, in which the effective net area coefficient Ke is given by Table 3.",
    equation: "ae = Ke * an",
    references: ["Table 3", "3.4.4"]
  },
  "4.6.1": {
    number: "4.6.1",
    title: "Tension Capacity",
    section: "Section 4.6",
    content: "The tension capacity Pt of a member should generally be obtained from: Pt = py * Ae, in which Ae is the sum of the effective net areas ae of all the elements of the cross-section.",
    equation: "Pt = py * Ae",
    references: ["3.4.3", "Table 9"]
  },
  "6.2.4": {
    number: "6.2.4",
    title: "Block Shear Rupture",
    section: "Section 6.2",
    content: "The block shear capacity Pr of a connection should be determined by considering the failure of the connected part. Pr = 0.6 * py * Avn + U * py * Atn / 1.25.",
    equation: "Pr = 0.6 * py * Avn + U * py * Atn / 1.25",
    references: ["6.2.3", "Table 9"]
  },
  "6.3.1": {
    number: "6.3.1",
    title: "Bolt Shear Capacity",
    section: "Section 6.3",
    content: "The shear capacity of a bolt Ps should be determined as: Ps = ps * As, where ps is the design shear strength and As is the relevant area (shear area).",
    equation: "Ps = ps * As",
    references: ["Table 30"]
  },
  "6.3.3.3": {
    number: "6.3.3.3",
    title: "Bolt Bearing Capacity",
    section: "Section 6.3",
    content: "The bearing capacity Pbs of the connected part should be taken as: Pbs = d * t * pbs, where d is the nominal bolt diameter and t is the thickness of the connected part.",
    equation: "Pbs = d * t * pbs",
    references: ["Table 32"]
  }
  // ... more clauses can be added here
};

export const BS5950_TABLES: Record<string, BS5950Table> = {
  "T.3": {
    id: "T.3",
    title: "Net Area Coefficient Ke",
    headers: ["Steel Grade", "Ke"],
    rows: [
      ["S 275", "1.2"],
      ["S 355", "1.1"],
      ["S 460", "1.0"]
    ]
  },
  "T.9": {
    id: "T.9",
    title: "Design Strength Py",
    headers: ["Thickness (mm)", "S 275 (N/mm²)", "S 355 (N/mm²)"],
    rows: [
      ["<= 16", "275", "355"],
      ["40", "265", "345"],
      ["63", "255", "335"],
      ["80", "245", "325"],
      ["100", "235", "315"]
    ]
  },
  "T.30": {
    id: "T.30",
    title: "Design Shear Strength ps",
    headers: ["Grade", "ps (N/mm²)"],
    rows: [
      ["4.6", "160"],
      ["8.8", "375"]
    ]
  },
  "T.32": {
    id: "T.32",
    title: "Design Bearing Strength pbs",
    headers: ["Steel Grade", "Grade 4.6 Bolt", "Grade 8.8 Bolt"],
    rows: [
      ["S 275", "460", "550"],
      ["S 355", "550", "650"]
    ]
  }
};

export const REFERENCE_GROUPS = [
  {
    title: "Section 3: Properties",
    items: ["3.4.3", "T.3", "T.9"]
  },
  {
    title: "Section 6: Connections",
    items: ["6.2.4", "6.3.1", "6.3.3.3", "T.30", "T.32"]
  }
];
