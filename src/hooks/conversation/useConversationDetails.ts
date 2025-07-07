import { useState, useEffect, useRef, useCallback } from 'react';
import { useConversations } from './useConversations';
import PracticeService from '@/services/PracticeService';
import { Practice, ConvoPost } from '@/types/conversation';
import { MessageService } from './useMessageManagement';

// Extended message props to match the UI component requirements
export interface ExtendedMessageProps {
  id: string;
  text: string;
  text_src?: string;
  created_at?: string;
  practice_id?: string;
}

export function useConversationDetails(conversationId: string | undefined) {
  // Get the getConversationById method from useConversations
  const { getConversationById } = useConversations();
  
  // State for the conversation details
  const [practice, setPractice] = useState<Practice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for messages
  const [posts, setPosts] = useState<ExtendedMessageProps[]>([]);
  const [postsLoading, setPostsLoading] = useState<boolean>(false);
  const [postsError, setPostsError] = useState<string | null>(null);
  
  // Message input and sending state
  const [newMessage, setNewMessage] = useState<string>("");
  const [sendingMessage, setSendingMessage] = useState<boolean>(false);
  
  // Reference for scrolling to bottom of messages
  const messageListRef = useRef<HTMLDivElement>(null);
  
  // Fetch practice data
  useEffect(() => {
    if (!conversationId) return;
    
    const loadPractice = async () => {
      try {
        setLoading(true);
        const practiceData = await getConversationById(conversationId);
        if (practiceData) {
          setPractice(practiceData);
        } else {
          setError('Practice not found');
        }
      } catch (err) {
        console.error(`Error loading practice: ${err}`);
        setError(`Failed to load practice data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };
    
    loadPractice();
  }, [conversationId, getConversationById]);
  
  // Fetch posts/messages
  const fetchPosts = useCallback(async () => {
    if (!conversationId) return;
    
    try {
      setPostsLoading(true);
      setPostsError(null);
      const postsData = await PracticeService.getPracticePosts(conversationId);
      // Convert to ExtendedMessageProps
      const formattedPosts = Array.isArray(postsData) 
        ? postsData.map(post => ({
            id: post.id,
            text: post.text || '',
            text_src: post.text_src,
            created_at: post.created_at,
            practice_id: post.practice_id
          }))
        : [];
      setPosts(formattedPosts);
    } catch (err) {
      console.error(`Error loading posts: ${err}`);
      setPostsError(`Failed to load messages: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setPostsLoading(false);
    }
  }, [conversationId]);
  
  // Initial fetch of posts
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messageListRef.current) {
      const element = messageListRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [posts]);
  
  // Send message handler
  const handleSendMessage = async () => {
    if (!conversationId || !newMessage.trim()) return;
    
    // Store message for optimistic update
    const messageText = newMessage.trim();
    const tempId = `temp-${Date.now()}`;
    
    // Create an optimistic message object for the UI only
    const optimisticMessage: ExtendedMessageProps = {
      id: tempId,
      text: messageText,
      text_src: "User",
      created_at: new Date().toISOString(),
      practice_id: conversationId
    };
    
    // Clear input immediately for better UX
    setNewMessage("");
    
    // Clear any previous errors
    setPostsError(null);
    
    // Add optimistic update for user message to UI
    setPosts(prevPosts => [...prevPosts, optimisticMessage]);
    
    try {
      setSendingMessage(true);
      
      // Add a temporary "thinking" indicator
      const thinkingId = `thinking-${Date.now()}`;
      const thinkingMessage: ExtendedMessageProps = {
        id: thinkingId,
        text: "...",
        text_src: "Assistant",
        created_at: new Date().toISOString(),
        practice_id: conversationId
      };
      
      setPosts(prevPosts => [...prevPosts, thinkingMessage]);
      
      // Run the conversation
      let responseText = "";
      
      try {
        // Call runConversation
        const runResponse = await PracticeService.runConversation(conversationId, messageText);
        responseText = runResponse || "I've received your message.";
      } catch (runError) {
        console.error("Error running conversation:", runError);
        responseText = "Sorry, I encountered an error processing your request.";
      }
      
      // Replace thinking indicator with the actual response
      setPosts(prevPosts => {
        // Filter out temporary messages
        const filteredPosts = prevPosts.filter(post => 
          post.id !== thinkingId && post.id !== tempId
        );
        
        // Fetch fresh posts to get the server-created ones
        fetchPosts().catch(error => {
          console.error("Error fetching posts:", error);
        });
        
        // Immediately show a response in the UI while we wait for server posts
        return [...filteredPosts, {
          id: `assistant-${Date.now()}`,
          text: responseText,
          text_src: "Assistant",
          created_at: new Date().toISOString(),
          practice_id: conversationId
        }];
      });
      
    } catch (err) {
      console.error("Error in message flow:", err);
      
      // Remove temporary messages on error
      setPosts(prevPosts => 
        prevPosts.filter(post => post.id !== tempId && !post.id.startsWith('thinking-'))
      );
      
      setPostsError(`Failed to send message: ${err instanceof Error ? err.message : 'Unknown error'}`);
      
      // Put the message back in the input field so user doesn't lose their text
      setNewMessage(messageText);
    } finally {
      setSendingMessage(false);
    }
  };
  
  // Handle key press for sending message on Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return {
    // Practice data
    practice,
    loading,
    error,
    
    // Messages data
    posts,
    postsLoading,
    postsError,
    messageListRef,
    fetchPosts,
    
    // Message input and sending
    newMessage,
    setNewMessage,
    sendingMessage,
    handleSendMessage,
    handleKeyPress
  };
} 