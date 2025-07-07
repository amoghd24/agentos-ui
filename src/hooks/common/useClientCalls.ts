import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ClientCall, GetClientCallsParams, CommCategory } from '@/types/conversation';

// Mock implementation since ClientCallsService was removed
const mockClientCallsService = {
  getClientCalls: async () => {
    return { results: [], count: 0 };
  }
};

interface UseClientCallsResult {
  clientCalls: ClientCall[];
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
  filteredCalls: ClientCall[];
  setSearchTerm: (term: string) => void;
  setActiveCategory: (category: CommCategory) => void;
  searchTerm: string;
  activeCategory: CommCategory;
}

export function useClientCalls(initialParams: GetClientCallsParams = {}): UseClientCallsResult {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<CommCategory>('all');
  
  // Fetch client calls data
  const { 
    data: callsData,
    isLoading,
    isFetching,
    refetch
  } = useQuery({
    queryKey: ['clientCalls', { activeCategory }],
    queryFn: () => mockClientCallsService.getClientCalls(),
    staleTime: 60000, // 1 minute
  });
  
  // Filter client calls based on search term
  const filteredCalls = useMemo(() => {
    if (!callsData?.results || callsData.results.length === 0) return [];
    
    return callsData.results.filter((call: ClientCall) => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      // Only try to access properties if they exist
      return (
        call.call?.agent_name?.toLowerCase().includes(searchLower) ||
        call.call?.conversation_id?.toLowerCase().includes(searchLower) ||
        (call.client?.full_name && call.client.full_name.toLowerCase().includes(searchLower))
      );
    });
  }, [callsData, searchTerm]);
  
  return {
    clientCalls: callsData?.results || [],
    isLoading,
    isFetching,
    refetch,
    filteredCalls,
    setSearchTerm,
    setActiveCategory,
    searchTerm,
    activeCategory
  };
}

export default useClientCalls; 