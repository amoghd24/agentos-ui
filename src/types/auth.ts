// Authentication related types

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  tenantId: string | null;
}

export interface UserState {
  id: string | null;
  username: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
  tenants: Tenant[];
}

export interface Tenant {
  id: string;
  name: string;
  is_active: boolean;
  slug: string;
} 