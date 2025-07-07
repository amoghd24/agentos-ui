import * as React from "react";

interface ConversationMainProps {
  header: React.ReactNode;
  messages: React.ReactNode;
  input: React.ReactNode;
  messageListRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export function ConversationMain({
  header,
  messages,
  input,
  messageListRef,
  className = "",
}: ConversationMainProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Fixed header at the top */}
      <div className="flex-shrink-0">
        {header}
      </div>

      {/* Scrollable message area in the middle */}
      <div ref={messageListRef as React.RefObject<HTMLDivElement>} className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
        {messages}
      </div>

      {/* Fixed input at the bottom */}
      <div className="flex-shrink-0">
        {input}
      </div>
    </div>
  );
} 