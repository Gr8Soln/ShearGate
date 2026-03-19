// Type definitions for the Block Shear Analyzer

export interface ConnectionInputs {
  boltGrade: '4.6' | '8.8';
  boltDiameter: number;
  numberOfBolts: number;
  pitch: number;
  edgeDistance: number;
  endDistance: number;
  plateMaterial: 'S275' | 'S355' | 'S235';
  plateThickness: number;
  gauge: number;
  connectionType: 'bearing' | 'slip-resistant' | 'tension';
  appliedLoad: number;
}

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

export interface CalculationStep {
  step: number;
  title: string;
  content: string;
  clause: string;
  formulas: string[];
}

export interface Calculation {
  id: string;
  timestamp: string;
  questionText?: string;
  inputs: ConnectionInputs;
  result: CalculationResult;
  steps: CalculationStep[];
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

export interface MaterialProperties {
  py: number;
  fu: number;
}

export interface BoltProperties {
  ps: number;
  pt: number;
}
