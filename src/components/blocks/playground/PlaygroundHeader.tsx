import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaygroundHeaderProps {
  title: string;
  onBackClick: () => void;
}

export function PlaygroundHeader({ title, onBackClick }: PlaygroundHeaderProps) {
  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        className="mr-2" 
        onClick={onBackClick}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
} 