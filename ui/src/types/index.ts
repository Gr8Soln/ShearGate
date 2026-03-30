// Type definitions for the Block Shear Analyzer

export interface BoltLayout {
  rows: number;
  cols: number;
  pitch: number; // mm
  gauge: number; // mm
  edge_parallel: number; // mm — e1
  edge_perpendicular: number; // mm — e2
}

export interface ConnectionInputs {
  connection_type?: "lap_joint" | "butt_joint" | "gusset_plate" | "angle_cleat";
  bolt_grade?: "4.6" | "8.8";
  bolt_diameter?: number;
  hole_diameter?: number;
  steel_grade?: "S275" | "S355";
  plate_thickness?: number;
  member_thickness?: number;
  layout?: BoltLayout;
  applied_force?: number; // kN
  shear_planes?: 1 | 2;

  // Frontend camelCase properties
  connectionType?: string;
  boltGrade?: string;
  boltDiameter?: number;
  numberOfBolts?: number;
  pitch?: number;
  edgeDistance?: number;
  endDistance?: number;
  plateMaterial?: string;
  plateThickness?: number;
  gauge?: number;
  appliedLoad?: number;
}

export interface CalcStep {
  description: string;
  formula: string;
  substitution: string;
  result: string;
  unit: string;
}

export interface CheckResult {
  id: string;
  name: string;
  clause: string;
  clause_title: string;
  steps: CalcStep[];
  capacity: number;
  applied: number;
  utilisation: number;
  pass: boolean;
  note?: string;
}

export interface SolutionResult {
  connection_type: string;
  inputs: ConnectionInputs;
  checks: CheckResult[];
  overall_pass: boolean;
  governing_check: string;
  summary: string;
}

export interface CalculationOut {
  id: string;
  session_id: string;
  user_id: string;
  input_raw: string;
  input_parsed: ConnectionInputs;
  result: SolutionResult;
  overall_pass: boolean;
  governing_check: string;
  created_at: string;
}

export interface SaveCalculationRequest {
  input_raw: string;
  input_parsed: ConnectionInputs;
  result: SolutionResult;
  overall_pass: boolean;
  governing_check: string;
}

// Legacy/demo mock types used by ui/src/data/mockData.ts
export interface CalculationResult {
  blockShearOccurs: boolean;
  blockShearCapacity: string;
  appliedLoad: string;
  utilizationRatio: string;
  verdict: string;
  mode1Capacity: string;
  mode2Capacity: string;
  calculations?: {
    py: number;
    fu: number;
    Av: string;
    At: string;
    Atn: string;
  };
}

export interface CalculationStepItem {
  step: number;
  title: string;
  content: string;
  clause: string;
  formulas: string[];
}

export interface Calculation {
  id: string;
  timestamp: string;
  questionText: string;
  inputs: ConnectionInputs;
  result: CalculationResult;
  steps: CalculationStepItem[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  google_id: string;
  avatar_url?: string;
  created_at: string;
}

export interface Message {
  id: string;
  session_id: string;
  input_type: "text" | "file";
  input_raw: string;
  input_parsed?: any;
  result?: any;
  overall_pass: boolean;
  ai_explanation?: string;
  created_at: string;
}

export interface Session {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages?: Message[];
}

export interface BS5950Clause {
  number: string;
  title: string;
  section: string;
  content: string;
  equation?: string;
  references?: string[];
}

export interface BS5950Table {
  id: string;
  title: string;
  headers: string[];
  rows: string[][];
}

export type ClauseDictionary = {
  [key: string]: BS5950Clause;
};
