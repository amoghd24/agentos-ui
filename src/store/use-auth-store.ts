import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '@/types/auth';
import api, { addIdTokenToRequests, setTenantIdForRequests } from '@/services/utils/axios';

interface AuthActions {
  setTokens: (token: string) => void;
  setTenantId: (tenantId: string) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  tenantId: null,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      ...initialState,
      
      setTokens: (token: string) => {
        // Update axios default headers with the new token
        api.defaults.headers.common.Authorization = `Token ${token}`;
        
        set({
          token,
          isAuthenticated: true,
        });
      },
      
      setTenantId: (tenantId: string) => {
        // Update axios headers with tenant ID
        setTenantIdForRequests(tenantId);
        
        set({ tenantId });
      },
      
      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
      
      logout: () => {
        // Clear auth headers
        delete api.defaults.headers.common.Authorization;
        setTenantIdForRequests(null);
        
        // Reset to initial state
        set(initialState);
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        tenantId: state.tenantId,
      }),
    }
  )
); 