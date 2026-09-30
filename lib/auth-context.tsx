"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole, DemoAccount } from "@/types/auth";

export const DEMO_ACCOUNTS: Record<UserRole, DemoAccount> = {
  citizen: {
    role: "citizen",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    title: "Consumer / Citizen",
    organization: "New Delhi Resident & Consumer Advocate",
    identifier: "Citizen ID: IND-8204",
    badge: "Consumer",
    description: "Access consumer rights, instant ISI/HUID verification, and grievance drafting.",
  },
  manufacturer: {
    role: "manufacturer",
    name: "Rajesh Patel",
    email: "rajesh@bharatquality.in",
    title: "MSME Managing Director",
    organization: "Bharat Quality Appliances & Polymers Pvt. Ltd.",
    identifier: "UDYAM-DL-02-0049281",
    badge: "MSME Industry",
    description: "Track certification journey, calculate testing subsidies, and evaluate lab parameters.",
  },
  admin: {
    role: "admin",
    name: "Dr. V. K. Ramanathan",
    email: "admin.enforcement@bis.gov.in",
    title: "Director of Standards Enforcement",
    organization: "Bureau of Indian Standards (Central HQ, New Delhi)",
    identifier: "Officer Badge: BIS-HQ-DIR-4029",
    badge: "BIS Officer",
    description: "Full regulatory privileges, live BIS standards sync, and system telemetry dashboard.",
  },
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithDemo: (role: UserRole) => void;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (name: string, email: string, role: UserRole, organization?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "bis_sahayak_user_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load user session from localStorage:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const loginWithDemo = (role: UserRole) => {
    const demo = DEMO_ACCOUNTS[role];
    const newUser: User = {
      id: `usr_${role}_${Date.now()}`,
      name: demo.name,
      email: demo.email,
      role: demo.role,
      organization: demo.organization,
      designation: demo.title,
      udyamNumber: role === "manufacturer" ? demo.identifier : undefined,
      officerBadgeId: role === "admin" ? demo.identifier : undefined,
      createdAt: new Date().toISOString(),
    };
    saveUserSession(newUser);
  };

  const login = async (email: string): Promise<boolean> => {
    const role: UserRole = email.includes("admin") || email.endsWith("@bis.gov.in")
      ? "admin"
      : email.includes("msme") || email.includes("corp") || email.includes("mfg")
      ? "manufacturer"
      : "citizen";

    const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      organization: role === "admin" ? "Bureau of Indian Standards" : role === "manufacturer" ? "Registered MSME Unit" : "General Public",
      createdAt: new Date().toISOString(),
    };
    saveUserSession(newUser);
    return true;
  };

  const register = async (name: string, email: string, role: UserRole, organization?: string): Promise<boolean> => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      role,
      organization: organization || (role === "admin" ? "Bureau of Indian Standards" : role === "manufacturer" ? "MSME Unit" : "Individual"),
      createdAt: new Date().toISOString(),
    };
    saveUserSession(newUser);
    return true;
  };

  const logout = () => {
    saveUserSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginWithDemo,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
