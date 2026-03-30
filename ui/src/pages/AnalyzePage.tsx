import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  FileText,
  Image as ImageIcon,
  Loader2,
  Sparkles,
  Upload,
  ArrowRight,
  AlertCircle
} from "lucide-react";
import { extractApi, sessionApi } from "../api/client";
import { calculateBlockShear } from "../utils/calculations";
import type { ConnectionInputs } from "../types";

type InputMode = "manual" | "text" | "image";

const AnalyzePage: React.FC = () => {
  const navigate = useNavigate();
  
  const [inputMode, setInputMode] = useState<InputMode>("manual");
  const [questionText, setQuestionText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

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

  const handleInputChange = (field: keyof ConnectionInputs, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: typeof value === 'string' && !isNaN(Number(value)) ? parseFloat(value) : value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  const ensureSession = async () => {
    if (sessionId) return sessionId;
    try {
      const newSession = await sessionApi.create(`Analysis: ${new Date().toLocaleDateString()}`);
      setSessionId(newSession.id);
      return newSession.id;
    } catch (err) {
      console.error("Failed to create session", err);
      return null;
    }
  };

  const handleAIExtraction = async () => {
    setIsProcessing(true);
    setError(null);
    setProcessingStep("Contacting Gemini AI...");

    try {
      const sid = await ensureSession();
      setProcessingStep("Extracting parameters...");
      
      let extractedData;
      if (inputMode === "text") {
        extractedData = await extractApi.extractText(questionText, sid || undefined);
      } else if (file) {
        extractedData = await extractApi.extractFile(file, sid || undefined);
      }

      if (extractedData) {
        setInputs(prev => ({ ...prev, ...extractedData.input_parsed }));
        setInputMode("manual");
        setProcessingStep("Extraction complete!");
        setTimeout(() => setIsProcessing(false), 800);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "AI Extraction failed. Please try manual entry.");
      setIsProcessing(false);
    }
  };

  const handleCalculate = async () => {
    setIsProcessing(true);
    setProcessingStep("Finalizing analysis...");

    try {
      const sid = await ensureSession();
      const result = calculateBlockShear(inputs);
      navigate(`/results/${sid || "temporary"}`, { 
        state: { inputs, result, fromExtraction: inputMode !== "manual" } 
      });
    } catch (err) {
      console.error("Calculation failed", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 max-w-6xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center">
          <span className="badge-glow">AI-Powered Engineering</span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight leading-none">New Analysis</h1>
        <p className="text-slate-500 font-medium max-w-2xl">
          Start a block shear analysis by entering parameters manually or uploading your connection design question.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Method Selector */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28">
          <InputMethodCard
            active={inputMode === "manual"}
            icon={<Calculator className={inputMode === 'manual' ? 'text-[#e8a020]' : 'text-slate-500'} size={20} />}
            title="Manual Entry"
            description="Enter detailed parameters"
            onClick={() => setInputMode("manual")}
          />
          <InputMethodCard
            active={inputMode === "text"}
            icon={<FileText className={inputMode === 'text' ? 'text-[#e8a020]' : 'text-slate-500'} size={20} />}
            title="Text Description"
            description="Paste problem text"
            onClick={() => setInputMode("text")}
          />
          <InputMethodCard
            active={inputMode === "image"}
            icon={<ImageIcon className={inputMode === 'image' ? 'text-[#e8a020]' : 'text-slate-500'} size={20} />}
            title="Image/PDF Scan"
            description="Upload design sketches"
            onClick={() => setInputMode("image")}
          />
        </div>

        {/* Main Workspace */}
        <div className="lg:col-span-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-400/5 border border-red-400/10 rounded-xl flex items-center space-x-3 text-red-500 animate-fade-in">
              <AlertCircle size={18} />
              <p className="text-sm font-bold uppercase tracking-tight">{error}</p>
            </div>
          )}

          {/* AI Text Mode */}
          {inputMode === "text" && (
            <div className="card-premium p-10 space-y-6 animate-fade-in">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8a020]/10 flex items-center justify-center text-[#e8a020] border border-[#e8a020]/20">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Paste Problem Text</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">AI Extraction Engine</p>
                </div>
              </div>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Example: A bearing type connection with 4 x M20 Grade 8.8 bolts on S275 plate of 12mm thickness..."
                className="input-field h-40 resize-none font-medium leading-relaxed"
              />
              <button
                onClick={handleAIExtraction}
                disabled={!questionText || isProcessing}
                className="btn-primary w-full py-4 flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <><Loader2 className="animate-spin" size={18} /><span>{processingStep}</span></>
                ) : (
                  <><Sparkles size={18} /><span>Extract with Gemini AI</span></>
                )}
              </button>
            </div>
          )}

          {/* AI Image Mode */}
          {inputMode === "image" && (
            <div className="card-premium p-10 space-y-6 animate-fade-in">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#e8a020]/10 flex items-center justify-center text-[#e8a020] border border-[#e8a020]/20">
                  <Upload size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Upload Sketch</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Vision Analysis System</p>
                </div>
              </div>
              <div className="border-2 border-dashed border-white/5 rounded-2xl p-12 text-center hover:border-[#e8a020]/30 transition-all group bg-black/20">
                <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} accept="image/*,.pdf" />
                <label htmlFor="file-upload" className="cursor-pointer block space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto group-hover:bg-[#e8a020]/10 group-hover:text-[#e8a020] transition-all">
                    <Upload size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold">
                      {file ? file.name : "Choose an image or PDF"}
                    </p>
                    <p className="text-xs text-slate-600 font-medium">Drag & drop or click to browse</p>
                  </div>
                </label>
              </div>
              <button
                onClick={handleAIExtraction}
                disabled={!file || isProcessing}
                className="btn-primary w-full py-4 flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <><Loader2 className="animate-spin" size={18} /><span>{processingStep}</span></>
                ) : (
                  <><Sparkles size={18} /><span>Analyze Source File</span></>
                )}
              </button>
            </div>
          )}

          {/* Manual Entry Form */}
          {inputMode === "manual" && (
            <div className="card-premium p-10 animate-fade-in">
              <form className="space-y-12" onSubmit={e => { e.preventDefault(); handleCalculate(); }}>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                  {/* Bolt Specs */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-4 bg-[#e8a020] rounded-full" />
                      <h3 className="text-lg font-black text-white">Bolt Specifications</h3>
                    </div>
                    <div className="space-y-5">
                      <FormSelect label="Bolt Grade" value={inputs.boltGrade || "8.8"} options={["4.6", "8.8"]} onChange={v => handleInputChange("boltGrade", v)} />
                      <FormField label="Bolt Diameter (d)" unit="mm" value={inputs.boltDiameter || 0} onChange={v => handleInputChange("boltDiameter", v)} />
                      <FormField label="Number of Bolts" unit="qty" value={inputs.numberOfBolts || 0} onChange={v => handleInputChange("numberOfBolts", v)} />
                      <FormSelect label="Connection Type" value={inputs.connectionType || "bearing"} options={["bearing", "slip-resistant"]} onChange={v => handleInputChange("connectionType", v)} />
                    </div>
                  </div>

                  {/* Geometric Config */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-4 bg-[#e8a020] rounded-full" />
                      <h3 className="text-lg font-black text-white">Connection Geometry</h3>
                    </div>
                    <div className="space-y-5">
                      <FormField label="Bolt Pitch (p)" unit="mm" value={inputs.pitch || 0} onChange={v => handleInputChange("pitch", v)} />
                      <FormField label="Gauge Spacing (g)" unit="mm" value={inputs.gauge || 0} onChange={v => handleInputChange("gauge", v)} />
                      <FormField label="Edge Distance (e2)" unit="mm" value={inputs.edgeDistance || 0} onChange={v => handleInputChange("edgeDistance", v)} />
                      <FormField label="End Distance (e1)" unit="mm" value={inputs.endDistance || 0} onChange={v => handleInputChange("endDistance", v)} />
                    </div>
                  </div>

                  {/* Plate Config */}
                  <div className="md:col-span-2 space-y-6 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-4 bg-[#e8a020] rounded-full" />
                      <h3 className="text-lg font-black text-white">Material & Loading</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      <FormSelect label="Steel Grade" value={inputs.plateMaterial || "S275"} options={["S275", "S355"]} onChange={v => handleInputChange("plateMaterial", v)} />
                      <FormField label="Plate Thickness (t)" unit="mm" value={inputs.plateThickness || 0} onChange={v => handleInputChange("plateThickness", v)} />
                      <FormField label="Applied Load (Pknd)" unit="kN" value={inputs.appliedLoad || 0} onChange={v => handleInputChange("appliedLoad", v)} highlight />
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-4 transition-all"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={24} />
                        <span>{processingStep || "Running analysis..."}</span>
                      </>
                    ) : (
                      <>
                        <Calculator size={24} />
                        <span>Run Analysis</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] text-center mt-6">
                    Source: BS 5950-1:2000 Structural Use of Steelwork
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InputMethodCard: React.FC<{ active: boolean, icon: React.ReactNode, title: string, description: string, onClick: () => void }> = ({ active, icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-4 p-5 rounded-xl border transition-all text-left ${
      active 
        ? "bg-[#e8a020]/10 border-[#e8a020]/30 text-white shadow-xl shadow-[#e8a020]/5" 
        : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/[0.08] hover:border-white/10"
    }`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${active ? "bg-[#e8a020]/10 text-[#e8a020]" : "bg-black/30"}`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className={`font-black text-sm transition-colors ${active ? "text-[#e8a020]" : "text-slate-300"}`}>{title}</h3>
      <p className="text-[0.65rem] font-bold text-slate-600 uppercase tracking-widest mt-0.5">{description}</p>
    </div>
  </button>
);

const FormField: React.FC<{ label: string, unit: string, value: any, onChange: (v: string) => void, highlight?: boolean }> = ({ label, unit, value, onChange, highlight }) => (
  <div className="space-y-1.5 flex-1">
    <label className="block text-[10px] font-black text-slate-600 uppercase tracking-[0.15em] ml-1">{label}</label>
    <div className="relative group">
      <input
        type="number"
        step="any"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`input-field pr-12 font-mono text-sm ${highlight ? "border-[#e8a020]/30 text-[#e8a020] bg-[#e8a020]/5" : ""}`}
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-700 uppercase">{unit}</span>
    </div>
  </div>
);

const FormSelect: React.FC<{ label: string, value: string, options: string[], onChange: (v: string) => void }> = ({ label, value, options, onChange }) => (
  <div className="space-y-1.5 flex-1">
    <label className="block text-[10px] font-black text-slate-600 uppercase tracking-[0.15em] ml-1">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="input-field font-black text-xs appearance-none cursor-pointer"
    >
      {options.map(opt => <option key={opt} value={opt} className="bg-[#111418]">{opt.startsWith('S') || opt.includes('.') ? opt : opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
    </select>
  </div>
);

export default AnalyzePage;
