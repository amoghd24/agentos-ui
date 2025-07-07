import { useState, useEffect } from 'react';
import { detectBrowserbaseUrl } from '@/utils/browserbase';

/**
 * Hook for integrating Browserbase functionality in the playground
 * @param aiResponse The AI response text to analyze for Browserbase URLs
 * @returns Object containing Browserbase integration state and functions
 */
export function useBrowserbaseIntegration(aiResponse: string | null) {
  // State to track detected Browserbase URL
  const [browserbaseUrl, setBrowserbaseUrl] = useState<string | null>(null);
  
  // Effect to detect Browserbase URLs in AI responses
  useEffect(() => {
    console.log('[Browserbase] aiResponse changed:', typeof aiResponse, aiResponse?.slice(0, 100));
    
    if (aiResponse) {
      // Look for URLs containing "browserbase" for debugging
      const containsBrowserbase = aiResponse.includes('browserbase');
      console.log('[Browserbase] Contains "browserbase":', containsBrowserbase);
      
      if (containsBrowserbase) {
        console.log('[Browserbase] Full response:', aiResponse);
      }
      
      const url = detectBrowserbaseUrl(aiResponse);
      console.log('[Browserbase] URL detection result:', url);
      
      if (url !== browserbaseUrl) {
        console.log('[Browserbase] Setting new URL:', url);
        setBrowserbaseUrl(url);
      }
    } else {
      console.log('[Browserbase] aiResponse is null/empty');
    }
  }, [aiResponse, browserbaseUrl]);

  // Function to clear the Browserbase URL (e.g., when ending a session)
  const clearBrowserbaseUrl = () => {
    console.log('[Browserbase] Clearing URL');
    setBrowserbaseUrl(null);
  };

  return {
    browserbaseUrl,
    hasBrowserbaseUrl: !!browserbaseUrl,
    clearBrowserbaseUrl
  };
} 