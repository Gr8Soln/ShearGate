import { GoogleLogin } from "@react-oauth/google";
import { Calculator, Globe, Loader2, ShieldCheck, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const AuthPage: React.FC = () => {
  const { loginWithGoogle, isAuthenticated, isLoading, isAuthActionLoading } =
    useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [googleButtonWidth, setGoogleButtonWidth] = useState(320);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const from = (location.state as any)?.from?.pathname || "/analyze";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location]);

  useEffect(() => {
    const setResponsiveWidth = () => {
      const maxWidth = 360;
      const mobileSafeWidth = window.innerWidth - 88;
      setGoogleButtonWidth(Math.min(maxWidth, Math.max(220, mobileSafeWidth)));
    };

    setResponsiveWidth();
    window.addEventListener("resize", setResponsiveWidth);
    return () => window.removeEventListener("resize", setResponsiveWidth);
  }, []);

  const handleSuccess = async (response: any) => {
    if (response.credential) {
      try {
        setLoginError(null);
        await loginWithGoogle(response.credential);
      } catch (error) {
        console.error("Google Login Error:", error);
        setLoginError(
          "Sign-in failed. Please verify server configuration and try again.",
        );
      }
    }
  };

  const handleError = () => {
    console.error("Google Login Failed");
    setLoginError("Google sign-in was cancelled or blocked.");
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#e8a020]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="max-w-md w-full relative">
        {/* Logo & Branding */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#e8a020] to-[#f59e0b] rounded-3xl shadow-2xl shadow-[#e8a020]/30 mb-5 sm:mb-6 transform hover:rotate-6 transition-transform">
            <Calculator size={40} className="text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Welcome back
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            Sign in to start your engineering analysis
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-5 sm:p-8 rounded-[2rem] shadow-2xl relative">
          <div className="space-y-6">
            <div className="flex justify-center py-4">
              <div className="relative w-full max-w-[360px]">
                <div
                  className={
                    isAuthActionLoading ? "opacity-50 pointer-events-none" : ""
                  }
                >
                  <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={handleError}
                    theme="filled_blue"
                    shape="pill"
                    size="large"
                    text="continue_with"
                    width={`${googleButtonWidth}`}
                  />
                </div>

                {isAuthActionLoading && (
                  <div className="absolute inset-0 rounded-full bg-[#0b1220]/80 border border-white/10 flex items-center justify-center gap-2 text-sm text-slate-200 font-bold">
                    <Loader2 className="animate-spin" size={16} />
                    <span>Signing in...</span>
                  </div>
                )}
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-red-400 text-center font-semibold">
                {loginError}
              </p>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0f172a] px-2 text-slate-500">
                  Secure Access Only
                </span>
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

const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
}> = ({ icon, title, desc }) => (
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
