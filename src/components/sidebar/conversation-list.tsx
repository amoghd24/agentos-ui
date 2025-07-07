import { ConversationItem } from "@/components/sidebar/conversation-item";
import { LoadingState, ErrorState, EmptyState } from "@/components/sidebar/conversation-states";
import { Practice } from "@/types/conversation";

interface ConversationListProps {
  practices: Practice[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentId?: string;
}

/**
 * ConversationList component displays the list of conversations with appropriate states
 */
export function ConversationList({ 
  practices, 
  loading, 
  error, 
  searchTerm,
  currentId 
}: ConversationListProps) {
  // Show appropriate state based on data conditions
  if (loading) {
    return <LoadingState />;
  }
  
  if (error) {
    return <ErrorState message={error} />;
  }
  
  if (practices.length === 0) {
    return <EmptyState searchTerm={searchTerm} />;
  }
  
  // Render the list of conversations
  return (
    <div className="p-2 space-y-2">
      {practices.map((practice) => (
        <ConversationItem 
          key={practice.id} 
          practice={practice} 
          isActive={practice.id === currentId}
        />
      ))}
    </div>
  );
} 