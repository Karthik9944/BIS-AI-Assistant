"use client";

import React, { useState } from "react";
import { useAuth, DEMO_ACCOUNTS } from "@/lib/auth-context";
import { UserRole } from "@/types/auth";
import {
  X,
  Shield,
  Building,
  UserCheck,
  Sparkles,
  ArrowRight,
  Mail,
  Lock,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  BadgeCheck,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  requiredRole?: UserRole;
  initialMessage?: string;
}

export function AuthModal({ isOpen, onClose, onSuccess, requiredRole, initialMessage }: AuthModalProps) {
  const { user, loginWithDemo, login, register, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"demo" | "custom">("demo");
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>(requiredRole || "citizen");
  const [organization, setOrganization] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (isRegister) {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }
      await register(name, email, selectedRole, organization);
    } else {
      await login(email, password);
    }
    if (onSuccess) onSuccess();
    onClose();
  };

  const handleQuickLogin = (role: UserRole) => {
    loginWithDemo(role);
    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">

        {/* Modal Header */}
        <div className="px-6 pt-5 pb-3 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
                BIS Sahayak Auth
              </span>
              {requiredRole === "admin" && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Officer Privileges Required
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mt-1">
              {user ? "Your Profile & Credentials" : "Sign In to BIS Sahayak"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {initialMessage || "Access regulatory compliance tools, live verification, and admin telemetry."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* If already logged in */}
        {user ? (
          <div className="p-6 space-y-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-sm ${
                    user.role === "admin"
                      ? "bg-gradient-to-br from-amber-600 to-amber-700"
                      : user.role === "manufacturer"
                      ? "bg-gradient-to-br from-indigo-600 to-indigo-700"
                      : "bg-gradient-to-br from-emerald-600 to-emerald-700"
                  }`}>
                    {user.role === "admin" ? <Shield size={22} /> : user.role === "manufacturer" ? <Building size={22} /> : <UserCheck size={22} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{user.name}</h4>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${
                  user.role === "admin"
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : user.role === "manufacturer"
                    ? "bg-indigo-100 text-indigo-900 border border-indigo-300"
                    : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                }`}>
                  {user.role}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200/80 text-xs text-slate-600 space-y-1">
                {user.organization && (
                  <p><span className="font-semibold text-slate-700">Organization:</span> {user.organization}</p>
                )}
                {user.udyamNumber && (
                  <p><span className="font-semibold text-slate-700">Udyam No:</span> <code className="bg-slate-200/70 px-1 py-0.5 rounded text-[11px] font-mono">{user.udyamNumber}</code></p>
                )}
                {user.officerBadgeId && (
                  <p><span className="font-semibold text-slate-700">Badge ID:</span> <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded text-[11px] font-mono">{user.officerBadgeId}</code></p>
                )}
              </div>
            </div>

            {/* Quick Switch Roles */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Switch Role for Testing:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(["citizen", "manufacturer", "admin"] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleQuickLogin(r)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      user.role === r
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-sm"
                        : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {r === "citizen" ? "Citizen" : r === "manufacturer" ? "MSME" : "BIS Admin"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-colors"
              >
                Continue as {user.name.split(" ")[0]}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 pt-3 space-y-4">
            {/* Mode Tabs */}
            <div className="flex p-1 bg-slate-100 rounded-2xl">
              <button
                onClick={() => setActiveTab("demo")}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "demo"
                    ? "bg-white text-indigo-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Sparkles size={14} className="text-amber-500" />
                <span>1-Click Demo Profiles</span>
              </button>
              <button
                onClick={() => setActiveTab("custom")}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "custom"
                    ? "bg-white text-indigo-950 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Mail size={14} className="text-indigo-600" />
                <span>Custom Sign In</span>
              </button>
            </div>

            {/* TAB 1: 1-Click Demo Profiles */}
            {activeTab === "demo" && (
              <div className="space-y-2.5">
                <p className="text-[11px] text-slate-500">
                  Select a persona below to experience role-tailored capabilities without typing credentials:
                </p>

                {(Object.entries(DEMO_ACCOUNTS) as [UserRole, typeof DEMO_ACCOUNTS[UserRole]][]).map(([roleKey, acc]) => {
                  const isMatchRequired = requiredRole && requiredRole === roleKey;
                  return (
                    <button
                      key={roleKey}
                      onClick={() => handleQuickLogin(roleKey)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between group ${
                        isMatchRequired
                          ? "bg-amber-50/70 border-amber-300 ring-2 ring-amber-200 shadow-sm"
                          : "bg-white hover:bg-slate-50 border-slate-200 shadow-xs"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-xs ${
                          roleKey === "admin"
                            ? "bg-gradient-to-br from-amber-600 to-amber-700"
                            : roleKey === "manufacturer"
                            ? "bg-gradient-to-br from-indigo-600 to-indigo-700"
                            : "bg-gradient-to-br from-emerald-600 to-emerald-700"
                        }`}>
                          {roleKey === "admin" ? <Shield size={18} /> : roleKey === "manufacturer" ? <Building size={18} /> : <UserCheck size={18} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-xs group-hover:text-indigo-950">
                              {acc.name}
                            </span>
                            <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              {acc.badge}
                            </span>
                            {isMatchRequired && (
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                                Required for this tab
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">{acc.organization}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{acc.description}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors">
                        <ArrowRight size={14} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* TAB 2: Custom Sign In / Register */}
            {activeTab === "custom" && (
              <form onSubmit={handleCustomSubmit} className="space-y-3">
                {error && (
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle size={14} className="flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {isRegister && (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                    <div className="relative">
                      <UserIcon size={14} className="absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com or officer@bis.gov.in"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Password</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                </div>

                {isRegister && (
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Select Persona / Role</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["citizen", "manufacturer", "admin"] as UserRole[]).map((r) => (
                        <button
                          type="button"
                          key={r}
                          onClick={() => setSelectedRole(r)}
                          className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                            selectedRole === r
                              ? "bg-indigo-600 text-white border-indigo-700"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {r === "citizen" ? "Citizen" : r === "manufacturer" ? "MSME Mfg" : "BIS Officer"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-900 hover:bg-indigo-950 text-white font-bold text-xs shadow-md transition-all mt-2"
                >
                  {isRegister ? "Create Account & Sign In" : "Sign In with Credentials"}
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegister(!isRegister);
                      setError(null);
                    }}
                    className="text-xs text-indigo-700 hover:underline font-semibold"
                  >
                    {isRegister ? "Already have an account? Sign In" : "Need an account? Register here"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
