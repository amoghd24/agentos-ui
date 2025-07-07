import { useState, useRef, useCallback, FormEvent } from "react";
import PracticeService from "@/services/PracticeService";
import { toast } from "@/components/ui/use-toast";

// Enhanced Message interface with proper typing
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error' | 'thinking';
}

/**
 * Message utility service for creating consistent message objects
 */
export const MessageService = {
  formatTimestamp(): string {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  },
  
  createUserMessage(text: string): Message {
    return {
      id: `user-${Date.now()}`,
      text,
      isUser: true,
      timestamp: this.formatTimestamp(),
      status: 'sent'
    };
  },
  
  createThinkingMessage(): Message {
    return {
      id: `thinking-${Date.now()}`,
      text: "...",
      isUser: false,
      timestamp: this.formatTimestamp(),
      status: 'thinking'
    };
  },
  
  createAssistantMessage(text: string): Message {
    return {
      id: `assistant-${Date.now()}`,
      text,
      isUser: false,
      timestamp: this.formatTimestamp(),
      status: 'sent'
    };
  }
};

/**
 * Custom hook to manage messages, input state, and message sending logic
 */
export function useMessageManagement(practiceId: string | undefined) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Send a message to the conversation
  const sendMessage = useCallback(async (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    if (!inputMessage.trim() || !practiceId) return;
    
    try {
      setIsSending(true);
      
      // Save the message text before clearing input
      const messageText = inputMessage;
      
      // Add user message to UI immediately
      const userMessage = MessageService.createUserMessage(messageText);
      setMessages(prev => [...prev, userMessage]);
      
      // Clear input
      setInputMessage("");
      
      // Add assistant "thinking" message
      const thinkingMessage = MessageService.createThinkingMessage();
      setMessages(prev => [...prev, thinkingMessage]);
      
      // Use the service method to run the conversation
      let responseText = "";
      try {
        // Run the conversation - this should handle saving both the user message and getting the AI response
        const runResponse = await PracticeService.runConversation(practiceId, messageText);
        
        // Extract response from runResponse
        responseText = runResponse || "I've received your message.";
        
      } catch (runError) {
        console.error("Error running conversation:", runError);
        responseText = "Sorry, I encountered an error processing your request.";
      }
      
      // Replace thinking message with the actual response
      setMessages(prev => prev.filter(m => m.id !== thinkingMessage.id));
      
      // Add the AI response to the UI
      const assistantMessage = MessageService.createAssistantMessage(responseText);
      setMessages(prev => [...prev, assistantMessage]);
      
    } catch (err) {
      console.error("Error sending message:", err);
      // Remove thinking message if there was an error
      setMessages(prev => prev.filter(m => !m.id.startsWith('thinking-')));
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  }, [inputMessage, practiceId]);

  // Handle resetting the conversation
  const resetConversation = useCallback(async () => {
    try {
      // Clear messages in the UI
      setMessages([]);
      
      // Create a new conversation thread if we have a practice
      if (practiceId) {
        try {
          await PracticeService.addConversation(practiceId);
        } catch (err) {
          console.warn("Failed to reset conversation in the API, but cleared messages in UI", err);
        }
      }
      
      toast({
        title: "Conversation Reset",
        description: "Started a new conversation.",
      });
    } catch (err) {
      console.error("Error resetting conversation:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reset conversation. Messages cleared locally.",
      });
    }
  }, [practiceId]);

  return {
    messages,
    inputMessage,
    isSending,
    messagesEndRef,
    sendMessage,
    resetConversation,
    setInputMessage
  };
} 