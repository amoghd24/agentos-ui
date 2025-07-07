import * as React from "react";

interface ErrorDisplayProps {
  message: string;
  className?: string;
}

export function ErrorDisplay({
  message,
  className = "",
}: ErrorDisplayProps) {
  return (
    <div className={`flex justify-center items-center py-12 text-red-500 ${className}`}>
      <p>{message}</p>
    </div>
  );
} 