import * as React from "react";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

interface ChatMessageProps {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

export function ChatMessage({ id, text, isUser, timestamp }: ChatMessageProps) {
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[80%] ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        } rounded-lg p-3 space-y-1`}
      >
        <div className="break-words">
          {isUser ? (
            text
          ) : (
            <MarkdownRenderer content={text} />
          )}
        </div>
        <div
          className={`text-xs ${
            isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
          }`}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
} 