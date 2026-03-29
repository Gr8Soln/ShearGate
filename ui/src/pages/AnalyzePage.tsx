import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useAuth } from "../contexts/AuthContext";

type InputMode = "manual" | "text" | "image";

const AnalyzePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const [inputMode, setInputMode] = useState<InputMode>("manual");
  const [questionText, setQuestionText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  // Current active session ID
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

  // Handle manual input changes
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
      // Calculate on frontend (Source of Truth)
      const result = calculateBlockShear(inputs);
      
      // Navigate to results page
      // We pass the result and inputs in state for immediate display, 
      // but also the sessionId for history/AI interaction.
      navigate(`/results/${sid || "temporary"}`, { 
        state: { 
          inputs, 
          result,
          fromExtraction: inputMode !== "manual"
        } 
      });
    } catch (err) {
      console.error("Calculation failed", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#e8a020]/10 border border-[#e8a020]/20 text-[#e8a020] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={14} />
          <span>AI-Powered Engineering</span>
        </div>
        <h1 className="text-5xl font-extrabold text-white tracking-tight">
          New Analysis
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto line-clamp-2">
          Start a block shear analysis by entering parameters or uploading your 
          connection design question.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Input Method Selector (Left Col on Desktop) */}
        <div className="lg:col-span-4 space-y-4">
          <InputMethodCard
            mode="manual"
            active={inputMode === "manual"}
            icon={<Calculator className={inputMode === 'manual' ? 'text-[#e8a020]' : 'text-slate-500'} size={24} />}
            title="Manual Entry"
            description="Enter detailed parameters"
            onClick={() => setInputMode("manual")}
          />
          <InputMethodCard
            mode="text"
            active={inputMode === "text"}
            icon={<FileText className={inputMode === 'text' ? 'text-[#e8a020]' : 'text-slate-500'} size={24} />}
            title="Text Description"
            description="Paste problem text"
            onClick={() => setInputMode("text")}
          />
          <InputMethodCard
            mode="image"
            active={inputMode === "image"}
            icon={<ImageIcon className={inputMode === 'image' ? 'text-[#e8a020]' : 'text-slate-500'} size={24} />}
            title="Image/PDF Scan"
            description="Upload design sketches"
            onClick={() => setInputMode("image")}
          />
        </div>

        {/* Main Workspace (Right Col on Desktop) */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          {error && (
            <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-2xl flex items-center space-x-3 text-red-400 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* AI Text Mode */}
          {inputMode === "text" && (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2rem] shadow-2xl animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold text-white mb-4">Paste Your Question</h2>
              <textarea
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Example: A bearing type connection with 4 x M20 Grade 8.8 bolts on S275 plate of 12mm thickness. Edge distance is 50mm, pitch 70mm..."
                className="w-full h-48 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-[#e8a020] transition-colors"
              />
              <button
                onClick={handleAIExtraction}
                disabled={!questionText || isProcessing}
                className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-[#e8a020] to-[#f59e0b] text-[#0f172a] font-bold text-lg flex items-center justify-center space-x-2 shadow-lg shadow-[#e8a020]/10 hover:shadow-[#e8a020]/20 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isProcessing ? (
                  <><Loader2 className="animate-spin" size={20} /><span>{processingStep}</span></>
                ) : (
                  <><Sparkles size={20} /><span>Extract with Gemini AI</span></>
                )}
              </button>
            </div>
          )}

          {/* AI Image Mode */}
          {inputMode === "image" && (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2rem] shadow-2xl animate-in fade-in slide-in-from-right-4">
              <h2 className="text-xl font-bold text-white mb-4">Upload Design Question</h2>
              <div className="border-2 border-dashed border-slate-800 rounded-[2rem] p-12 text-center hover:border-[#e8a020]/50 transition-colors group">
                <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} accept="image/*,.pdf" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mx-auto mb-4 text-slate-600 group-hover:text-[#e8a020] transition-colors" size={48} />
                  <p className="text-slate-400 mb-1 group-hover:text-slate-200">
                    {file ? file.name : "Select an image or PDF file"}
                  </p>
                  <p className="text-xs text-slate-600">Max size 20MB</p>
                </label>
              </div>
              <button
                onClick={handleAIExtraction}
                disabled={!file || isProcessing}
                className="w-full mt-6 py-4 rounded-2xl bg-gradient-to-r from-[#e8a020] to-[#f59e0b] text-[#0f172a] font-bold text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <><Loader2 className="animate-spin" size={20} /><span>{processingStep}</span></>
                ) : (
                  <><Sparkles size={20} /><span>Extract from File</span></>
                )}
              </button>
            </div>
          )}

          {/* Manual Entry Form */}
          {inputMode === "manual" && (
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2rem] shadow-2xl animate-in fade-in slide-in-from-bottom-4">
              <form className="space-y-10" onSubmit={e => { e.preventDefault(); handleCalculate(); }}>
                <div className="grid md:grid-cols-2 gap-10">
                  {/* Bolt Specs */}
                  <div className="space-y-6">
                    <SectionTitle title="Bolt Specifications" />
                    <div className="space-y-4">
                      <FormSelect label="Bolt Grade" value={inputs.boltGrade || "8.8"} options={["4.6", "8.8"]} onChange={v => handleInputChange("boltGrade", v)} />
                      <FormField label="Bolt Diameter (d)" unit="mm" value={inputs.boltDiameter || 0} onChange={v => handleInputChange("boltDiameter", v)} />
                      <FormField label="Number of Bolts" unit="qty" value={inputs.numberOfBolts || 0} onChange={v => handleInputChange("numberOfBolts", v)} />
                      <FormSelect label="Connection Type" value={inputs.connectionType || "bearing"} options={["bearing", "slip-resistant"]} onChange={v => handleInputChange("connectionType", v)} />
                    </div>
                  </div>

                  {/* Geometric Config */}
                  <div className="space-y-6">
                    <SectionTitle title="Connection Geometry" />
                    <div className="space-y-4">
                      <FormField label="Bolt Pitch (p)" unit="mm" value={inputs.pitch || 0} onChange={v => handleInputChange("pitch", v)} />
                      <FormField label="Gauge Spacing (g)" unit="mm" value={inputs.gauge || 0} onChange={v => handleInputChange("gauge", v)} />
                      <FormField label="Edge Distance (e1/e2)" unit="mm" value={inputs.edgeDistance || 0} onChange={v => handleInputChange("edgeDistance", v)} />
                      <FormField label="End Distance" unit="mm" value={inputs.endDistance || 0} onChange={v => handleInputChange("endDistance", v)} />
                    </div>
                  </div>

                  {/* Plate Config */}
                  <div className="space-y-6 md:col-span-2">
                    <SectionTitle title="Material & Loading" />
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormSelect label="Steel Grade" value={inputs.plateMaterial || "S275"} options={["S275", "S355"]} onChange={v => handleInputChange("plateMaterial", v)} />
                      <FormField label="Plate Thickness (t)" unit="mm" value={inputs.plateThickness || 0} onChange={v => handleInputChange("plateThickness", v)} />
                      <div className="md:col-span-2">
                        <FormField label="Applied Load (Pknd)" unit="kN" value={inputs.appliedLoad || 0} onChange={v => handleInputChange("appliedLoad", v)} highlight />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-5 rounded-[2rem] bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xl flex items-center justify-center space-x-3 shadow-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Calculator size={24} />
                  <span>Analyze Connection</span>
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Child Components ---

const InputMethodCard: React.FC<{ mode: string, active: boolean, icon: React.ReactNode, title: string, description: string, onClick: () => void }> = ({ active, icon, title, description, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-4 p-5 rounded-[2rem] border transition-all duration-300 text-left ${
      active 
        ? "bg-[#e8a020]/10 border-[#e8a020] shadow-lg shadow-[#e8a020]/5 translate-x-1" 
        : "bg-slate-900 shadow-xl border-slate-800 hover:border-[#e8a020]/30 hover:bg-slate-800/50"
    }`}
  >
    <div className={`p-4 rounded-2xl ${active ? "bg-[#e8a020]/10" : "bg-slate-800"} transition-colors`}>
      {icon}
    </div>
    <div>
      <h3 className={`font-bold transition-colors ${active ? "text-[#e8a020]" : "text-slate-200"}`}>{title}</h3>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  </button>
);

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center space-x-3 mb-4">
    <div className="w-1.5 h-6 bg-[#e8a020] rounded-full" />
    <h3 className="text-lg font-bold text-white/90">{title}</h3>
  </div>
);

const FormField: React.FC<{ label: string, unit: string, value: any, onChange: (v: string) => void, highlight?: boolean }> = ({ label, unit, value, onChange, highlight }) => (
  <div className={highlight ? "bg-[#e8a020]/5 p-4 rounded-2xl border border-[#e8a020]/10" : ""}>
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">{label}</label>
    <div className="relative group">
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-mono transition-colors focus:outline-none focus:border-[#e8a020]/50 ${highlight ? "text-[#e8a020] border-[#e8a020]/20" : ""}`}
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-600 uppercase">{unit}</span>
    </div>
  </div>
);

const FormSelect: React.FC<{ label: string, value: string, options: string[], onChange: (v: string) => void }> = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-bold transition-colors focus:outline-none focus:border-[#e8a020]/50"
    >
      {options.map(opt => <option key={opt} value={opt}>{opt.startsWith('S') || opt.includes('.') ? opt : opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
    </select>
  </div>
);

export default AnalyzePage;
