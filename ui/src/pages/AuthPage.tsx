import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Calculator, ShieldCheck, Zap, Globe } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const AuthPage: React.FC = () => {
  const { loginWithGoogle, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const from = (location.state as any)?.from?.pathname || "/analyze";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  const handleSuccess = async (response: any) => {
    if (response.credential) {
      try {
        await loginWithGoogle(response.credential);
      } catch (error) {
        console.error("Google Login Error:", error);
      }
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div className="min-h-[calc(100-4rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#e8a020]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="max-w-md w-full relative">
        {/* Logo & Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#e8a020] to-[#f59e0b] rounded-3xl shadow-2xl shadow-[#e8a020]/30 mb-6 transform hover:rotate-6 transition-transform">
            <Calculator size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
            Welcome back
          </h1>
          <p className="text-slate-400 text-lg">
            Sign in to start your engineering analysis
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2rem] shadow-2xl relative">
          <div className="space-y-6">
            <div className="flex justify-center py-4">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                useOneTap
                theme="filled_blue"
                shape="pill"
                size="large"
                text="continue_with"
                width="100%"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0f172a] px-2 text-slate-500">Secure Access Only</span>
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 gap-4 pt-4">
              <FeatureItem 
                icon={<ShieldCheck className="text-[#e8a020]" size={18} />} 
                title="BS 5950 Compliant" 
                desc="Verified structural calculations"
              />
              <FeatureItem 
                icon={<Zap className="text-[#e8a020]" size={18} />} 
                title="AI Extraction" 
                desc="Parse parameters using Gemini"
              />
              <FeatureItem 
                icon={<Globe className="text-[#e8a020]" size={18} />} 
                title="Cloud Sync" 
                desc="Access your history anywhere"
              />
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-slate-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
    <div className="mt-0.5 p-2 bg-slate-800 rounded-lg group-hover:bg-[#e8a020]/10 transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  </div>
);

export default AuthPage;
