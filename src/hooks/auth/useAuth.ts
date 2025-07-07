import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/auth-service";
import { useAuthStore } from "@/store/use-auth-store";
import { useUserStore } from "@/store/use-user-store";
import { LoginCredentials, Tenant } from "@/types/auth";
import { toast } from "react-hot-toast";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUser, clearUser } = useUserStore();
  const { setTokens, logout: clearAuth, setTenantId, setLoading } = useAuthStore();

  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      setLoading(true);
      try {
        const response = await AuthService.login(credentials);
        return response;
      } finally {
        setLoading(false);
      }
    },
    onSuccess: (data) => {
      // Set auth data
      setTokens(data.token);
      setUser(data.user);
      
      // Handle tenant selection
      const tenants = data.tenants || [];
      if (tenants.length > 0) {
        // Select the first active tenant by default, or the first tenant if none are active
        const activeTenant = tenants.find((t: Tenant) => t.is_active) || tenants[0];
        if (activeTenant) {
          setTenantId(activeTenant.id);
          console.log(`Logged in to tenant: ${activeTenant.name} (${activeTenant.id})`);
        }
      } else {
        console.warn('No tenants found for this user');
      }

      // Show success message
      toast.success("Login successful");

      // Redirect to home page
      navigate("/", { replace: true });
    },
    onError: (error) => {
      // Show error message
      toast.error(error instanceof Error ? error.message : "Failed to login");
      console.error("Login error:", error);
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      try {
        await AuthService.logout();
      } catch (error) {
        console.error("Logout API error:", error);
        // Continue with local logout even if API call fails
      }
    },
    onSuccess: () => {
      // Clear auth and user data
      clearAuth();
      clearUser();

      // Show success message
      toast.success("Successfully logged out");

      // Redirect to login page
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      // Show error message
      toast.error("Failed to logout from server, but you've been logged out locally");
      console.error("Logout error:", error);

      // Even if API call fails, clear local data and redirect
      clearAuth();
      clearUser();
      navigate("/login", { replace: true });
    },
  });

  return {
    login,
    logout,
  };
}; 