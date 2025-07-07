import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/utils/route-utils';

export function useConversationNavigation() {
  const navigate = useNavigate();
  
  const navigateToConversation = useCallback((id: string) => {
    navigate(ROUTES.CONVERSATION_DETAIL(id));
  }, [navigate]);
  
  const navigateToNewConversation = useCallback(() => {
    navigate(ROUTES.CONVERSATION_NEW);
  }, [navigate]);
  
  return {
    navigateToConversation,
    navigateToNewConversation
  };
} 