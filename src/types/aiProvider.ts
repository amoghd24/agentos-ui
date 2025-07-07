// Define interfaces for the AI Provider data model
export interface AiProvider {
  id: string;
  name: string;
  plain_key?: string;
  status: 'Configured' | 'Not Configured' | 'Error';
  created: string;
}

// Raw provider data from API
export interface RawProviderData {
  id: string;
  name: string;
  plain_key?: string;
  created?: string;
  created_at?: string;
  [key: string]: any;
} 