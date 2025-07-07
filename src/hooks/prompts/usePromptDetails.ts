import { useState, useEffect } from "react";
import PromptService from "@/services/PromptService";

/**
 * Custom hook to fetch prompt details by ID
 * 
 * @param promptId The ID of the prompt to fetch
 * @returns Object containing the prompt name and loading state
 */
export function usePromptDetails(promptId: string | null) {
  const [promptName, setPromptName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!promptId) {
      setPromptName(null);
      return;
    }

    const fetchPromptName = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const promptData = await PromptService.getPromptById(promptId);
        setPromptName(promptData.name || "Untitled");
      } catch (error) {
        console.error("Error fetching prompt name:", error);
        setError(error instanceof Error ? error : new Error("Failed to fetch prompt"));
        setPromptName("Untitled");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromptName();
  }, [promptId]);

  return { promptName, isLoading, error };
}

export default usePromptDetails; 