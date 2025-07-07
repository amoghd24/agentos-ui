import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';

export interface ConversationHeaderProps {
  title: string;
  error?: boolean;
  onBackClick?: () => void;
  onResetClick?: () => void;
}

export function ConversationHeader({ 
  title, 
  error, 
  onBackClick,
  onResetClick
}: ConversationHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4 px-4 py-2 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center">
        {onBackClick && (
          <button 
            onClick={onBackClick}
            className="mr-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <h1 className={`text-xl font-medium ${error ? 'text-red-500' : ''}`}>{title}</h1>
      </div>
      
      {onResetClick && (
        <button 
          onClick={onResetClick}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          aria-label="Reset conversation"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      )}
    </div>
  );
} 