// Define interfaces for the conversation data model
export interface ConvoPost {
  id: string;
  text: string;
  text_src: string;
  created_at: string;
  practice_id: string;
  convo_thread_id?: string;
}

export interface ConvoThread {
  id: string;
  parent_object_id: string; // Practice ID
  created_at: string;
  updated_at?: string;
}

export interface Practice {
  id: string | number;
  name: string;
  is_active: boolean;
  org_id?: number;
  resolved_prompt?: string;
  tenant?: string;
  created_by?: string | object;
  created_at: string;
  updated_at?: string;
  convo_thread?: ConvoThread;
}

// Pagination parameters for list endpoints
export interface PaginationParams {
  page?: number;
  page_size?: number;
  ordering?: string;
  search?: string;
  is_active?: boolean;
}

// Message input for creating new messages
export interface MessageInput {
  text: string;
  text_src?: string;
} 