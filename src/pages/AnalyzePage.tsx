import {
  Calculator,
  FileText,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  Upload,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockAIParse, mockCalculate } from "../data/mockData";
import type { ConnectionInputs } from "../types";

type InputMode = "manual" | "text" | "image";

const AnalyzePage: React.FC = () => {
  const navigate = useNavigate();
  const [inputMode, setInputMode] = useState<InputMode>("manual");
  const [questionText, setQuestionText] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>("");

  const [inputs, setInputs] = useState<ConnectionInputs>({
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

  const handleInputChange = (
    field: keyof ConnectionInputs,
    value: string | number,
  ): void => {
    setInputs((prev) => ({
      ...prev,
      [field]:
        typeof value === "string" && !isNaN(Number(value))
          ? parseFloat(value)
          : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleAIExtraction = async (): Promise<void> => {
    setIsProcessing(true);
    setProcessingStep("Reading question...");

    await new Promise((resolve) => setTimeout(resolve, 800));
    setProcessingStep("Extracting parameters...");

    const extracted = await mockAIParse(questionText);

    setProcessingStep("Parameters extracted!");
    await new Promise((resolve) => setTimeout(resolve, 500));

    setInputs(extracted);
    setInputMode("manual");
    setIsProcessing(false);
  };

  const handleCalculate = async (): Promise<void> => {
    setIsProcessing(true);
    setProcessingStep("Running block shear analysis...");

    const result = await mockCalculate(inputs);

    setProcessingStep("Complete!");
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Navigate to results page with data
    navigate("/results", { state: { inputs, result } });
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Block Shear Analysis
          </h1>
          <p className="text-lg text-white/70">
            Enter connection parameters manually or let AI extract them from
            your question
          </p>
        </div>

        {/* Input Mode Selector */}
        <div className="card p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Input Method</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Input Method Cards */}
            <button
              onClick={() => setInputMode("manual")}
              className={`p-6 rounded-xl border transition-all ${
                inputMode === "manual"
                  ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              <Calculator
                className={`w-8 h-8 mb-3 ${inputMode === "manual" ? "text-cyan-400" : "text-white/40"}`}
              />
              <h3 className="font-semibold text-white mb-1">Manual Input</h3>
              <p className="text-sm text-white/50">Enter parameters directly</p>
            </button>

            <button
              onClick={() => setInputMode("text")}
              className={`p-6 rounded-xl border transition-all ${
                inputMode === "text"
                  ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              <FileText
                className={`w-8 h-8 mb-3 ${inputMode === "text" ? "text-cyan-400" : "text-white/40"}`}
              />
              <h3 className="font-semibold text-white mb-1">Text Question</h3>
              <p className="text-sm text-white/50">AI extracts parameters</p>
            </button>

            <button
              onClick={() => setInputMode("image")}
              className={`p-6 rounded-xl border transition-all ${
                inputMode === "image"
                  ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              <ImageIcon
                className={`w-8 h-8 mb-3 ${inputMode === "image" ? "text-cyan-400" : "text-white/40"}`}
              />
              <h3 className="font-semibold text-white mb-1">Image Upload</h3>
              <p className="text-sm text-white/50">Upload question image</p>
            </button>
          </div>
        </div>

        {/* Text Question Input */}
        {inputMode === "text" && (
          <div className="card p-6 mb-8 animate-fade-in">
            <label className="block mb-3 font-semibold text-white">
              Paste Your Question
            </label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Example: A double angle connection with 4 x M20 Grade 8.8 bolts..."
              className="input-field min-h-[150px] resize-y bg-white/5 border-white/10 text-white placeholder-white/30 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
            <button
              onClick={handleAIExtraction}
              disabled={!questionText || isProcessing}
              className="btn-primary mt-4 w-full md:w-auto shadow-[0_0_15px_rgba(168,85,247,0.4)]"
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
        {inputMode === "image" && (
          <div className="card p-6 mb-8 animate-fade-in">
            <label className="block mb-3 font-semibold text-white">
              Upload Question Image
            </label>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-cyan-400 hover:bg-white/5 transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/70 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-white/40">
                  PNG, JPG, or PDF up to 10MB
                </p>
              </label>
              {imageFile && (
                <div className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-green-400 font-medium">
                    ✓ {imageFile.name}
                  </p>
                </div>
              )}
            </div>
            {imageFile && (
              <button
                onClick={handleAIExtraction}
                disabled={isProcessing}
                className="btn-primary mt-4 w-full md:w-auto shadow-[0_0_15px_rgba(168,85,247,0.4)]"
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

        {/* Form Section Redesign */}
        {inputMode === "manual" && (
          <div className="card p-8 mb-8 animate-fade-in bg-white/5 border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Connection Parameters
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Bolt Properties */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white/90 text-lg mb-4 pb-2 border-b border-white/10">
                  Bolt Properties
                </h3>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Bolt Grade
                  </label>
                  <select
                    value={inputs.boltGrade}
                    onChange={(e) =>
                      handleInputChange("boltGrade", e.target.value)
                    }
                    className="input-field bg-[#0A0A0F] border-white/20 text-white focus:border-cyan-400"
                  >
                    <option value="4.6">Grade 4.6</option>
                    <option value="8.8">Grade 8.8</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Bolt Diameter (mm)
                  </label>
                  <input
                    type="number"
                    value={inputs.boltDiameter}
                    onChange={(e) =>
                      handleInputChange("boltDiameter", e.target.value)
                    }
                    className="input-field bg-white/5 border-white/20 text-white focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Number of Bolts
                  </label>
                  <input
                    type="number"
                    value={inputs.numberOfBolts}
                    onChange={(e) =>
                      handleInputChange("numberOfBolts", e.target.value)
                    }
                    className="input-field bg-white/5 border-white/20 text-white focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Connection Type
                  </label>
                  <select
                    value={inputs.connectionType}
                    onChange={(e) =>
                      handleInputChange("connectionType", e.target.value)
                    }
                    className="input-field bg-[#0A0A0F] border-white/20 text-white focus:border-cyan-400"
                  >
                    <option value="bearing">Bearing Type</option>
                    <option value="slip-resistant">Slip-Resistant</option>
                    <option value="tension">Tension</option>
                  </select>
                </div>
              </div>

              {/* Geometric Properties */}
              <div className="space-y-4">
                <h3 className="font-semibold text-white/90 text-lg mb-4 pb-2 border-b border-white/10">
                  Geometric Properties
                </h3>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Pitch (mm)
                  </label>
                  <input
                    type="number"
                    value={inputs.pitch}
                    onChange={(e) => handleInputChange("pitch", e.target.value)}
                    className="input-field bg-white/5 border-white/20 text-white focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Edge Distance (mm)
                  </label>
                  <input
                    type="number"
                    value={inputs.edgeDistance}
                    onChange={(e) =>
                      handleInputChange("edgeDistance", e.target.value)
                    }
                    className="input-field bg-white/5 border-white/20 text-white focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Gauge (mm)
                  </label>
                  <input
                    type="number"
                    value={inputs.gauge}
                    onChange={(e) => handleInputChange("gauge", e.target.value)}
                    className="input-field bg-white/5 border-white/20 text-white focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Plate Thickness (mm)
                  </label>
                  <input
                    type="number"
                    value={inputs.plateThickness}
                    onChange={(e) =>
                      handleInputChange("plateThickness", e.target.value)
                    }
                    className="input-field bg-white/5 border-white/20 text-white focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Material & Loading */}
              <div className="md:col-span-2 grid md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Plate Material
                  </label>
                  <select
                    value={inputs.plateMaterial}
                    onChange={(e) =>
                      handleInputChange("plateMaterial", e.target.value)
                    }
                    className="input-field bg-[#0A0A0F] border-white/20 text-white focus:border-cyan-400"
                  >
                    <option value="S275">S275</option>
                    <option value="S355">S355</option>
                    <option value="S235">S235</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Applied Load (kN)
                  </label>
                  <input
                    type="number"
                    value={inputs.appliedLoad}
                    onChange={(e) =>
                      handleInputChange("appliedLoad", e.target.value)
                    }
                    className="input-field bg-white/5 border-white/20 text-white focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={isProcessing}
              className="btn-primary w-full mt-8 py-4 text-lg font-bold flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  {processingStep}
                </>
              ) : (
                <>
                  <Calculator className="w-6 h-6" />
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
