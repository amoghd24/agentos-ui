import * as React from "react";
import { ChatMessage } from "@/components/blocks/conversation/ChatMessage";
import { safeToString, formatTimestamp } from "@/lib/utils";
import { Message } from "@/types";

// Define the message props
export interface MessageProps {
  id: string;
  text: string;
  text_src?: string;
  created_at?: string;
  practice_id?: string;
  [key: string]: any;
}

interface MessageRendererProps {
  message: Message;
}

/**
 * MessageRenderer component that handles rendering chat messages
 * This component encapsulates the logic for formatting message data
 * before passing it to the ChatMessage component
 */
export function MessageRenderer({ message }: MessageRendererProps) {
  // Skip rendering if message is invalid
  if (!message || !message.id) {
    return null;
  }

  const isUser = message.text_src?.toLowerCase() === "user";
  
  // Format timestamp using the utility function
  const timestamp = message.created_at 
    ? formatTimestamp(message.created_at) 
    : 'Unknown time';
  
  return (
    <ChatMessage
      key={message.id}
      id={message.id}
      text={safeToString(message.text)}
      isUser={isUser}
      timestamp={timestamp}
    />
  );
} 