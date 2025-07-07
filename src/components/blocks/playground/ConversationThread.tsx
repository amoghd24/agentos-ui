import * as React from "react";
import { MessageDisplay } from "@/components/blocks/playground/MessageDisplay";
import { Post } from "@/types/prompt";

interface ConversationThreadProps {
  conversation: Post[];
  className?: string;
}

export function ConversationThread({ conversation, className = "" }: ConversationThreadProps) {
  if (conversation.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 mb-4 ${className}`}>
      {conversation.map((message, index) => (
        <MessageDisplay
          key={`${message.role}-${index}`}
          role={message.role}
          content={message.content}
        />
      ))}
    </div>
  );
} 