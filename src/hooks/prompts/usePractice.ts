import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import PracticeService from "@/services/PracticeService";
import { Prompt } from "@/types/prompt";

export function usePractice() {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);

  const createPracticeAndNavigate = async (prompt: Prompt) => {
    try {
      setCreating(true);
      
      // Create a new practice using the prompt name
      const practiceData = {
        name: prompt.name || "Unnamed Agent",
        is_active: true
      };
      
      // Create the practice and store the ID for potential future use
      await PracticeService.createPractice(practiceData);
      
      // Show success toast
      toast({
        title: "Success",
        description: `Practice "${practiceData.name}" created successfully!`,
      });
      
      // Navigate to the agent chat page
      navigate(`/prompts/${prompt.id}`);
    } catch (error) {
      console.error("Error creating practice:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create practice. Please try again.",
      });
    } finally {
      setCreating(false);
    }
  };

  return {
    creating,
    createPracticeAndNavigate
  };
} 