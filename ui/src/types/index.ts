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

export interface BS5950Clause {
  number: string;
  title: string;
  section: string;
  content: string;
  equation?: string;
  references?: string[];
}

export type ClauseDictionary = {
  [key: string]: BS5950Clause;
};

export interface CalculationResult {
  blockShearOccurs: boolean;
  blockShearCapacity: string | number;
  appliedLoad: string | number;
  utilizationRatio: string | number;
  verdict: string;
  mode1Capacity?: string | number;
  mode2Capacity?: string | number;
  calculations?: any;
}

export interface Calculation {
  id: string;
  timestamp: string;
  questionText: string;
  inputs: any;
  result: CalculationResult;
  steps: any[];
}
