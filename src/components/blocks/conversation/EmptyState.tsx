import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus } from 'lucide-react';

// Simple EmptyState variant for message lists
export interface SimpleEmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<SimpleEmptyStateProps> = ({
  message
}) => (
  <div className="flex flex-col items-center justify-center p-8 text-center h-[60vh] text-gray-400">
    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
      <MessageSquare className="h-8 w-8 text-gray-500" />
    </div>
    <h3 className="text-lg font-medium mb-2">{message}</h3>
  </div>
);

// Full EmptyState for conversation lists
export interface FullEmptyStateProps {
  onNewConversation: () => void;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
}

export const ConversationEmptyState: React.FC<FullEmptyStateProps> = ({
  onNewConversation,
  title = "No conversations yet",
  description = "Start your first conversation or import existing conversations from your system",
  icon = <MessageSquare className="h-8 w-8 text-gray-500" />,
  actionText = "New Conversation"
}) => (
  <div className="flex flex-col items-center justify-center p-8 text-center h-[60vh] text-gray-400">
    <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-500 mb-6 max-w-md">
      {description}
    </p>
    <Button onClick={onNewConversation} className="bg-gray-800 hover:bg-gray-700">
      <Plus className="mr-2 h-4 w-4" />
      {actionText}
    </Button>
  </div>
); 