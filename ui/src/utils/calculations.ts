import { ConnectionInputs } from "../types";

export interface CalculationDetails {
  py: number;
  fu: number;
  Av: number;
  At: number;
  Atn: number;
  Pbs1: number;
  Pbs2: number;
  Pbs: number;
  utilization: number;
  pass: boolean;
  steps: any[];
}

export const calculateBlockShear = (inputs: ConnectionInputs): CalculationDetails => {
  // Constants for BS 5950
  const py = inputs.plateMaterial === "S355" ? 355 : 275;
  const fu = inputs.plateMaterial === "S355" ? 470 : 430;
  const t = inputs.plateThickness || 10;
  const d0 = (inputs.boltDiameter || 20) + 2;
  const p = inputs.pitch || 70;
  const e = inputs.edgeDistance || 50;
  const g = inputs.gauge || 60;
  const n = inputs.numberOfBolts || 4;

  // 1. Shear Area (Av) - Net shear area along bolt row
  // Av = [ (n-1)p + e - (n-0.5)d0 ] * t
  // Simplified for block shear failure path
  const Av_gross = ((n - 1) * p + e) * t;
  const Av_net = ((n - 1) * p + e - (n - 0.5) * d0) * t;

  // 2. Tension Area (At) - Net tension area
  // At = [ g - d0 ] * t
  const At_gross = g * t;
  const At_net = (g - d0) * t;

  // 3. Capacities based on BS 5950 Clause 6.2.4
  // Mode 1: Shear yielding + Tension rupture
  // Pbs1 = 0.6 * py * Av_gross + fu * At_net
  const Pbs1 = (0.6 * py * Av_gross + fu * At_net) / 1000; // kN

  // Mode 2: Shear rupture + Tension yielding
  // Pbs2 = 0.6 * fu * Av_net + py * At_gross
  const Pbs2 = (0.6 * fu * Av_net + py * At_gross) / 1000; // kN

  const Pbs = Math.min(Pbs1, Pbs2);
  const applied = inputs.appliedLoad || 0;
  const utilization = applied / Pbs;
  const pass = utilization <= 1.0;

  return {
    py,
    fu,
    Av: Av_net,
    At: At_net,
    Atn: At_net,
    Pbs1,
    Pbs2,
    Pbs,
    utilization,
    pass,
    steps: [
      {
        title: "Material Properties",
        description: `Using ${inputs.plateMaterial} steel: py = ${py} N/mm², fu = ${fu} N/mm².`,
        clause: "Table 9"
      },
      {
        title: "Shear Area Calculation",
        description: `Net shear area Av = ((n-1)p + e - (n-0.5)d0) * t = ((${n}-1)*${p} + ${e} - (${n}-0.5)*${d0}) * ${t} = ${Av_net.toFixed(1)} mm².`,
        clause: "6.2.4"
      },
      {
        title: "Tension Area Calculation",
        description: `Net tension area Atn = (g - d0) * t = (${g} - ${d0}) * ${t} = ${At_net.toFixed(1)} mm².`,
        clause: "6.2.4"
      },
      {
        title: "Block Shear Capacity",
        description: `Mode 1: ${Pbs1.toFixed(1)} kN. Mode 2: ${Pbs2.toFixed(1)} kN. Governing Pbs = ${Pbs.toFixed(1)} kN.`,
        clause: "6.2.4"
      }
    ]
  };
};
