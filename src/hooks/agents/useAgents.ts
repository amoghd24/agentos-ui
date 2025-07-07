import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import PromptService from '@/services/PromptService';
import { Prompt, GetPromptsParams } from '@/types/prompt';
import { toast } from '@/components/ui/use-toast';

// Query key for Agents/Prompts
const AGENTS_QUERY_KEY = 'agents';

// Type for paginated response
interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Prompt[];
}

export const useAgents = (params: GetPromptsParams = {}) => {
  const queryClient = useQueryClient();

  // Fetch all agents/prompts
  const { 
    data: agents = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: [AGENTS_QUERY_KEY, params],
    queryFn: async () => {
      try {
        const response = await PromptService.getPrompts(params);
        
        // Handle different response formats
        if (Array.isArray(response)) {
          return response;
        } else if (response && typeof response === 'object' && 'results' in response) {
          return (response as PaginatedResponse).results;
        } else if (response) {
          return [response as Prompt];
        }
        return [];
      } catch (error) {
        console.error("Error fetching agents:", error);
        throw error;
      }
    },
    staleTime: 60000, // 1 minute before refetching
  });

  // Create a new agent
  const createAgentMutation = useMutation({
    mutationFn: (agentData: Partial<Prompt>) => PromptService.createPrompt(agentData),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Agent created successfully!",
      });
      // Invalidate the agents query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [AGENTS_QUERY_KEY] });
    },
    onError: (error) => {
      console.error("Error creating agent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create the agent. Please try again.",
      });
    },
  });

  // Update an existing agent
  const updateAgentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Prompt> }) => 
      PromptService.updatePrompt(id, data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Agent updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: [AGENTS_QUERY_KEY] });
    },
    onError: (error) => {
      console.error("Error updating agent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update the agent. Please try again.",
      });
    },
  });

  // Delete an agent
  const deleteAgentMutation = useMutation({
    mutationFn: (id: string) => PromptService.deletePrompt(id),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Agent deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: [AGENTS_QUERY_KEY] });
    },
    onError: (error) => {
      console.error("Error deleting agent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the agent. Please try again.",
      });
    },
  });

  return {
    agents,
    isLoading,
    error,
    refetch,
    createAgent: createAgentMutation.mutateAsync,
    isCreating: createAgentMutation.isPending,
    createError: createAgentMutation.error,
    updateAgent: updateAgentMutation.mutateAsync,
    isUpdating: updateAgentMutation.isPending,
    updateError: updateAgentMutation.error,
    deleteAgent: deleteAgentMutation.mutateAsync,
    isDeleting: deleteAgentMutation.isPending,
    deleteError: deleteAgentMutation.error,
  };
}; 