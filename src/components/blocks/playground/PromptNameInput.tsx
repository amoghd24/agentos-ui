import * as React from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PromptNameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  version?: string;
}

export function PromptNameInput({ 
  value, 
  onChange, 
  version = "v1" 
}: PromptNameInputProps) {
  return (
    <div className="flex items-center mb-4 gap-2">
      <div className="flex items-center border rounded-md pr-2 flex-1">
        <div className="p-2 border-r">
          <Plus className="h-4 w-4 text-gray-500" />
        </div>
        <Input 
          value={value}
          onChange={onChange}
          className="border-0 focus-visible:ring-0"
          placeholder="Enter prompt name"
        />
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
        {version}
      </div>
      <Button variant="ghost" size="icon">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  );
} 