import * as React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthLayout({
  children,
  className = "",
}: AuthLayoutProps) {
  return (
    <div className={`min-h-screen w-full flex items-center justify-center bg-background ${className}`}>
      <div className="w-full max-w-md px-4">
        {children}
      </div>
    </div>
  );
} 