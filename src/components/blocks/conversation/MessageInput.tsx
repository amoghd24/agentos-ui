import * as React from "react";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e?: FormEvent) => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

export function MessageInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
  isLoading = false,
  placeholder = "Type a message..."
}: MessageInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        className="flex-1"
      />
      <Button 
        type="submit" 
        disabled={!value.trim() || disabled || isLoading}
        className="flex-shrink-0"
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <Send className="h-4 w-4" />
        )}
        <span className="sr-only">Send</span>
      </Button>
    </form>
  );
} 