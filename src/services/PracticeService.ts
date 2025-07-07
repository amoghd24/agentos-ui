import api from './utils/axios';
import generateCRUDOps from './utils/generateCrud';
import { 
  ConvoPost, 
  ConvoThread, 
  Practice, 
  PaginationParams, 
  MessageInput 
} from '../types/conversation';

const practicesPathPrefix = '/agentos/practices/';

// Create the CRUD operations - we need to capture the generated functions
const practiceCrudOps = generateCRUDOps<Practice, PaginationParams>(practicesPathPrefix, 'practice');

/**
 * Helper to safely process API responses
 */
const processApiResponse = <T>(data: any): T | T[] => {
  if (!data) return [] as T[];
  
  if (Array.isArray(data)) {
    return data as T[];
  }
  
  if (data.results && Array.isArray(data.results)) {
    return data.results as T[];
  }
  
  return data as T;
};

/**
 * Service for managing and interacting with practices and conversations
 */
const PracticeService = {
  // Generate standard CRUD operations for practices
  ...practiceCrudOps,

  // Add aliases for backward compatibility
  getPractices: async (params: PaginationParams = {}): Promise<Practice[]> => {
    const response = await api.get(practicesPathPrefix, { params });
    return processApiResponse<Practice>(response.data) as Practice[];
  },

  getPracticeById: async (id: string): Promise<Practice> => {
    const response = await api.get(`${practicesPathPrefix}${id}/`);
    return processApiResponse<Practice>(response.data) as Practice;
  },

  createPractice: async (data: Partial<Practice>): Promise<Practice> => {
    const response = await api.post(practicesPathPrefix, data);
    return processApiResponse<Practice>(response.data) as Practice;
  },

  updatePractice: async (id: string, data: Partial<Practice>): Promise<Practice> => {
    const response = await api.patch(`${practicesPathPrefix}${id}/`, data);
    return processApiResponse<Practice>(response.data) as Practice;
  },

  deletePractice: async (id: string): Promise<boolean> => {
    await api.delete(`${practicesPathPrefix}${id}/`);
    return true;
  },

  // Custom endpoints for conversation management
  
  /**
   * Add a conversation to a practice
   */
  addConversation: async (practiceId: string): Promise<ConvoThread> => {
    const response = await api.post(`${practicesPathPrefix}${practiceId}/add_conversation/`);
    return processApiResponse<ConvoThread>(response.data) as ConvoThread;
  },

  /**
   * Run a conversation with retry logic
   */
  runConversation: async (practiceId: string, userMessage?: string, maxRetries = 2): Promise<any> => {
    let attempts = 0;
    
    // Use the correct payload format as shown in the API response
    const payload = {
      user_message: userMessage || ""
    };
    
    while (attempts <= maxRetries) {
      try {
        attempts++;
        const response = await api.post(`${practicesPathPrefix}${practiceId}/run/`, payload, {
          timeout: attempts === 1 ? 15000 : 30000 // Increase timeout on retries
        });
        return response.data;
      } catch (error) {
        console.error(`Run conversation attempt ${attempts} failed for practice ${practiceId}:`, error);
        
        if (attempts > maxRetries) {
          // If we've exhausted all retries, throw the error
          throw error;
        }
        
        // Add exponential backoff delay
        const delay = Math.min(1000 * Math.pow(2, attempts - 1), 5000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // This should never be reached due to the throw in the catch block
    throw new Error("Failed to run conversation after multiple attempts");
  },

  // Conversation posts endpoints
  
  /**
   * Get all posts for a practice
   */
  getPracticePosts: async (practiceId: string, params: PaginationParams = {}): Promise<ConvoPost[]> => {
    try {
      const response = await api.get(`${practicesPathPrefix}${practiceId}/posts/`, { params });
      return processApiResponse<ConvoPost>(response.data) as ConvoPost[];
    } catch (error) {
      console.error(`Error fetching posts for practice ${practiceId}:`, error);
      return []; // Return empty array instead of throwing error
    }
  },

  /**
   * Create a new post for a practice
   */
  createPracticePost: async (practiceId: string, data: MessageInput): Promise<ConvoPost> => {
    const response = await api.post(`${practicesPathPrefix}${practiceId}/posts/`, data);
    return processApiResponse<ConvoPost>(response.data) as ConvoPost;
  },

  /**
   * Get a specific post by ID
   */
  getPostById: async (practiceId: string, postId: string): Promise<ConvoPost> => {
    const response = await api.get(`${practicesPathPrefix}${practiceId}/posts/${postId}/`);
    return processApiResponse<ConvoPost>(response.data) as ConvoPost;
  },

  /**
   * Update an existing post
   */
  updatePost: async (practiceId: string, postId: string, data: Partial<MessageInput>): Promise<ConvoPost> => {
    const response = await api.patch(`${practicesPathPrefix}${practiceId}/posts/${postId}/`, data);
    return processApiResponse<ConvoPost>(response.data) as ConvoPost;
  },

  /**
   * Delete a post
   */
  deletePost: async (practiceId: string, postId: string): Promise<boolean> => {
    await api.delete(`${practicesPathPrefix}${practiceId}/posts/${postId}/`);
    return true;
  }
};

export default PracticeService; 