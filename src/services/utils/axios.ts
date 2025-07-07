import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast'; // Assuming the project uses react-hot-toast

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    // Get token and tenant ID from storage if available
    const token = localStorage.getItem('auth-storage') 
      ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.token 
      : null;
    
    const tenantId = localStorage.getItem('auth-storage') 
      ? JSON.parse(localStorage.getItem('auth-storage') || '{}').state?.tenantId 
      : null;
    
    // Add token to request headers if available
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    
    // Add tenant ID to request headers if available
    if (tenantId) {
      config.headers['X-Tenant-ID'] = tenantId;
    }
    
    // Enhanced logging for debugging API requests
    const fullUrl = `${config.baseURL || ''}${config.url || ''}`;
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: fullUrl,
      headers: config.headers,
      data: config.data
    });
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error: AxiosError) => {
    // Log all error details for debugging
    console.error('❌ API Error:', {
      message: error.message,
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.config?.headers
    });
    
    // Handle different error types
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data as any;
      
      // Handle different status codes
      if (status === 401) {
        // Don't redirect to login - auth bypass is active
        // Silently ignore 401 errors
        /* Original code:
        // Handle unauthorized (redirect to login, etc.)
        toast.error('Your session has expired. Please login again.');
        // Clear local auth data
        localStorage.removeItem('auth-storage');
        localStorage.removeItem('user-storage');
        // Redirect to login if needed
        window.location.href = '/login';
        */
      } else if (status === 403) {
        toast.error('You do not have permission to perform this action.');
      } else if (status === 404) {
        toast.error('Resource not found.');
      } else if (status === 405) {
        toast.error(`Method ${error.config?.method?.toUpperCase()} not allowed for this endpoint.`);
      } else if (status === 429) {
        toast.error('Too many requests. Please try again later.');
      } else if (status >= 500) {
        toast.error('Server error. Please try again later.');
      } else {
        // Try to extract a meaningful error message
        let errorMessage = 'An error occurred';
        if (data?.detail) {
          errorMessage = data.detail;
        } else if (data?.error) {
          errorMessage = data.error;
        } else if (data?.message) {
          errorMessage = data.message;
        }
        
        toast.error(errorMessage);
      }
    } else if (error.request) {
      // Request was made but no response received
      toast.error('No response from server. Please check your connection.');
    } else {
      // Something else happened in setting up the request
      toast.error('Error sending request. Please try again.');
    }
    
    // Process specific provider errors
    if (error.response?.data) {
      const errorData = error.response.data as any;
      const errorMessage = errorData.detail || errorData.error || error.message;
      
      if (typeof errorMessage === 'string') {
        // Provider-specific error detection
        if (errorMessage.toLowerCase().includes('rate_limit') || 
            errorMessage.toLowerCase().includes('rate limit')) {
          return Promise.reject(new Error('Rate limit exceeded for this AI provider. Try again later or use a different provider.'));
        } else if (errorMessage.toLowerCase().includes('quota') || 
                  errorMessage.toLowerCase().includes('exceeded')) {
          return Promise.reject(new Error('API quota exceeded. Please check your subscription plan.'));
        } else if (errorMessage.toLowerCase().includes('invalid') && 
                  errorMessage.toLowerCase().includes('key')) {
          return Promise.reject(new Error('Invalid API key for the selected provider. Please check your API configuration.'));
        }
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * Helper function to extract text from various AI provider response formats
 */
export const extractResponseText = (data: any): string => {
  if (data.text) return data.text;
  if (data.message) return data.message;
  if (data.response) return data.response;
  if (data.choices && data.choices[0]?.message?.content)
    return data.choices[0].message.content;
  if (data.content && Array.isArray(data.content) && data.content[0]?.text)
    return data.content[0].text;
  if (data.generations && data.generations[0]?.text)
    return data.generations[0].text;
  if (typeof data === 'string') return data;
  console.warn('Unknown response format:', data);
  return 'Unable to parse response. See console for details.';
};

/**
 * Add ID token to requests if available
 */
export const addIdTokenToRequests = (idToken: string) => {
  if (idToken) {
    api.defaults.headers.common['x-id-token'] = idToken;
  }
};

/**
 * Set tenant ID for all future requests
 */
export const setTenantIdForRequests = (tenantId: string | null) => {
  if (tenantId) {
    api.defaults.headers.common['X-Tenant-ID'] = tenantId;
  } else {
    delete api.defaults.headers.common['X-Tenant-ID'];
  }
};

export default api; 