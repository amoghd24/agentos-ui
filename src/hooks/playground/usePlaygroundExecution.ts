import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import PromptService from '@/services/PromptService';
import { Post } from '@/types/prompt';
import { useModelSettings } from '@/hooks/providers/useModelSettings';

interface ResponseMetadata {
  providerUsed: string;
  modelUsed: string;
  tokenUsage: any;
}

export function usePlaygroundExecution() {
  const [userMessage, setUserMessage] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(null);
  const [responseMetadata, setResponseMetadata] = useState<ResponseMetadata | null>(null);
  const [conversation, setConversation] = useState<Post[]>([]);

  // Use model settings hook
  const modelSettings = useModelSettings();
  const { provider, setProvider, settings } = modelSettings;

  // Handle user message input changes
  const handleUserMessageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserMessage(e.target.value);
  };

  // Handle current message changes (for conversation mode)
  const handleCurrentMessageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
  };

  // Handle provider selection
  const handleProviderChange = (providerId: string) => {
    setProvider(providerId);
  };

  // Run initial prompt with user message
  const runInitialPrompt = async (promptId: string | null, message: string) => {
    if (!message.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a user message.",
      });
      return;
    }

    if (!promptId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please save your prompt before running.",
      });
      return;
    }

    await runWithMessage(promptId, message);
  };

  // Continue conversation with the current message
  const continueConversation = async (promptId: string | null, message: string) => {
    if (!message.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a message to continue the conversation.",
      });
      return;
    }

    if (!promptId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please save your prompt before running.",
      });
      return;
    }

    // Store the current message before running
    setPendingUserMessage(message);
    await runWithMessage(promptId, message, true);
  };

  // Core function to run a prompt with a message
  const runWithMessage = async (promptId: string, message: string, isConversation: boolean = false) => {
    setIsRunning(true);
    setAiResponse(null);
    setResponseMetadata(null);
    
    try {
      // Create the full conversation thread for context
      let fullConversation = [...conversation];
      
      // Call the API according to its expected arguments
      const response = await PromptService.runPrompt(
        promptId,
        message,
        provider || undefined,
        isConversation ? fullConversation : undefined
      );
      
      setAiResponse(response.text);
      setResponseMetadata({
        providerUsed: response.provider_used,
        modelUsed: response.model_used,
        tokenUsage: response.token_usage
      });
      
    } catch (error) {
      console.error("Error running prompt:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to run the prompt.",
      });
      // Clear pending message on error
      setPendingUserMessage(null);
    } finally {
      setIsRunning(false);
    }
  };

  // Add the current response to the conversation
  const addToConversation = () => {
    if (!aiResponse) return;
    
    // Add appropriate message and AI response to conversation
    const updatedConversation = [...conversation];
    
    // Determine which user message to add
    const messageToAdd = pendingUserMessage || userMessage;
    
    // Add the user message and AI response
    updatedConversation.push(
      { role: 'user', content: messageToAdd, timestamp: new Date().toISOString() },
      { role: 'assistant', content: aiResponse, timestamp: new Date().toISOString() }
    );
    
    setConversation(updatedConversation);
    setUserMessage(''); // Clear initial user message
    setAiResponse(null); // Clear response
    setCurrentMessage(''); // Clear current message input
    setPendingUserMessage(null); // Clear pending message
  };

  // Copy response to clipboard
  const handleCopyResponse = () => {
    if (aiResponse) {
      navigator.clipboard.writeText(aiResponse);
      toast({
        title: "Copied",
        description: "Response copied to clipboard",
      });
    }
  };

  return {
    userMessage,
    currentMessage,
    aiResponse,
    isRunning,
    pendingUserMessage,
    responseMetadata,
    conversation,
    selectedProvider: provider,
    modelSettings,
    handleUserMessageChange,
    handleCurrentMessageChange,
    handleProviderChange,
    runInitialPrompt,
    continueConversation,
    addToConversation,
    handleCopyResponse,
  };
} 