import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessagesList } from "@/components/blocks/conversation/MessagesList";
import { ConversationHeader } from "@/components/blocks/conversation/ConversationHeader";
import { MessageInput } from "@/components/blocks/conversation/MessageInput";
import { ChatLayout } from "@/components/blocks/conversation/ChatLayout";
import { toast } from "@/components/ui/use-toast";

// Define message interface for local state
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error' | 'thinking';
}

/**
 * AgentChatPage component for interacting with MCP
 * Simplified implementation that directly calls the API
 */
export default function AgentChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Format timestamp for messages
  const formatTimestamp = (): string => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Message creation helpers
  const createUserMessage = (text: string): Message => ({
    id: `user-${Date.now()}`,
    text,
    isUser: true,
    timestamp: formatTimestamp(),
    status: 'sent'
  });
  
  const createThinkingMessage = (): Message => ({
    id: `thinking-${Date.now()}`,
    text: "...",
    isUser: false,
    timestamp: formatTimestamp(),
    status: 'thinking'
  });
  
  const createAssistantMessage = (text: string): Message => ({
    id: `assistant-${Date.now()}`,
    text,
    isUser: false,
    timestamp: formatTimestamp(),
    status: 'sent'
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Navigation handler - memoized to prevent unnecessary re-renders
  const handleBackClick = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);
  
  // Send message to API endpoint
  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    try {
      setIsSending(true);
      
      // Save the message text before clearing input
      const messageText = inputMessage;
      
      // Add user message to UI immediately
      const userMessage = createUserMessage(messageText);
      setMessages(prev => [...prev, userMessage]);
      
      // Clear input
      setInputMessage("");
      
      // Add assistant "thinking" message
      const thinkingMessage = createThinkingMessage();
      setMessages(prev => [...prev, thinkingMessage]);
      
      // Call the API endpoint
      try {
        const response = await fetch('http://localhost:8001/api/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: messageText
          }),
        });
        
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        const responseText = data.response || "I've received your message, but there was an issue processing it.";
        
        // Replace thinking message with the actual response
        setMessages(prev => prev.filter(m => m.id !== thinkingMessage.id));
        
        // Add the AI response to the UI
        const assistantMessage = createAssistantMessage(responseText);
        setMessages(prev => [...prev, assistantMessage]);
        
      } catch (runError) {
        console.error("Error calling API:", runError);
        
        // Replace thinking message with error response
        setMessages(prev => prev.filter(m => m.id !== thinkingMessage.id));
        
        const errorMessage = createAssistantMessage("Sorry, I encountered an error processing your request.");
        setMessages(prev => [...prev, errorMessage]);
        
        toast({
          variant: "destructive",
          title: "API Error",
          description: "Failed to get a response from MCP API.",
        });
      }
      
    } catch (err) {
      console.error("Error sending message:", err);
      // Remove thinking message if there was an error
      setMessages(prev => prev.filter(m => m.id.startsWith('thinking-')));
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  // Reset conversation
  const resetConversation = () => {
    setMessages([]);
    toast({
      title: "Conversation Reset",
      description: "Started a new conversation.",
    });
  };

  return (
    <ChatLayout
      header={
        <ConversationHeader
          title="MCP Agent"
          error={false}
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
          disabled={false}
          isLoading={isSending}
          placeholder="Type a message..."
        />
      }
    />
  );
} 