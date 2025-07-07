import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import PromptService from '@/services/PromptService';

interface PlaygroundFormState {
  promptId: string | null;
  promptName: string;
  promptText: string;
  isDirty: boolean;
  isSaving: boolean;
}

export function usePlaygroundForm() {
  const navigate = useNavigate();
  const params = useParams();
  
  // Extract prompt ID from URL parameters
  const promptIdFromUrl = params.id || params.promptId;
  const actualPromptId = promptIdFromUrl?.toString().includes('/') 
    ? promptIdFromUrl.toString().split('/').pop() 
    : promptIdFromUrl;

  // Form state
  const [state, setState] = useState<PlaygroundFormState>({
    promptId: null,
    promptName: "Untitled",
    promptText: "",
    isDirty: false,
    isSaving: false
  });

  // Load prompt data if ID is provided
  useEffect(() => {
    if (actualPromptId) {
      loadPrompt(actualPromptId);
    }
  }, [actualPromptId]);

  // Load prompt data from server
  const loadPrompt = async (promptId: string) => {
    try {
      const promptData = await PromptService.getPromptById(promptId);
      setState(prev => ({
        ...prev,
        promptId,
        promptName: promptData.name || "Untitled",
        promptText: promptData.system_prompt || "",
        isDirty: false
      }));
    } catch (error) {
      console.error("Error loading prompt:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load the prompt. Please try again.",
      });
    }
  };

  // Handle prompt name change
  const handlePromptNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ 
      ...prev, 
      promptName: e.target.value,
      isDirty: true
    }));
  };

  // Handle prompt text change
  const handlePromptTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(prev => ({ 
      ...prev, 
      promptText: e.target.value,
      isDirty: true
    }));
  };

  // Handle save prompt
  const handleSavePrompt = async () => {
    setState(prev => ({ ...prev, isSaving: true }));
    
    try {
      const promptData = {
        name: state.promptName,
        system_prompt: state.promptText,
        is_active: true,
      };

      let response;
      
      if (state.promptId) {
        // Update existing prompt
        response = await PromptService.updatePrompt(state.promptId, promptData);
      } else {
        // Create new prompt
        response = await PromptService.createPrompt(promptData);
        
        // Update URL without navigation
        window.history.replaceState(null, '', `/prompts/edit/${response.id}`);
      }

      // Update state with the response data
      setState(prev => ({
        ...prev,
        promptId: response.id,
        promptName: response.name || prev.promptName,
        promptText: response.system_prompt || prev.promptText,
        isDirty: false,
        isSaving: false
      }));

      toast({
        title: "Success",
        description: "Prompt saved successfully!",
      });
      
      return response.id;
    } catch (error) {
      console.error("Error saving prompt:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save the prompt. Please try again.",
      });
      
      setState(prev => ({ ...prev, isSaving: false }));
      return null;
    }
  };

  // Handle navigation back to agents list
  const handleBack = () => {
    navigate("/agents");
  };

  return {
    promptId: state.promptId,
    promptName: state.promptName,
    promptText: state.promptText,
    isDirty: state.isDirty,
    isSaving: state.isSaving,
    handlePromptNameChange,
    handlePromptTextChange,
    handleSavePrompt,
    handleBack
  };
} 