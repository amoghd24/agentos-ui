import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import AiProvidersService from '@/services/AiProvidersService';

interface Provider {
  id: string;
  name: string;
}

export function useProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const accessKeys = await AiProvidersService.getAccessKeys();
      
      setProviders(accessKeys.map(provider => ({
        id: provider.id,
        name: provider.name
      })));
    } catch (err) {
      console.error("Error loading providers:", err);
      setError(err instanceof Error ? err : new Error('Failed to load AI providers'));
      
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load AI providers.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    providers,
    isLoading,
    error,
    refreshProviders: loadProviders
  };
} 