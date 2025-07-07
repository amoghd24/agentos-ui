import * as React from "react";

interface ChatLayoutProps {
  header: React.ReactNode;
  messages: React.ReactNode;
  input: React.ReactNode;
  className?: string;
}

export function ChatLayout({
  header,
  messages,
  input,
  className = "",
}: ChatLayoutProps) {
  return (
    <div className={`flex flex-1 flex-col h-full ${className}`}>
      {header}
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages}
      </div>

      {/* Message input */}
      <div className="border-t p-4">
        {input}
      </div>
    </div>
  );
} 