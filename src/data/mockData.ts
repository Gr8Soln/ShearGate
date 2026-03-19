import type {
  Calculation,
  ConnectionInputs,
  CalculationResult,
} from "../types";

// Mock calculation results for demonstration
export const mockCalculations: Calculation[] = [
  {
    id: "calc_001",
    timestamp: "2026-03-18T10:30:00Z",
    questionText:
      "A double angle connection with 4 x M20 Grade 8.8 bolts. Angles: 100x100x10mm, S275 steel. Check block shear capacity.",
    inputs: {
      boltGrade: "8.8",
      boltDiameter: 20,
      numberOfBolts: 4,
      pitch: 70,
      edgeDistance: 50,
      endDistance: 50,
      plateMaterial: "S275",
      plateThickness: 10,
      gauge: 60,
      connectionType: "bearing",
    },
    result: {
      blockShearOccurs: false,
      blockShearCapacity: 425.5,
      appliedLoad: 320.0,
      utilizationRatio: 0.75,
      verdict: "SAFE - Block shear will not occur",
      mode1Capacity: 425.5,
      mode2Capacity: 458.2,
    },
    steps: [
      {
        step: 1,
        title: "Material Properties",
        content:
          "For S275 steel:\n• Design strength py = 275 N/mm²\n• Ultimate tensile strength fu = 430 N/mm²",
        clause: "Table 9",
        formulas: [],
      },
      {
        step: 2,
        title: "Geometric Parameters",
        content:
          "Connection geometry:\n• Bolt diameter d = 20 mm\n• Hole diameter d₀ = 22 mm (d + 2mm for ordinary bolts)\n• Number of bolts n = 4\n• Pitch p = 70 mm\n• Edge distance e = 50 mm\n• Plate thickness t = 10 mm",
        clause: "3.4.3",
        formulas: ["d₀ = d + 2mm"],
      },
      {
        step: 3,
        title: "Shear Area Calculation",
        content:
          "The gross shear area along the failure plane:\nAv = (3p + e) × t\nAv = (3 × 70 + 50) × 10\nAv = 2600 mm²",
        clause: "6.2.4",
        formulas: ["Av = (3p + e) × t", "Av = 2600 mm²"],
      },
      {
        step: 4,
        title: "Tension Area Calculation",
        content:
          "Gross tension area:\nAt = gauge × t = 60 × 10 = 600 mm²\n\nNet tension area (deducting one bolt hole):\nAtn = At - d₀ × t\nAtn = 600 - 22 × 10 = 380 mm²",
        clause: "6.2.4",
        formulas: ["At = gauge × t", "Atn = At - d₀ × t", "Atn = 380 mm²"],
      },
      {
        step: 5,
        title: "Block Shear Capacity - Mode 1",
        content:
          "Shear yielding + Tension rupture:\nPbs1 = 0.6 × py × Av + py × At\nPbs1 = 0.6 × 275 × 2600 + 275 × 600\nPbs1 = 429,000 + 165,000\nPbs1 = 594 kN",
        clause: "6.2.4",
        formulas: [
          "Pbs1 = 0.6 × py × Av + py × At",
          "Pbs1 = 0.6 × 275 × 2600 + 275 × 600",
          "Pbs1 = 594 kN",
        ],
      },
      {
        step: 6,
        title: "Block Shear Capacity - Mode 2",
        content:
          "Shear rupture + Tension rupture:\nPbs2 = fu × Av + 0.5 × fu × Atn\nPbs2 = 430 × 2600 + 0.5 × 430 × 380\nPbs2 = 1,118,000 + 81,700\nPbs2 = 1,199.7 kN",
        clause: "6.2.4",
        formulas: [
          "Pbs2 = fu × Av + 0.5 × fu × Atn",
          "Pbs2 = 430 × 2600 + 0.5 × 430 × 380",
          "Pbs2 = 1,199.7 kN",
        ],
      },
      {
        step: 7,
        title: "Design Block Shear Capacity",
        content:
          "The design capacity is the minimum of the two modes:\nPbs = min(Pbs1, Pbs2)\nPbs = min(594, 1199.7)\nPbs = 594 kN",
        clause: "6.2.4",
        formulas: ["Pbs = min(Pbs1, Pbs2)", "Pbs = 594 kN"],
      },
      {
        step: 8,
        title: "Capacity Check",
        content:
          "Applied load P = 320 kN\nUtilization ratio = P / Pbs = 320 / 594 = 0.54\n\nSince P < Pbs and utilization < 1.0:\n✓ Block shear will NOT occur\n✓ Connection is SAFE",
        clause: "6.2.4",
        formulas: ["η = P / Pbs = 0.54", "η < 1.0 ✓ SAFE"],
      },
    ],
  },
];

// Mock function to simulate AI parsing
export const mockAIParse = (_: string): Promise<ConnectionInputs> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        boltGrade: "8.8",
        boltDiameter: 20,
        numberOfBolts: 4,
        pitch: 70,
        edgeDistance: 50,
        endDistance: 50,
        plateMaterial: "S275",
        plateThickness: 10,
        gauge: 60,
        connectionType: "bearing",
        appliedLoad: 320,
      });
    }, 1500);
  });
};

// Mock calculation function
export const mockCalculate = (
  inputs: ConnectionInputs,
): Promise<CalculationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simplified block shear calculation
      const py = 275; // S275 steel
      const fu = 430;
      const t = inputs.plateThickness;
      const d0 = inputs.boltDiameter + 2;
      const p = inputs.pitch;
      const e = inputs.edgeDistance;
      const gauge = inputs.gauge;
      const n = inputs.numberOfBolts;

      // Shear area
      const Av = ((n - 1) * p + e) * t;

      // Tension areas
      const At = gauge * t;
      const Atn = At - d0 * t;

      // Block shear modes
      const Pbs1 = (0.6 * py * Av + py * At) / 1000; // in kN
      const Pbs2 = (fu * Av + 0.5 * fu * Atn) / 1000; // in kN
      const Pbs = Math.min(Pbs1, Pbs2);

      const appliedLoad = inputs.appliedLoad || 0;
      const utilizationRatio = appliedLoad / Pbs;
      const blockShearOccurs = utilizationRatio >= 1.0;

      resolve({
        blockShearOccurs,
        blockShearCapacity: Pbs.toFixed(1),
        appliedLoad: appliedLoad.toFixed(1),
        utilizationRatio: utilizationRatio.toFixed(2),
        verdict: blockShearOccurs
          ? "UNSAFE - Block shear will occur"
          : "SAFE - Block shear will not occur",
        mode1Capacity: Pbs1.toFixed(1),
        mode2Capacity: Pbs2.toFixed(1),
        calculations: {
          py,
          fu,
          Av: Av.toFixed(0),
          At: At.toFixed(0),
          Atn: Atn.toFixed(0),
        },
      });
    }, 1000);
  });
};
