import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AiProvidersService from '@/services/AiProvidersService';
import { AiProvider } from '@/types/aiProvider';

// Query key for AI Providers
const AI_PROVIDERS_QUERY_KEY = 'aiProviders';

export const useAiProviders = () => {
  const queryClient = useQueryClient();

  // Fetch all AI providers
  const { 
    data: providers = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: [AI_PROVIDERS_QUERY_KEY],
    queryFn: () => AiProvidersService.getAccessKeys(),
  });

  // Create a new provider
  const createProviderMutation = useMutation({
    mutationFn: ({ name, key }: { name: string; key: string }) => 
      AiProvidersService.createAccessKey(name, key),
    onSuccess: () => {
      // Invalidate the providers query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [AI_PROVIDERS_QUERY_KEY] });
    },
  });

  // Update an existing provider
  const updateProviderMutation = useMutation({
    mutationFn: ({ id, name, key }: { id: string; name: string; key: string }) => 
      AiProvidersService.updateAccessKey(id, name, key),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AI_PROVIDERS_QUERY_KEY] });
    },
  });

  // Delete a provider
  const deleteProviderMutation = useMutation({
    mutationFn: (id: string) => AiProvidersService.deleteAccessKey(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AI_PROVIDERS_QUERY_KEY] });
    },
  });

  return {
    providers,
    isLoading,
    error,
    createProvider: createProviderMutation.mutateAsync,
    isCreating: createProviderMutation.isPending,
    createError: createProviderMutation.error,
    updateProvider: updateProviderMutation.mutateAsync,
    isUpdating: updateProviderMutation.isPending,
    updateError: updateProviderMutation.error,
    deleteProvider: deleteProviderMutation.mutateAsync,
    isDeleting: deleteProviderMutation.isPending,
    deleteError: deleteProviderMutation.error,
  };
};

export default useAiProviders; 