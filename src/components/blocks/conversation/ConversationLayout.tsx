import * as React from "react";

interface ConversationLayoutProps {
  main: React.ReactNode;
  sidebar: React.ReactNode;
  className?: string;
}

export function ConversationLayout({
  main,
  sidebar,
  className = "",
}: ConversationLayoutProps) {
  return (
    <div className={`flex h-full w-full ${className}`}>
      {/* Main conversation area - with its own independent scrolling */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {main}
      </div>

      {/* Right sidebar - with its own independent scrolling */}
      <div className="flex-shrink-0 h-full overflow-hidden">
        {sidebar}
      </div>
    </div>
  );
} 