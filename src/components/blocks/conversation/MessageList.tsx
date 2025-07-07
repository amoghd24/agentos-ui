import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/blocks/conversation/EmptyState";

export interface BaseMessageProps {
  id: string;
  created_at?: string;
  [key: string]: any;
}

interface MessageListProps<T extends BaseMessageProps> {
  messages: T[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  messageRenderer: (message: T) => React.ReactNode;
  emptyMessage?: string;
  loadingMessage?: string;
  endRef?: React.RefObject<HTMLDivElement>;
}

export function MessageList<T extends BaseMessageProps>({
  messages,
  isLoading = false,
  error = null,
  onRetry,
  messageRenderer,
  emptyMessage = "No messages yet. Start a conversation!",
  loadingMessage = "Loading conversation...",
  endRef
}: MessageListProps<T>) {
  return (
    <div className="w-full h-full">
      <div className="p-4 space-y-4">
        {isLoading && (
          <div className="flex items-center justify-center h-20">
            <p className="text-sm text-muted-foreground">{loadingMessage}</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center gap-2 p-4 my-4 border border-red-200 bg-red-50 rounded-md">
            <p className="text-sm text-red-500">{error}</p>
            {error.includes("Failed to send message") && onRetry && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={onRetry}
              >
                Retry
              </Button>
            )}
          </div>
        )}

        {!isLoading && messages.length === 0 && (
          <EmptyState message={emptyMessage} />
        )}

        {messages.map(message => messageRenderer(message))}
        
        {endRef && <div ref={endRef} />}
      </div>
    </div>
  );
}

interface ChatBubbleProps {
  isUser: boolean;
  message: string;
  timestamp: string;
}

export function ChatBubble({ isUser, message, timestamp }: ChatBubbleProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={cn(
          "max-w-3/4 rounded-lg p-3",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <p className="break-words">{message}</p>
        <div
          className={cn(
            "mt-1 text-xs",
            isUser 
              ? "text-primary-foreground/80" 
              : "text-muted-foreground"
          )}
        >
          {timestamp}
        </div>
      </div>
    </div>
  );
} 