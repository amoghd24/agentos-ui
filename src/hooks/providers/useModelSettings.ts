import { useState, useEffect } from 'react';
import { AI_MODELS, DEFAULT_TEMPERATURE, TEMPERATURE_RANGE } from '@/lib/constants';

interface ModelSettings {
  model: string;
  temperature: number;
  maxTokens: number;
}

interface ModelSettingsHookResult {
  isOpen: boolean;
  settings: ModelSettings;
  openSettings: () => void;
  closeSettings: () => void;
  updateModel: (model: string) => void;
  updateTemperature: (temperature: number) => void;
  updateMaxTokens: (maxTokens: number) => void;
  saveSettings: () => void;
  provider: string | null;
  setProvider: (provider: string | null) => void;
  availableModels: { value: string; label: string }[];
}

export function useModelSettings(): ModelSettingsHookResult {
  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  
  // Provider selection
  const [provider, setProvider] = useState<string | null>(null);
  
  // Settings state
  const [settings, setSettings] = useState<ModelSettings>({
    model: 'gpt-4', // Default model
    temperature: DEFAULT_TEMPERATURE,
    maxTokens: 2048, // Updated default value for max tokens
  });
  
  // Temporary settings (for editing)
  const [tempSettings, setTempSettings] = useState<ModelSettings>(settings);
  
  // Update temp settings when provider changes
  useEffect(() => {
    if (provider && AI_MODELS[provider as keyof typeof AI_MODELS]) {
      const providerModels = AI_MODELS[provider as keyof typeof AI_MODELS];
      if (providerModels && providerModels.length > 0) {
        // Set the first model for this provider as default
        setTempSettings(prev => ({
          ...prev,
          model: providerModels[0].value
        }));
      }
    }
  }, [provider]);
  
  // Get available models for the current provider
  const availableModels = provider && AI_MODELS[provider as keyof typeof AI_MODELS] 
    ? AI_MODELS[provider as keyof typeof AI_MODELS] 
    : [];
  
  // Open settings dialog
  const openSettings = () => {
    setTempSettings(settings);
    
    // If no provider is selected, use default models from OpenAI
    // This ensures the dropdown is never empty
    if (!provider || !availableModels.length) {
      // Set a default provider if none selected
      if (!provider) {
        setProvider('openai');
      }
    }
    
    setIsOpen(true);
  };
  
  // Close settings dialog
  const closeSettings = () => {
    setIsOpen(false);
  };
  
  // Update model
  const updateModel = (model: string) => {
    setTempSettings(prev => ({
      ...prev,
      model
    }));
  };
  
  // Update temperature
  const updateTemperature = (temperature: number) => {
    setTempSettings(prev => ({
      ...prev,
      temperature
    }));
  };
  
  // Update max tokens
  const updateMaxTokens = (maxTokens: number) => {
    setTempSettings(prev => ({
      ...prev,
      maxTokens
    }));
  };
  
  // Save settings and close dialog
  const saveSettings = () => {
    setSettings(tempSettings);
    setIsOpen(false);
  };
  
  return {
    isOpen,
    settings,
    openSettings,
    closeSettings,
    updateModel,
    updateTemperature,
    updateMaxTokens,
    saveSettings,
    provider,
    setProvider,
    availableModels
  };
} 