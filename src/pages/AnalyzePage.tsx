import React, { useState } from 'react';
import { Upload, FileText, Image as ImageIcon, Loader2, Calculator, Sparkles } from 'lucide-react';
import { mockAIParse, mockCalculate } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import type { ConnectionInputs } from '../types';

type InputMode = 'manual' | 'text' | 'image';

const AnalyzePage: React.FC = () => {
  const navigate = useNavigate();
  const [inputMode, setInputMode] = useState<InputMode>('manual');
  const [questionText, setQuestionText] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  
  const [inputs, setInputs] = useState<ConnectionInputs>({
    boltGrade: '8.8',
    boltDiameter: 20,
    numberOfBolts: 4,
    pitch: 70,
    edgeDistance: 50,
    endDistance: 50,
    plateMaterial: 'S275',
    plateThickness: 10,
    gauge: 60,
    connectionType: 'bearing',
    appliedLoad: 320
  });

  const handleInputChange = (field: keyof ConnectionInputs, value: string | number): void => {
    setInputs(prev => ({ ...prev, [field]: typeof value === 'string' && !isNaN(Number(value)) ? parseFloat(value) : value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleAIExtraction = async (): Promise<void> => {
    setIsProcessing(true);
    setProcessingStep('Reading question...');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setProcessingStep('Extracting parameters...');
    
    const extracted = await mockAIParse(questionText);
    
    setProcessingStep('Parameters extracted!');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setInputs(extracted);
    setInputMode('manual');
    setIsProcessing(false);
  };

  const handleCalculate = async (): Promise<void> => {
    setIsProcessing(true);
    setProcessingStep('Running block shear analysis...');
    
    const result = await mockCalculate(inputs);
    
    setProcessingStep('Complete!');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Navigate to results page with data
    navigate('/results', { state: { inputs, result } });
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-steel-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-steel-900 mb-4">
            Block Shear Analysis
          </h1>
          <p className="text-lg text-steel-600">
            Enter connection parameters manually or let AI extract them from your question
          </p>
        </div>

        {/* Input Mode Selector */}
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent-blue" />
            <h2 className="text-xl font-bold text-steel-900">Input Method</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => setInputMode('manual')}
              className={`p-6 rounded-xl border-2 transition-all ${
                inputMode === 'manual'
                  ? 'border-accent-blue bg-blue-50 shadow-md'
                  : 'border-steel-200 hover:border-steel-300'
              }`}
            >
              <Calculator className={`w-8 h-8 mb-3 ${inputMode === 'manual' ? 'text-accent-blue' : 'text-steel-400'}`} />
              <h3 className="font-semibold text-steel-900 mb-1">Manual Input</h3>
              <p className="text-sm text-steel-600">Enter parameters directly</p>
            </button>

            <button
              onClick={() => setInputMode('text')}
              className={`p-6 rounded-xl border-2 transition-all ${
                inputMode === 'text'
                  ? 'border-accent-blue bg-blue-50 shadow-md'
                  : 'border-steel-200 hover:border-steel-300'
              }`}
            >
              <FileText className={`w-8 h-8 mb-3 ${inputMode === 'text' ? 'text-accent-blue' : 'text-steel-400'}`} />
              <h3 className="font-semibold text-steel-900 mb-1">Text Question</h3>
              <p className="text-sm text-steel-600">AI extracts parameters</p>
            </button>

            <button
              onClick={() => setInputMode('image')}
              className={`p-6 rounded-xl border-2 transition-all ${
                inputMode === 'image'
                  ? 'border-accent-blue bg-blue-50 shadow-md'
                  : 'border-steel-200 hover:border-steel-300'
              }`}
            >
              <ImageIcon className={`w-8 h-8 mb-3 ${inputMode === 'image' ? 'text-accent-blue' : 'text-steel-400'}`} />
              <h3 className="font-semibold text-steel-900 mb-1">Image Upload</h3>
              <p className="text-sm text-steel-600">Upload question image</p>
            </button>
          </div>
        </div>

        {/* Text Question Input */}
        {inputMode === 'text' && (
          <div className="card p-6 mb-8 animate-fade-in">
            <label className="block mb-3 font-semibold text-steel-900">
              Paste Your Question
            </label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Example: A double angle connection with 4 x M20 Grade 8.8 bolts. Angles: 100x100x10mm, S275 steel. Pitch 70mm, edge distance 50mm, gauge 60mm. Applied load 320 kN. Check block shear capacity."
              className="input-field min-h-[150px] resize-y"
            />
            <button
              onClick={handleAIExtraction}
              disabled={!questionText || isProcessing}
              className="btn-primary mt-4 w-full md:w-auto"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {processingStep}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Extract Parameters with AI
                </>
              )}
            </button>
          </div>
        )}

        {/* Image Upload Input */}
        {inputMode === 'image' && (
          <div className="card p-6 mb-8 animate-fade-in">
            <label className="block mb-3 font-semibold text-steel-900">
              Upload Question Image
            </label>
            <div className="border-2 border-dashed border-steel-300 rounded-xl p-12 text-center hover:border-accent-blue transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-steel-400 mx-auto mb-4" />
                <p className="text-steel-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-steel-500">
                  PNG, JPG, or PDF up to 10MB
                </p>
              </label>
              {imageFile && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-green-700 font-medium">
                    ✓ {imageFile.name}
                  </p>
                </div>
              )}
            </div>
            {imageFile && (
              <button
                onClick={handleAIExtraction}
                disabled={isProcessing}
                className="btn-primary mt-4 w-full md:w-auto"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    {processingStep}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Extract Parameters from Image
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Manual Input Form */}
        {inputMode === 'manual' && (
          <div className="card p-8 mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-steel-900 mb-6">
              Connection Parameters
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Bolt Properties */}
              <div className="space-y-4">
                <h3 className="font-semibold text-steel-800 text-lg mb-4 pb-2 border-b border-steel-200">
                  Bolt Properties
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-2">
                    Bolt Grade
                  </label>
                  <select
                    value={inputs.boltGrade}
                    onChange={(e) => handleInputChange('boltGrade', e.target.value)}
                    className="input-field"
                  >
                    <option value="4.6">Grade 4.6</option>
                    <option value="8.8">Grade 8.8</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-2">
                    Bolt Diameter (mm)
                  </label>
                  <input
                    type="number"
                    value={inputs.boltDiameter}
                    onChange={(e) => handleInputChange('boltDiameter', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-2">
                    Number of Bolts
                  </label>
                  <input
                    type="number"
                    value={inputs.numberOfBolts}
                    onChange={(e) => handleInputChange('numberOfBolts', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-2">
                    Connection Type
                  </label>
                  <select
                    value={inputs.connectionType}
                    onChange={(e) => handleInputChange('connectionType', e.target.value)}
                    className="input-field"
                  >
                    <option value="bearing">Bearing Type</option>
                    <option value="slip-resistant">Slip-Resistant</option>
                    <option value="tension">Tension</option>
                  </select>
                </div>
              </div>

              {/* Geometric Properties */}
              <div className="space-y-4">
                <h3 className="font-semibold text-steel-800 text-lg mb-4 pb-2 border-b border-steel-200">
                  Geometric Properties
                </h3>

                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-2">
                    Pitch (mm)
                  </label>
                  <input
                    type="number"
                    value={inputs.pitch}
                    onChange={(e) => handleInputChange('pitch', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-2">
                    Edge Distance (mm)
                  </label>
                  <input
                    type="number"
                    value={inputs.edgeDistance}
                    onChange={(e) => handleInputChange('edgeDistance', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-2">
                    Gauge (mm)
                  </label>
                  <input
                    type="number"
                    value={inputs.gauge}
                    onChange={(e) => handleInputChange('gauge', e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-2">
                    Plate Thickness (mm)
                  </label>
                  <input
                    type="number"
                    value={inputs.plateThickness}
                    onChange={(e) => handleInputChange('plateThickness', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Material & Loading */}
              <div className="md:col-span-2 grid md:grid-cols-2 gap-6 pt-4 border-t border-steel-200">
                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-2">
                    Plate Material
                  </label>
                  <select
                    value={inputs.plateMaterial}
                    onChange={(e) => handleInputChange('plateMaterial', e.target.value)}
                    className="input-field"
                  >
                    <option value="S275">S275</option>
                    <option value="S355">S355</option>
                    <option value="S235">S235</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-steel-700 mb-2">
                    Applied Load (kN)
                  </label>
                  <input
                    type="number"
                    value={inputs.appliedLoad}
                    onChange={(e) => handleInputChange('appliedLoad', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={isProcessing}
              className="btn-primary w-full mt-8 py-4 text-lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  {processingStep}
                </>
              ) : (
                <>
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Block Shear Capacity
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyzePage;
