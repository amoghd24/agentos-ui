/**
 * Base interface for message objects
 */
export interface Message {
  id: string;
  text: string;
  text_src?: string;
  created_at?: string;
  practice_id?: string;
  [key: string]: any;
}

/**
 * Extended message props to match UI component requirements
 */
export interface ExtendedMessage extends Message {
  isError?: boolean;
  isSending?: boolean;
} 