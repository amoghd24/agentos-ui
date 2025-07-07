import * as React from "react";

interface MessageDisplayProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  className?: string;
}

export function MessageDisplay({
  role,
  content,
  className = ""
}: MessageDisplayProps) {
  return (
    <div className={`rounded-xl border shadow-sm bg-card text-card-foreground p-4 ${className}`}>
      <div className="border-b mb-2">
        <div className="inline-block px-4 py-2 font-medium text-gray-500">
          {role === 'user' ? 'USER' : role === 'assistant' ? 'ASSISTANT' : 'SYSTEM'}
        </div>
      </div>
      <div className="whitespace-pre-wrap">{content}</div>
    </div>
  );
} 