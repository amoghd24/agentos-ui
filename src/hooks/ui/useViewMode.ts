import { useState, useEffect } from 'react';

type ViewMode = 'table' | 'grid' | 'list' | string;

interface UseViewModeOptions {
  storageKey?: string;
  defaultMode?: ViewMode;
}

/**
 * Custom hook for managing view mode with localStorage persistence
 * 
 * @param options Configuration options
 * @returns The current view mode and a setter function
 */
export function useViewMode(options: UseViewModeOptions = {}) {
  const { 
    storageKey = 'app-view-mode', 
    defaultMode = 'table' 
  } = options;
  
  // Initialize state from localStorage or default
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    const savedMode = typeof window !== 'undefined' 
      ? localStorage.getItem(storageKey) 
      : null;
    
    return (savedMode as ViewMode) || defaultMode;
  });
  
  // Update localStorage when viewMode changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, viewMode);
    }
  }, [viewMode, storageKey]);
  
  // Wrapper to type check the new mode
  const setViewMode = (newMode: ViewMode) => {
    setViewModeState(newMode);
  };
  
  return {
    viewMode,
    setViewMode,
  };
} 