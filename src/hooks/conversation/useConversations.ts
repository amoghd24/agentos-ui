import { useState, useEffect, useCallback } from 'react';
import PracticeService from '@/services/PracticeService';
import { Practice as Conversation, PaginationParams } from '@/types/conversation';

interface UseConversationsResult {
  conversations: Conversation[];
  loading: boolean;
  error: Error | null;
  fetchConversations: (params?: PaginationParams) => Promise<void>;
  getConversationById: (id: string) => Promise<Conversation | null>;
  createConversation: (data: Partial<Conversation>) => Promise<Conversation | null>;
  updateConversation: (id: string, data: Partial<Conversation>) => Promise<Conversation | null>;
  deleteConversation: (id: string) => Promise<boolean>;
}

export function useConversations(): UseConversationsResult {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchConversations = useCallback(async (params: PaginationParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await PracticeService.getPractices(params);
      setConversations(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while fetching conversations'));
    } finally {
      setLoading(false);
    }
  }, []);

  const getConversationById = useCallback(async (id: string): Promise<Conversation | null> => {
    try {
      return await PracticeService.getPracticeById(id) as Conversation;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`An error occurred while fetching conversation ${id}`));
      return null;
    }
  }, []);

  const createConversation = useCallback(async (data: Partial<Conversation>): Promise<Conversation | null> => {
    try {
      const newConversation = await PracticeService.createPractice(data) as Conversation;
      setConversations(prev => [...prev, newConversation]);
      return newConversation;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while creating the conversation'));
      return null;
    }
  }, []);

  const updateConversation = useCallback(async (id: string, data: Partial<Conversation>): Promise<Conversation | null> => {
    try {
      const updatedConversation = await PracticeService.updatePractice(id, data) as Conversation;
      setConversations(prev => 
        prev.map(conversation => conversation.id === id ? updatedConversation : conversation)
      );
      return updatedConversation;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`An error occurred while updating conversation ${id}`));
      return null;
    }
  }, []);

  const deleteConversation = useCallback(async (id: string): Promise<boolean> => {
    try {
      await PracticeService.deletePractice(id);
      setConversations(prev => prev.filter(conversation => conversation.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`An error occurred while deleting conversation ${id}`));
      return false;
    }
  }, []);

  return {
    conversations,
    loading,
    error,
    fetchConversations,
    getConversationById,
    createConversation,
    updateConversation,
    deleteConversation
  };
}

export default useConversations; 