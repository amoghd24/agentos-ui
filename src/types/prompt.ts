// Define interfaces for prompt data model
export interface Prompt {
  id: string;
  name: string;
  system_prompt: string;
  is_active: boolean;
  text_variables?: string[];
  created_by: {
    first_name: string;
    last_name: string;
    username: string;
  };
  type: string;
  created_at?: string;
  updated_at?: string;
}

// Parameters for fetching prompts
export interface GetPromptsParams {
  search?: string;
  is_active?: boolean;
  type?: string;
  [key: string]: any;
}

// Response from running a prompt
export interface PromptRunResponse {
  text: string;
  provider_used: string;
  model_used: string;
  token_usage?: {
    prompt: number;
    completion: number;
    total: number;
  };
}

// Interface for a conversation post
export interface Post {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

// Provider interface
export interface Provider {
  id: string;
  name: string;
  isDefault: boolean;
} 