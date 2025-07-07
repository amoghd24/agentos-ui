import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface NewChatButtonProps {
  onClick: () => void;
  isCreating: boolean;
}

/**
 * New chat button component
 */
export function NewChatButton({ onClick, isCreating }: NewChatButtonProps) {
  return (
    <div className="flex-shrink-0 p-4 border-b">
      <Button 
        onClick={onClick} 
        className="w-full justify-start" 
        disabled={isCreating}
      >
        <Plus className="mr-2 h-4 w-4" />
        New Chat
        {isCreating && <span className="ml-2 animate-pulse">...</span>}
      </Button>
    </div>
  );
}

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Search bar component
 */
export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex-shrink-0 p-4 border-b">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search conversations..."
          className="pl-8"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
} 