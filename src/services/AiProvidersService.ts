import api from './utils/axios';
import { AiProvider, RawProviderData } from '../types/aiProvider';
import { AxiosError } from 'axios';

const accessKeysPathPrefix = '/settings/access-keys/';

/**
 * Helper function to normalize API response
 */
const normalizeToArray = (data: any): AiProvider[] => {
  // If data is already an array, return it
  if (Array.isArray(data)) {
    return data.map((provider: RawProviderData) => ({
      ...provider,
      // Compute status based on whether the key exists
      status: provider.plain_key ? 'Configured' : 'Not Configured',
      // Handle different date field names
      created: provider.created || provider.created_at || new Date().toISOString()
    }));
  }
  
  // If data has results array, return that
  if (data && Array.isArray(data.results)) {
    return data.results.map((provider: RawProviderData) => ({
      ...provider,
      status: provider.plain_key ? 'Configured' : 'Not Configured',
      created: provider.created || provider.created_at || new Date().toISOString()
    }));
  }
  
  // Default to empty array
  return [];
};

/**
 * Service for managing AI provider access keys
 */
const AiProvidersService = {
  /**
   * Get all AI provider access keys
   */
  getAccessKeys: async (): Promise<AiProvider[]> => {
    const response = await api.get(accessKeysPathPrefix);
    return normalizeToArray(response.data);
  },

  /**
   * Get a specific AI provider access key by ID
   */
  getAccessKeyById: async (id: string): Promise<AiProvider> => {
    const response = await api.get(`${accessKeysPathPrefix}${id}/`);
    const provider = response.data;
    return {
      ...provider,
      status: provider.plain_key ? 'Configured' : 'Not Configured'
    };
  },

  /**
   * Create a new AI provider access key
   */
  createAccessKey: async (name: string, key: string): Promise<AiProvider> => {
    if (!name) {
      throw new Error('Provider name is required');
    }
    
    if (!key) {
      throw new Error('API key is required');
    }
    
    const response = await api.post(accessKeysPathPrefix, { name, key });
    const provider = response.data;
    return {
      ...provider,
      status: 'Configured'
    };
  },

  /**
   * Update an existing AI provider access key
   */
  updateAccessKey: async (id: string, name: string, key: string): Promise<AiProvider> => {
    if (!id) {
      throw new Error('Provider ID is required');
    }
    
    if (!name) {
      throw new Error('Provider name is required');
    }
    
    // Prepare update payload
    const updateData: { name: string; key?: string } = { name };
    
    // Only include key in payload if it's not an empty string
    if (key.trim() !== '') {
      updateData.key = key;
    }
    
    const response = await api.patch(`${accessKeysPathPrefix}${id}/`, updateData);
    const provider = response.data;
    return {
      ...provider,
      status: 'Configured'
    };
  },

  /**
   * Delete an AI provider access key
   */
  deleteAccessKey: async (id: string): Promise<boolean> => {
    await api.delete(`${accessKeysPathPrefix}${id}/`);
    return true;
  }
};

export default AiProvidersService; 