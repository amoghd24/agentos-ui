import * as React from "react";

interface PromptEditorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
}

export function PromptEditor({
  value,
  onChange,
  placeholder = "Write your prompt here...",
  className = ""
}: PromptEditorProps) {
  return (
    <div className={`flex-1 overflow-hidden rounded-xl border shadow-sm bg-card text-card-foreground mb-4 ${className}`}>
      <textarea
        className="h-full w-full p-4 resize-none outline-none bg-transparent"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
} 