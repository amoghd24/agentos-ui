import * as React from "react";
import { memo } from "react";
import { ChatMessage } from "@/components/blocks/conversation/ChatMessage";
import { EmptyState } from "@/components/blocks/conversation/EmptyState";
import { Message } from "@/hooks/conversation/useMessageManagement";

interface MessagesListProps {
  /**
   * Array of messages to display
   */
  messages: Message[];
  
  /**
   * Message to display when there are no messages
   */
  emptyMessage: string;
  
  /**
   * Ref to scroll to bottom of messages
   */
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Component to render a list of messages with empty state handling
 * Memoized to prevent unnecessary re-renders
 */
export const MessagesList = memo(({ 
  messages, 
  emptyMessage,
  messagesEndRef 
}: MessagesListProps) => {
  // Show empty state when no messages are present
  if (messages.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }
  
  return (
    <div className="flex flex-col space-y-4 py-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          id={message.id}
          text={message.text}
          isUser={message.isUser}
          timestamp={message.timestamp}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
});

// Display name for debugging
MessagesList.displayName = "MessagesList"; 