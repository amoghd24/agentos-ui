import { useState, useEffect } from "react";
import PromptService from "@/services/PromptService";
import PracticeService from "@/services/PracticeService";
import { Prompt } from "@/types/prompt";
import { Practice } from "@/types/conversation";
import { toast } from "@/components/ui/use-toast";

interface PracticeQueryParams {
  ordering: string;
  prompt: string;
}

/**
 * Custom hook to manage agent conversation initialization and data
 * Handles loading the prompt and finding/creating the practice
 */
export function useAgentConversation(promptId: string | undefined) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [practice, setPractice] = useState<Practice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [practiceInitialized, setPracticeInitialized] = useState<boolean>(false);

  // Initialize prompt and practice when component mounts or promptId changes
  useEffect(() => {
    if (!promptId) return;
    
    const initConversation = async () => {
      try {
        setLoading(true);
        
        // First, get the prompt data
        const promptData = await PromptService.getPromptById(promptId);
        setPrompt(promptData);
        
        // Look for existing practices for this prompt
        try {
          // Find the most recently created practice for this prompt
          const queryParams: PracticeQueryParams = { 
            ordering: "-created_at",
            prompt: promptId
          };
          
          const practices = await PracticeService.getPractices(queryParams);
          
          if (practices && practices.length > 0) {
            // Use the most recent practice
            setPractice(practices[0]);
            setPracticeInitialized(true);
          } else {
            // Fallback: Allow UI to function even without a practice
            console.log("No existing practice found for prompt:", promptData.name);
            setPracticeInitialized(true);
          }
        } catch (err) {
          console.error("Failed to find practice:", err);
          // Continue anyway so at least the UI chat works
          setPracticeInitialized(true);
        }
        
      } catch (err) {
        console.error("Error fetching prompt:", err);
        setError("Failed to load agent data");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load agent data. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    initConversation();
  }, [promptId]);

  return { 
    prompt, 
    practice, 
    loading, 
    error, 
    practiceInitialized 
  };
} 