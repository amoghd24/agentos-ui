import * as React from "react";
import { Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserMessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRun: () => void;
  isRunning: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function UserMessageInput({
  value,
  onChange,
  onRun,
  isRunning,
  disabled = false,
  placeholder = "User message..."
}: UserMessageInputProps) {
  return (
    <div className="mt-4">
      <div className="border-b mb-2">
        <div className="inline-block px-4 py-2 font-medium text-gray-500">
          USER
        </div>
      </div>
      <div className="rounded-xl border shadow-sm bg-card text-card-foreground p-4">
        <textarea
          className="w-full bg-transparent outline-none resize-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled || isRunning}
          rows={3}
        />
        <div className="mt-2 flex justify-end">
          <Button 
            variant="outline"
            className="gap-1"
            onClick={onRun}
            disabled={isRunning || !value.trim() || disabled}
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Run
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
} 