import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputWrapperProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
}

export function MessageInputWrapper({
  value,
  onChange,
  onSubmit,
  onKeyPress,
  disabled = false,
  placeholder = "Write a message...",
  isLoading = false
}: MessageInputWrapperProps) {
  return (
    <div className="flex-shrink-0 border-t p-4 bg-background sticky bottom-0 left-0 right-0 z-10">
      <div className="flex items-center gap-2">
        <Input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          className="flex-1"
          disabled={disabled || isLoading}
        />
        <Button
          onClick={onSubmit}
          disabled={!value.trim() || disabled || isLoading}
          size="icon"
        >
          <Send className={`h-4 w-4 ${isLoading ? 'animate-pulse' : ''}`} />
        </Button>
      </div>
    </div>
  );
} 