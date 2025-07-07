import * as React from "react";
import { LucideIcon } from "lucide-react";

interface PlaceholderStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}

export function PlaceholderState({
  icon: Icon,
  title,
  description,
  className = "",
}: PlaceholderStateProps) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center p-6 text-center ${className}`}>
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Icon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
      </div>
      <h2 className="mt-6 text-2xl font-medium">{title}</h2>
      {description && (
        <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
} 