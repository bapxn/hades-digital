"use client";

import { useState } from "react";
import { useNavigate } from "react-router";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowUpRight, Loader2, Lock, Mail } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAction(api.adminAuth.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await login({ email, password });
      if (result.success) {
        sessionStorage.setItem("hades_admin_token", result.token);
        navigate("/admin/dashboard");
      }
    } catch {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0A09] px-6">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <span className="font-heading font-bold text-[24px] tracking-[-0.03em] text-[#F3EFE6]">
            HADES <span className="text-[#C6A66B] font-light">DIGITAL</span>
          </span>
          <p className="mt-3 text-[13px] text-[#BEB8AC]">Admin Portal</p>
        </div>

        <div className="bg-[#151310] border border-[rgba(198,166,107,0.08)] rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-lg bg-[rgba(198,166,107,0.06)] border border-[rgba(198,166,107,0.08)] flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#C6A66B]/60" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-[16px] text-[#F3EFE6]">
                Sign In
              </h2>
              <p className="text-[11px] text-[#8A8478]">
                Access the project dashboard
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8478]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@email.com"
                  className="hades-input pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-[0.15em] text-[#8A8478] mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8478]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="hades-input pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <p className="text-[13px] text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="hades-btn hades-btn-primary w-full cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-[11px] text-[#5a5650]">
          Hades Digital &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
