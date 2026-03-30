import { BS5950Clause, BS5950Table } from "../types";

export const BS5950_CLAUSES: Record<string, BS5950Clause> = {
  "3.4.3": {
    number: "3.4.3",
    title: "Effective Net Area",
    section: "Section 3.4",
    content: "The effective net area $a_e$ of each element of a cross-section with bolt holes should be determined from: $a_e = K_e \cdot a_n$, but $a_e \\le a_g$, in which the effective net area coefficient $K_e$ is given by Table 3.",
    equation: "a_e = K_e \\cdot a_n",
    references: ["Table 3", "3.4.4"],
    StartLine: 4
  },
  "4.6.1": {
    number: "4.6.1",
    title: "Tension Capacity",
    section: "Section 4.6",
    content: "The tension capacity $P_t$ of a member should generally be obtained from: $P_t = p_y \\cdot A_e$, in which $A_e$ is the sum of the effective net areas $a_e$ of all the elements of the cross-section.",
    equation: "P_t = p_y \\cdot A_e",
    references: ["3.4.3", "Table 9"],
    StartLine: 12
  },
  "6.2.4": {
    number: "6.2.4",
    title: "ShearGate Rupture",
    section: "Section 6.2",
    content: "The block shear capacity $P_r$ of a connection should be determined by considering the failure of the connected part. $P_r = 0.6 \\cdot p_y \\cdot A_{vn} + \\frac{U \\cdot p_y \\cdot A_{tn}}{1.25}$.",
    equation: "P_r = 0.6 \\cdot p_y \\cdot A_{vn} + \\frac{U \\cdot p_y \\cdot A_{tn}}{1.25}",
    references: ["6.2.3", "Table 9"],
    StartLine: 20
  },
  "6.3.1": {
    number: "6.3.1",
    title: "Bolt Shear Capacity",
    section: "Section 6.3",
    content: "The shear capacity of a bolt $P_s$ should be determined as: $P_s = p_s \\cdot A_s$, where $p_s$ is the design shear strength and $A_s$ is the relevant area (shear area).",
    equation: "P_s = p_s \\cdot A_s",
    references: ["Table 30"],
    StartLine: 28
  },
  "6.3.3.3": {
    number: "6.3.3.3",
    title: "Bolt Bearing Capacity",
    section: "Section 6.3",
    content: "The bearing capacity $P_{bs}$ of the connected part should be taken as: $P_{bs} = d \\cdot t \\cdot p_{bs}$, where $d$ is the nominal bolt diameter and $t$ is the thickness of the connected part.",
    equation: "P_{bs} = d \\cdot t \\cdot p_{bs}",
    references: ["Table 32"],
    StartLine: 36
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
