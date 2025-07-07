import React from "react";

interface StateMessageProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Base component for displaying state messages
 */
export function StateMessage({ children, className }: StateMessageProps) {
  return (
    <div className={`p-4 text-center ${className || ""}`}>
      <p className="text-sm">{children}</p>
    </div>
  );
}

/**
 * Loading state component
 */
export function LoadingState() {
  return (
    <StateMessage className="text-muted-foreground">
      Loading conversations...
    </StateMessage>
  );
}

/**
 * Error state component
 */
export function ErrorState({ message }: { message: string }) {
  return (
    <StateMessage className="text-red-500">
      {message}
    </StateMessage>
  );
}

/**
 * Empty state component
 */
export function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <StateMessage className="text-muted-foreground">
      {searchTerm ? "No matching conversations found." : "No conversations yet."}
    </StateMessage>
  );
} 