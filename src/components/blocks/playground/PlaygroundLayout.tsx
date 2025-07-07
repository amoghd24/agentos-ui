import * as React from "react";

interface PlaygroundLayoutProps {
  header: React.ReactNode;
  editor: React.ReactNode;
  response: React.ReactNode;
  className?: string;
}

export function PlaygroundLayout({
  header,
  editor,
  response,
  className = ""
}: PlaygroundLayoutProps) {
  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      {header}
      
      {/* Main content area */}
      <div className="flex flex-1 gap-4 h-full overflow-hidden">
        {/* Left side - Prompt editing */}
        <div className="flex flex-col w-1/2 h-full overflow-auto">
          {editor}
        </div>
        
        {/* Right side - Response preview */}
        {response}
      </div>
    </div>
  );
} 