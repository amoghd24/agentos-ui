import * as React from "react";

interface TwoColumnLayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  sidebarWidth?: string;
  className?: string;
}

export function TwoColumnLayout({
  sidebar,
  main,
  sidebarWidth = "w-72",
  className = "",
}: TwoColumnLayoutProps) {
  return (
    <div className={`flex h-full w-full overflow-hidden ${className}`}>
      {/* Left sidebar with independent scrolling */}
      <div className={`${sidebarWidth} flex-shrink-0 border-r h-full overflow-hidden`}>
        {sidebar}
      </div>

      {/* Main content area with independent scrolling */}
      <div className="flex-1 h-full overflow-hidden">
        {main}
      </div>
    </div>
  );
} 