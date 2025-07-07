import { useState, useEffect, useCallback } from 'react';
import PromptService from '@/services/PromptService';
import { Prompt, GetPromptsParams } from '@/types/prompt';
import { startOfWeek, isAfter } from "date-fns";

interface UsePromptsResult {
  prompts: Prompt[];
  loading: boolean;
  error: string | null;
  weeklyPrompts: number;
  refetch: () => Promise<void>;
}

export function usePrompts(): UsePromptsResult {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [weeklyPrompts, setWeeklyPrompts] = useState<number>(0);

  const handlePromptsResponse = (data: any): Prompt[] => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data.results && Array.isArray(data.results)) return data.results;
    return [data];
  };

  const fetchPrompts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await PromptService.getPrompts();
      
      // Handle both array and paginated responses
      const data = Array.isArray(response) ? response : (response as any).results || response;
      
      setPrompts(data);
      
      // Calculate prompts created this week
      const currentDate = new Date();
      const weekStart = startOfWeek(currentDate);
      
      const thisWeekPrompts = data.filter((prompt: Prompt) => {
        if (!prompt.created_at) return false;
        const createdDate = new Date(prompt.created_at);
        return isAfter(createdDate, weekStart);
      });
      
      setWeeklyPrompts(thisWeekPrompts.length);
      setError(null);
    } catch (err) {
      console.error("Error fetching prompts:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch agents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  const getPromptById = useCallback(async (id: string): Promise<Prompt | null> => {
    try {
      return await PromptService.getPromptById(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : `An error occurred while fetching prompt ${id}`);
      return null;
    }
  }, []);

  const createPrompt = useCallback(async (promptData: Partial<Prompt>): Promise<Prompt | null> => {
    try {
      const newPrompt = await PromptService.createPrompt(promptData);
      setPrompts(prevPrompts => [...prevPrompts, newPrompt]);
      return newPrompt;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while creating the prompt');
      return null;
    }
  }, []);

  const updatePrompt = useCallback(async (id: string, promptData: Partial<Prompt>): Promise<Prompt | null> => {
    try {
      const updatedPrompt = await PromptService.updatePrompt(id, promptData);
      setPrompts(prevPrompts => 
        prevPrompts.map(prompt => prompt.id === id ? updatedPrompt : prompt)
      );
      return updatedPrompt;
    } catch (err) {
      setError(err instanceof Error ? err.message : `An error occurred while updating prompt ${id}`);
      return null;
    }
  }, []);

  const deletePrompt = useCallback(async (id: string): Promise<boolean> => {
    try {
      await PromptService.deletePrompt(id);
      setPrompts(prevPrompts => prevPrompts.filter(prompt => prompt.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : `An error occurred while deleting prompt ${id}`);
      return false;
    }
  }, []);

  return {
    prompts,
    loading,
    error,
    weeklyPrompts,
    refetch: fetchPrompts
  };
}

export default usePrompts; 