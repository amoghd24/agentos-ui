/**
 * Constants used throughout the application
 */

// Available AI Providers
export const AI_PROVIDERS = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
  { value: "cohere", label: "Cohere" },
  { value: "mistral", label: "Mistral" },
  { value: "naehas", label: "Naehas" },
  { value: "browserbase", label: "Browserbase" },
];

/**
 * Helper function to get provider label from value
 */
export function getProviderLabel(value: string): string {
  const provider = AI_PROVIDERS.find(p => p.value === value);
  return provider ? provider.label : value;
}

// AI Models by provider
export const AI_MODELS = {
  openai: [
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" }
  ],
  anthropic: [
    { value: "claude-3-opus", label: "Claude 3 Opus" },
    { value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
    { value: "claude-2", label: "Claude 2" }
  ],
  mistral: [
    { value: "mistral-small", label: "Mistral Small" },
    { value: "mistral-medium", label: "Mistral Medium" },
    { value: "mistral-large", label: "Mistral Large" }
  ],
  browserbase: [
    { value: "browserbase", label: "Browserbase" }
  ]
};

// Default temperature settings
export const DEFAULT_TEMPERATURE = 0.7;
export const TEMPERATURE_RANGE = {
  min: 0,
  max: 1,
  step: 0.1
};

// API Related Constants
export const API_ENDPOINTS = {
  AI_PROVIDERS: '/api/v1/providers',
  PROMPTS: '/api/v1/prompts',
  CONVERSATIONS: '/api/v1/practices',
};

// Toast timeout durations
export const TOAST_DURATIONS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
}; 