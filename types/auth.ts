export type UserRole = "citizen" | "manufacturer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization?: string;
  designation?: string;
  udyamNumber?: string;
  officerBadgeId?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthSession {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DemoAccount {
  role: UserRole;
  name: string;
  email: string;
  title: string;
  organization: string;
  identifier: string;
  badge: string;
  description: string;
}
