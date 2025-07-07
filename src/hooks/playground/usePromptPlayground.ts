import { useState, useEffect, useCallback } from 'react';
import PromptService from '@/services/PromptService';
import { Prompt, Post, PromptRunResponse, GetPromptsParams } from '@/types/prompt';

interface VariableValues {
  [key: string]: string;
}

interface Provider {
  id: string;
  name: string;
  isDefault?: boolean;
}

interface UsePromptPlaygroundResult {
  // Prompt state
  promptId: string | null;
  promptName: string;
  systemPrompt: string;
  isActive: boolean;
  textVariables: string[];
  variableValues: VariableValues;
  isLoading: boolean;
  error: string | null;
  
  // Response state
  aiResponse: string;
  isGenerating: boolean;
  responseError: string | null;
  lastRunDetails: {
    providerUsed: string;
    modelUsed: string;
    tokenUsage: any;
  } | null;
  
  // Provider selection
  availableProviders: Provider[];
  selectedProviderId: string | null;
  loadingProviders: boolean;
  
  // Conversation state
  userMessage: string;
  conversation: Post[];
  showConversation: boolean;
  
  // Actions
  setPromptName: (name: string) => void;
  setSystemPrompt: (prompt: string) => void;
  setUserMessage: (message: string) => void;
  setVariableValue: (name: string, value: string) => void;
  toggleConversationView: () => void;
  selectProvider: (providerId: string | null) => void;
  
  // API operations
  savePrompt: () => Promise<Prompt | null>;
  runPrompt: () => Promise<PromptRunResponse | null>;
  addToConversation: (post: Post) => void;
  loadPrompt: (id: string) => Promise<void>;
  clearResponse: () => void;
  loadProviders: () => Promise<Provider[]>;
}

export function usePromptPlayground(initialPromptId?: string): UsePromptPlaygroundResult {
  // Prompt state
  const [promptId, setPromptId] = useState<string | null>(initialPromptId || null);
  const [promptName, setPromptName] = useState<string>('Untitled');
  const [systemPrompt, setSystemPrompt] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [textVariables, setTextVariables] = useState<string[]>([]);
  const [variableValues, setVariableValues] = useState<VariableValues>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Response state
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<string | null>(null);
  const [lastRunDetails, setLastRunDetails] = useState<{
    providerUsed: string;
    modelUsed: string;
    tokenUsage: any;
  } | null>(null);
  
  // Provider selection state
  const [availableProviders, setAvailableProviders] = useState<Provider[]>([]);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const [loadingProviders, setLoadingProviders] = useState<boolean>(false);
  
  // Conversation state
  const [userMessage, setUserMessage] = useState<string>('');
  const [conversation, setConversation] = useState<Post[]>([]);
  const [showConversation, setShowConversation] = useState<boolean>(false);
  
  // Update variable detection when system prompt changes
  useEffect(() => {
    const detectedVariables = PromptService.detectVariables(systemPrompt);
    setTextVariables(detectedVariables);
    
    // Initialize any new variables with empty values
    const newVariableValues = { ...variableValues };
    detectedVariables.forEach(variable => {
      if (!newVariableValues[variable]) {
        newVariableValues[variable] = '';
      }
    });
    setVariableValues(newVariableValues);
  }, [systemPrompt]);
  
  // Load available AI providers
  const loadProviders = useCallback(async () => {
    setLoadingProviders(true);
    try {
      const providers = await PromptService.getAvailableProviders();
      setAvailableProviders(providers);
      
      // Set the default provider if available
      const defaultProvider = providers.find((p: Provider) => p.isDefault);
      if (defaultProvider) {
        setSelectedProviderId(defaultProvider.id);
      }
      
      return providers;
    } catch (err) {
      console.error('Error loading AI providers:', err);
      return [];
    } finally {
      setLoadingProviders(false);
    }
  }, []);
  
  // Select a provider
  const selectProvider = useCallback((providerId: string | null) => {
    setSelectedProviderId(providerId);
  }, []);
  
  // Load an existing prompt by ID
  const loadPrompt = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = await PromptService.getPromptById(id);
      
      setPromptId(prompt.id);
      setPromptName(prompt.name || 'Untitled');
      setSystemPrompt(prompt.system_prompt || '');
      setIsActive(prompt.is_active);
      
      // Variable handling
      if (prompt.text_variables && prompt.text_variables.length > 0) {
        setTextVariables(prompt.text_variables);
        
        // Initialize variable values
        const initVariableValues: VariableValues = {};
        prompt.text_variables.forEach((variable: string) => {
          initVariableValues[variable] = '';
        });
        setVariableValues(initVariableValues);
      }
      
      // Try to load conversation history if available
      try {
        const conversationHistory = await PromptService.getConversationHistory(id);
        if (conversationHistory && Array.isArray(conversationHistory)) {
          setConversation(conversationHistory);
        }
      } catch (convError) {
        console.warn('Could not load conversation history:', convError);
      }
      
    } catch (err) {
      setError('Failed to load prompt: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Set a variable value
  const setVariableValue = useCallback((name: string, value: string) => {
    setVariableValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);
  
  // Toggle between single response and conversation view
  const toggleConversationView = useCallback(() => {
    setShowConversation(prev => !prev);
  }, []);
  
  // Save the current prompt
  const savePrompt = useCallback(async (): Promise<Prompt | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const promptData = {
        name: promptName,
        system_prompt: systemPrompt,
        is_active: isActive,
        text_variables: textVariables
      };
      
      let savedPrompt: Prompt;
      
      if (promptId) {
        // Update existing prompt
        savedPrompt = await PromptService.updatePrompt(promptId, promptData);
      } else {
        // Create new prompt
        savedPrompt = await PromptService.createPrompt(promptData);
        setPromptId(savedPrompt.id);
      }
      
      return savedPrompt;
    } catch (err) {
      const errorMessage = 'Failed to save prompt: ' + (err instanceof Error ? err.message : String(err));
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [promptId, promptName, systemPrompt, isActive, textVariables]);
  
  // Run the prompt with the current user message
  const runPrompt = useCallback(async (): Promise<PromptRunResponse | null> => {
    if (!userMessage.trim()) {
      setResponseError('Please enter a user message to test the prompt');
      return null;
    }
    
    setIsGenerating(true);
    setResponseError(null);
    
    try {
      let currentPromptId = promptId;
      
      // If no prompt ID exists, save the prompt first
      if (!currentPromptId) {
        const savedPrompt = await savePrompt();
        if (!savedPrompt) {
          throw new Error('Failed to save prompt before running');
        }
        currentPromptId = savedPrompt.id;
      }
      
      // Run the prompt with the selected provider (if any)
      const response = await PromptService.runPrompt(
        currentPromptId,
        userMessage,
        selectedProviderId || undefined
      );
      
      // Set the response text
      setAiResponse(response.text);
      
      // Store details about the run for display
      setLastRunDetails({
        providerUsed: response.provider_used || 'default',
        modelUsed: response.model_used || 'unknown',
        tokenUsage: response.token_usage || null
      });
      
      // Add to conversation
      const userPost: Post = {
        role: 'user',
        content: userMessage,
        timestamp: new Date().toISOString()
      };
      
      const aiPost: Post = {
        role: 'assistant',
        content: response.text,
        timestamp: new Date().toISOString()
      };
      
      setConversation(prev => [...prev, userPost, aiPost]);
      
      // Optionally save conversation to backend
      try {
        await PromptService.addToConversation(currentPromptId, [userPost, aiPost]);
      } catch (convError) {
        console.warn('Could not save conversation:', convError);
      }
      
      // Clear user message after successful run
      setUserMessage('');
      
      return response;
    } catch (err) {
      const errorMessage = 'Failed to run prompt: ' + (err instanceof Error ? err.message : String(err));
      setResponseError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [promptId, userMessage, selectedProviderId, savePrompt]);
  
  // Add a message to the conversation
  const addToConversation = useCallback((post: Post) => {
    setConversation(prev => [...prev, post]);
    
    // If we have a prompt ID, save to backend
    if (promptId) {
      PromptService.addToConversation(promptId, [post])
        .catch((err: Error) => {
          console.error('Failed to add post to conversation history:', err);
        });
    }
  }, [promptId]);
  
  // Clear the current response
  const clearResponse = useCallback(() => {
    setAiResponse('');
    setResponseError(null);
    setLastRunDetails(null);
  }, []);
  
  // Initial load if prompt ID is provided
  useEffect(() => {
    if (initialPromptId) {
      loadPrompt(initialPromptId);
    }
    
    // Load available AI providers
    loadProviders();
  }, [initialPromptId, loadPrompt, loadProviders]);

  // Add a listener for URL changes
  useEffect(() => {
    // Function to extract prompt ID from URL
    const getPromptIdFromUrl = () => {
      const match = window.location.pathname.match(/\/playground\/([^/]+)/);
      return match ? match[1] : null;
    };

    // Function to handle URL changes
    const handleUrlChange = () => {
      const urlPromptId = getPromptIdFromUrl();
      
      // If we have a prompt ID in the URL and it's different from our current one, load it
      if (urlPromptId && urlPromptId !== promptId) {
        loadPrompt(urlPromptId);
      }
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', handleUrlChange);

    // Clean up listener on unmount
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [promptId, loadPrompt]);
  
  return {
    // State
    promptId,
    promptName,
    systemPrompt,
    isActive,
    textVariables,
    variableValues,
    isLoading,
    error,
    aiResponse,
    isGenerating,
    responseError,
    lastRunDetails,
    userMessage,
    conversation,
    showConversation,
    availableProviders,
    selectedProviderId,
    loadingProviders,
    
    // Setters
    setPromptName,
    setSystemPrompt,
    setUserMessage,
    setVariableValue,
    toggleConversationView,
    selectProvider,
    
    // Actions
    savePrompt,
    runPrompt,
    addToConversation,
    loadPrompt,
    clearResponse,
    loadProviders
  };
} 