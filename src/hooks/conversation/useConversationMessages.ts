import { useState, useEffect, useCallback, useRef } from 'react';
import PracticeService from '@/services/PracticeService';
import { ConvoPost as Message, MessageInput } from '@/types/conversation';
import WebSocketService, { WebSocketMessage } from '@/services/WebSocketService';

interface UseConversationMessagesResult {
  messages: Message[];
  loading: boolean;
  error: Error | null;
  sending: boolean;
  connected: boolean;
  fetchMessages: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<boolean>;
  connect: (conversationId: string) => void;
  disconnect: () => void;
}

export function useConversationMessages(): UseConversationMessagesResult {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [sending, setSending] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  // Keep track of active conversation ID
  const activeConversationRef = useRef<string | null>(null);

  const fetchMessages = useCallback(async (conversationId: string) => {
    if (!conversationId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await PracticeService.getPracticePosts(conversationId);
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`An error occurred while fetching messages for conversation ${conversationId}`));
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (conversationId: string, content: string): Promise<boolean> => {
    if (!content.trim()) return false;

    setSending(true);
    setError(null);
    try {
      const messageData: MessageInput = {
        text: content,
        text_src: 'user'
      };

      const newMessage = await PracticeService.createPracticePost(conversationId, messageData);
      
      // Add new message to state
      setMessages(prev => [...prev, newMessage]);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while sending the message'));
      return false;
    } finally {
      setSending(false);
    }
  }, []);

  const handleWebSocketMessage = useCallback((event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data) as WebSocketMessage;
      
      // Handle different message types
      if (data.type === 'message') {
        // New message from the assistant
        const message: Message = {
          id: data.id || `temp-${Date.now()}`,
          practice_id: data.conversation_id || activeConversationRef.current || '',
          text: data.content || '',
          text_src: data.role || 'assistant',
          created_at: data.timestamp || new Date().toISOString()
        };
        
        setMessages(prev => {
          // Avoid duplicates
          const exists = prev.some(m => m.id === message.id);
          if (exists) return prev;
          return [...prev, message];
        });
      }
      else if (data.type === 'error') {
        setError(new Error(data.error || 'Unknown error from WebSocket'));
      }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
    }
  }, []);

  const connect = useCallback((conversationId: string) => {
    if (!conversationId) return;
    
    // Store the active conversation ID
    activeConversationRef.current = conversationId;
    
    // Set up WebSocket connection
    WebSocketService.connect(conversationId, {
      onOpen: () => {
        setConnected(true);
        console.log(`WebSocket connected for conversation ${conversationId}`);
      },
      onMessage: handleWebSocketMessage,
      onError: () => {
        setConnected(false);
        setError(new Error('WebSocket connection error'));
      },
      onClose: () => {
        setConnected(false);
      }
    });
  }, [handleWebSocketMessage]);

  const disconnect = useCallback(() => {
    WebSocketService.disconnect();
    setConnected(false);
    activeConversationRef.current = null;
  }, []);

  // Clean up WebSocket connection on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    messages,
    loading,
    error,
    sending,
    connected,
    fetchMessages,
    sendMessage,
    connect,
    disconnect
  };
}

export default useConversationMessages; 