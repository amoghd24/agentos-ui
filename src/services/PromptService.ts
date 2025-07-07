import api, { extractResponseText } from './utils/axios';
import generateCRUDOps from './utils/generateCrud';
import { Prompt, GetPromptsParams, PromptRunResponse, Post, Provider } from '../types/prompt';

const pathPrefix = '/agentos/prompts/';

// Create the CRUD operations - we need to capture the generated functions
const crudOps = generateCRUDOps<Prompt, GetPromptsParams>(pathPrefix, 'prompt');

/**
 * Service for managing and interacting with AI prompts
 */
const PromptService = {
  // Include the generated CRUD operations
  ...crudOps,

  // Add aliases for backward compatibility
  getPrompts: async (params: GetPromptsParams = {}): Promise<Prompt[]> => {
    // Use direct API call to avoid recursion
    const response = await api.get(pathPrefix, { params });
    return response.data;
  },

  getPromptById: async (id: string): Promise<Prompt> => {
    // Use direct API call to avoid recursion
    const response = await api.get(`${pathPrefix}${id}/`);
    return response.data;
  },

  createPrompt: async (promptData: Partial<Prompt>): Promise<Prompt> => {
    // Use direct API call to avoid recursion
    const response = await api.post(pathPrefix, promptData);
    return response.data;
  },

  updatePrompt: async (id: string, promptData: Partial<Prompt>): Promise<Prompt> => {
    // Use direct API call to avoid recursion
    const response = await api.patch(`${pathPrefix}${id}/`, promptData);
    return response.data;
  },

  deletePrompt: async (id: string): Promise<boolean> => {
    // Use direct API call to avoid recursion
    await api.delete(`${pathPrefix}${id}/`);
    return true;
  },
  
  // Custom endpoints
  
  /**
   * Run a prompt with a user message and optional provider selection
   */
  runPrompt: async (
    id: string, 
    userMessage: string, 
    providerId?: string, 
    conversationHistory?: Post[]
  ): Promise<PromptRunResponse> => {
    const payload = {
      user_message: userMessage,
      ...(providerId ? { provider_id: providerId } : {}),
      ...(conversationHistory && conversationHistory.length ? { conversation_history: conversationHistory } : {})
    };
    
    const response = await api.post(`${pathPrefix}${id}/run/`, payload);
    
    // Process the response to normalize the format
    const result: PromptRunResponse = {
      text: extractResponseText(response.data),
      provider_used: response.data.provider_used || 'default',
      model_used: response.data.model_used || 'unknown',
      token_usage: response.data.token_usage || null
    };
    
    return result;
  },
  
  /**
   * Helper to detect variables in a system prompt
   */
  detectVariables: (text: string): string[] => {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = [...text.matchAll(regex)];
    const variables = matches.map(match => match[1].trim());
    return [...new Set(variables)]; // Remove duplicates
  },
  
  /**
   * Get available AI providers
   */
  getAvailableProviders: async (): Promise<Provider[]> => {
    // Since the API path has 'api/v1' in baseURL, we don't need to include it here
    const response = await api.get('/agentos/providers/'); // Keep as is - we can update this later if needed
    return response.data.map((provider: any) => ({
      id: provider.id,
      name: provider.name,
      isDefault: provider.is_default || false
    }));
  },
  
  /**
   * Get conversation history for a prompt
   */
  getConversationHistory: async (promptId: string): Promise<Post[]> => {
    const response = await api.get(`${pathPrefix}${promptId}/conversation/`);
    return response.data;
  },
  
  /**
   * Add messages to the conversation history of a prompt
   */
  addToConversation: async (promptId: string, posts: Post[]): Promise<Post[]> => {
    if (!promptId || !Array.isArray(posts) || posts.length === 0) {
      throw new Error('Prompt ID and at least one post are required');
    }
    
    const response = await api.post(`${pathPrefix}${promptId}/conversation/`, { posts });
    return response.data;
  }
};

export default PromptService; 