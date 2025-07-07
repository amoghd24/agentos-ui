import { NewChatButton, SearchBar } from "@/components/sidebar/conversation-header";
import { ConversationList } from "@/components/sidebar/conversation-list";
import { useConversationSidebar } from "@/hooks/conversation/useConversationSidebar";

/**
 * ConversationSidebar component displays a list of conversations
 * with search and creation functionality.
 */
export default function ConversationSidebar() {
  // Use our custom hook for all the data and logic
  const {
    id,
    searchTerm,
    setSearchTerm,
    sortedPractices,
    loading,
    error,
    creatingPractice,
    handleCreatePractice
  } = useConversationSidebar();

  return (
    <div className="flex flex-col h-full border-r">
      {/* New chat button */}
      <NewChatButton 
        onClick={handleCreatePractice}
        isCreating={creatingPractice}
      />
      
      {/* Search bar */}
      <SearchBar 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* List of conversations - scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
        <ConversationList 
          practices={sortedPractices}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          currentId={id}
        />
      </div>
    </div>
  );
} 