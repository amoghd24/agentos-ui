import * as React from "react";

interface PromptTabProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function PromptTab({
  label,
  isActive = true,
  onClick
}: PromptTabProps) {
  return (
    <div className="mb-4">
      <div className="border-b">
        <div 
          className={`inline-block px-4 py-2 font-medium ${isActive ? "border-b-2 border-blue-500" : "text-gray-500 cursor-pointer hover:text-gray-700"}`}
          onClick={isActive ? undefined : onClick}
        >
          {label}
        </div>
      </div>
    </div>
  );
} 