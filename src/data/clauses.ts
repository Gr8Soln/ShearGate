import type { BS5950Clause, ClauseDictionary } from "../types";

// Mock BS 5950 clauses database
export const bs5950Clauses: ClauseDictionary = {
  "6.2": {
    number: "6.2",
    title: "Design strength of bolts",
    section: "Bolts",
    content: `The design strength of a bolt shall be determined from the appropriate values given in Table 32 to Table 35, depending upon:
    
a) the bolt grade;
b) the type of loading (shear, tension or combined shear and tension);
c) the clearance in the bolt hole;
d) the class of connection (bearing or slip-resistant).

For bolts in clearance holes subject to shear, the design shear strength should be taken as:
• For bolts in bearing-type connections: Ps = ps As
• For bolts in slip-resistant connections: Psl = Ks μ Po

where:
ps = shear strength from Table 32
As = shear area (typically 0.6 times tensile stress area)
Ks = slip factor (typically 1.0 for clean mill scale)
μ = slip factor (typically 0.45)
Po = minimum bolt tension`,
    references: ["Table 32", "Table 33", "Table 34", "Table 35"],
  },

  "6.2.4": {
    number: "6.2.4",
    title: "Block shear",
    section: "Bolts",
    content: `When a connected part is liable to fail by tearing along a path involving both shear and tension, the resistance should be checked against block shear failure.

The block shear capacity Pbs should be taken as the lesser of:

a) 0.6 py Av + py At
b) fu Av + 0.5 fu Atn

where:
py = design strength of the connected part
fu = ultimate tensile strength of the connected part
Av = area subject to shear (gross area along shear failure plane)
At = area subject to tension (gross area along tension failure plane)
Atn = net area subject to tension (net area deducting bolt holes)

The applied force should not exceed the block shear capacity.`,
    equation: "Pbs = min(0.6py*Av + py*At, fu*Av + 0.5fu*Atn)",
    references: ["Clause 3.4.3", "Table 9"],
  },

  "6.3.2": {
    number: "6.3.2",
    title: "Spacing and edge distances",
    section: "Bolts",
    content: `The spacing of bolts and edge distances shall be in accordance with the following requirements:

Minimum spacing:
• In the direction of load transfer: 2.5d
• Perpendicular to load transfer: 2.5d

Maximum spacing (for elements exposed to weather):
• Along edges: 16t or 200mm (whichever is smaller)
• Internal: 16t or 200mm (whichever is smaller)

Minimum edge distance:
• Rolled, machine flame cut, sawn or planed edges: 1.25d
• Sheared or hand flame cut edges: 1.4d
• In direction of load transfer: 2d

where:
d = nominal bolt diameter
t = thickness of thinner outer ply`,
    references: ["Table 28"],
  },

  "3.4.3": {
    number: "3.4.3",
    title: "Net area",
    section: "General",
    content: `In calculating the net area of a tension member, deduction should be made for bolt holes and other openings.

For bolt holes, the deduction should be based on a hole diameter of:
• For ordinary bolts: nominal diameter + 2mm

The net area An should be taken as:
An = Ag - Σ(d0 × t)

where:
Ag = gross cross-sectional area
d0 = effective hole diameter (d + 2mm for ordinary bolts)
t = thickness of material

For staggered bolt holes, the net area may be increased by s²t/(4g) for each stagger, where:
s = staggered pitch
g = gauge (perpendicular spacing)`,
    references: ["Clause 4.6"],
  },

  "4.6": {
    number: "4.6",
    title: "Tension members",
    section: "Design of members",
    content: `The tension capacity Pt of a member should be taken as the smaller of:

a) py Ag (based on gross area and design strength)
b) Ae py (based on effective area and design strength)  
c) 0.9 fu Ae (based on effective area and ultimate strength)

where:
py = design strength
fu = ultimate tensile strength
Ag = gross cross-sectional area
Ae = effective net area

For members connected through all elements:
Ae = Ke An

where:
Ke = efficiency factor (typically 1.0 for bolted connections through all elements)
An = net area`,
    equation: "Pt = min(py*Ag, Ae*py, 0.9*fu*Ae)",
    references: ["Table 9", "Clause 3.4.3"],
  },

  Table32: {
    number: "Table 32",
    title:
      "Shear strength ps and tension strength pt for Grade 4.6 and Grade 8.8 bolts",
    section: "Tables",
    content: `Design strength values for ordinary bolts in N/mm²:

Grade 4.6 bolts:
• Shear strength (ps): 160 N/mm²
• Tension strength (pt): 195 N/mm²

Grade 8.8 bolts:
• Shear strength (ps): 375 N/mm²
• Tension strength (pt): 450 N/mm²

These values apply to bolts in bearing-type connections with standard clearance holes.`,
    references: ["Clause 6.2"],
  },
};

// Helper function to get clause details
export const getClause = (clauseNumber: string): BS5950Clause | null => {
  return bs5950Clauses[clauseNumber] || null;
};

// Helper function to search clauses
export const searchClauses = (keyword: string): BS5950Clause[] => {
  const results: BS5950Clause[] = [];
  for (const [_, clause] of Object.entries(bs5950Clauses)) {
    if (
      clause.title.toLowerCase().includes(keyword.toLowerCase()) ||
      clause.content.toLowerCase().includes(keyword.toLowerCase()) ||
      clause.section.toLowerCase().includes(keyword.toLowerCase())
    ) {
      results.push({ ...clause });
    }
  }
  return results;
};
