import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAgentConversation } from "@/hooks/agents/useAgentConversation";
import { useMessageManagement } from "@/hooks/conversation/useMessageManagement";
import { MessagesList } from "@/components/blocks/conversation/MessagesList";
import { ConversationHeader } from "@/components/blocks/conversation/ConversationHeader";
import { MessageInput } from "@/components/blocks/conversation/MessageInput";
import { ChatLayout } from "@/components/blocks/conversation/ChatLayout";

/**
 * AgentChatPage component for interacting with an agent
 * Uses custom hooks for separation of concerns
 */
export default function AgentChatPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  // Use custom hooks to separate concerns
  const { 
    prompt, 
    practice, 
    loading, 
    error, 
    practiceInitialized 
  } = useAgentConversation(id);
  
  // Convert practice.id to string if it exists, otherwise undefined
  const practiceId = practice?.id ? String(practice.id) : undefined;
  
  const {
    messages,
    inputMessage,
    isSending,
    messagesEndRef,
    sendMessage,
    resetConversation,
    setInputMessage
  } = useMessageManagement(practiceId);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  // Navigation handler - memoized to prevent unnecessary re-renders
  const handleBackClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  return (
    <ChatLayout
      header={
        <ConversationHeader
          title={prompt?.name || "Untitled Agent"}
          error={!!error}
          onBackClick={handleBackClick}
          onResetClick={resetConversation}
        />
      }
      messages={
        <MessagesList
          messages={messages}
          emptyMessage="No messages yet. Start a conversation!"
          messagesEndRef={messagesEndRef}
        />
      }
      input={
        <MessageInput
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onSubmit={sendMessage}
          disabled={loading || !practiceInitialized}
          isLoading={isSending}
          placeholder="Type a message..."
        />
      }
    />
  );
} 