import axios, { AxiosError } from "axios";
import api from "./utils/axios";
import { LoginCredentials } from "@/types/auth";

// Correct path based on API documentation - including trailing slash
const AUTH_PATH = "auth/token-auth";

// Create a separate axios instance for login without interceptors
const loginApi = axios.create({
  baseURL: api.defaults.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthService = {
  login: async (credentials: LoginCredentials) => {
    try {
      // Accept any credentials and return mock data
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return mock successful login response
      return {
        token: "demo-token-" + Date.now(),
        user: {
          id: "demo-user-1",
          email: credentials.email,
          first_name: credentials.email.split('@')[0],
          last_name: "User",
          is_active: true,
          is_staff: true,
          date_joined: new Date().toISOString(),
        },
        tenants: [
          {
            id: "demo-tenant-1",
            name: "Demo Tenant",
            is_active: true,
            created_at: new Date().toISOString(),
          }
        ]
      };
      
      // Original code commented out for reference
      /*
      const email = credentials.email.toLowerCase();
      const { password } = credentials;
      const encodedCredentials = btoa(`${email}:${password}`);
      
      const loginEndpoint = `${AUTH_PATH}/login/`; // Add trailing slash
      console.log(`Attempting login to: ${loginEndpoint} with POST method`);
      
      // Make sure we're explicitly using POST
      const response = await loginApi({
        method: 'POST',
        url: loginEndpoint,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encodedCredentials}`,
        },
        data: {}, // Empty body but make sure it's included
      });
      
      console.log('Login response status:', response.status);
      return response.data;
      */
    } catch (error) {
      console.error("Login API error:", error);
      if (error instanceof AxiosError && error.response?.data?.detail) {
        throw new Error(error.response.data.detail);
      }
      throw new Error("Failed to login. Please try again.");
    }
  },

  logout: async () => {
    // Return success
    return { success: true };
    // Original code:
    // return await api.post(`${AUTH_PATH}/logout/`);
  },

  getUserProfile: async () => {
    try {
      const response = await api.get("auth/profile/");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      throw error;
    }
  },
}; 