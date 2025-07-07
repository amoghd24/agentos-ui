import * as React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({ 
  message = "Loading...", 
  className = "py-12" 
}: LoadingStateProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
      <span>{message}</span>
    </div>
  );
} 