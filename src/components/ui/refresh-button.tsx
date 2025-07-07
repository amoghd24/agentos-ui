import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface RefreshButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

export function RefreshButton({ 
  onClick, 
  isLoading = false,
  className = ''
}: RefreshButtonProps) {
  return (
    <div className={`p-2 flex justify-end border-b border-gray-800 ${className}`}>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClick}
        disabled={isLoading}
        className="text-gray-400 hover:text-white"
      >
        <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh
      </Button>
    </div>
  );
} 