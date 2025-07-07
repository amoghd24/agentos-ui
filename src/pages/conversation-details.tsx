import * as React from "react";
import { useParams } from "react-router-dom";
import { 
  ConversationHeader,
  ConversationSidebar,
  MessageList,
  MessageRenderer,
  MessageInputWrapper,
  ConversationLayout,
  ConversationMain
} from "@/components/blocks/conversation";
import { LoadingState } from "@/components/ui/loading-state";
import { useConversationDetails, ExtendedMessageProps } from "@/hooks/conversation/useConversationDetails";
import { safeToString, formatDate, extractUserName } from "@/lib/utils";

export default function ConversationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  
  // Use our custom hook to manage conversation data and interactions
  const {
    // Practice data
    practice,
    loading,
    error,
    
    // Messages data
    posts,
    postsLoading,
    postsError,
    messageListRef,
    
    // Message input and sending
    newMessage,
    setNewMessage,
    sendingMessage,
    handleSendMessage,
    handleKeyPress
  } = useConversationDetails(id);

  if (loading) {
    return <LoadingState message="Loading conversation data..." />;
  }

  if (!practice) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-red-500">Conversation not found or an error occurred.</div>
      </div>
    );
  }

  /**
   * Helper render functions
   * Moving these chunks of JSX out of the main return statement keeps the
   * component easier to scan and reason about at a high level.
   */
  const renderMain = () => (
    <ConversationMain
      messageListRef={messageListRef}
      header={
        <ConversationHeader
          title={`${safeToString(practice.name)} ${practice.is_active ? "(Active)" : "(Inactive)"}`}
        />
      }
      messages={
        <MessageList
          messages={posts}
          isLoading={postsLoading}
          error={postsError || error}
          onRetry={handleSendMessage}
          messageRenderer={(post) => <MessageRenderer message={post} />}
        />
      }
      input={
        <MessageInputWrapper
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onSubmit={handleSendMessage}
          onKeyPress={handleKeyPress}
          disabled={false}
          isLoading={sendingMessage}
        />
      }
    />
  );

  const renderSidebar = () => (
    <ConversationSidebar
      title={safeToString(practice.name)}
      isActive={practice.is_active || false}
      createdBy={extractUserName(practice.created_by)}
      createdAt={practice.created_at ? formatDate(practice.created_at) : "Unknown date"}
      messageCount={posts.length}
    />
  );

  return (
    <ConversationLayout
      main={renderMain()}
      sidebar={renderSidebar()}
    />
  );
} 