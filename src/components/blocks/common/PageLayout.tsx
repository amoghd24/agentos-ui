import * as React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  gap?: string;
}

export function PageLayout({
  children,
  className = "",
  gap = "gap-4",
}: PageLayoutProps) {
  return (
    <div className={`flex flex-1 flex-col ${gap} ${className}`}>
      {children}
    </div>
  );
} 