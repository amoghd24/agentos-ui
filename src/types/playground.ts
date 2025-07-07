export interface PlaygroundFormState {
  promptId?: string;
  promptName: string;
  promptText: string;
  isDirty: boolean;
  isSaving: boolean;
  handlePromptNameChange: (value: string) => void;
  handlePromptTextChange: (value: string) => void;
  handleSavePrompt: () => Promise<string | undefined>;
  handleBack: () => void;
}

export interface ModelSettings {
  isOpen: boolean;
  settings: {
    model: string;
    temperature: number;
    maxTokens: number;
  };
  availableModels: { value: string; label: string }[];
  openSettings: () => void;
  closeSettings: () => void;
  updateModel: (model: string) => void;
  updateTemperature: (temp: number) => void;
  updateMaxTokens: (tokens: number) => void;
  saveSettings: () => void;
}

export interface PlaygroundExecutionState {
  userMessage: string;
  currentMessage: string;
  aiResponse: string | null;
  isRunning: boolean;
  pendingUserMessage: string | null;
  responseMetadata: Record<string, any>;
  conversation: any[]; // Would be more specific in a real implementation
  selectedProvider: string;
  modelSettings: ModelSettings;
  handleUserMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCurrentMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleProviderChange: (provider: string) => void;
  runInitialPrompt: (id: string | undefined, message: string) => Promise<void>;
  continueConversation: (id: string | undefined, message: string) => Promise<void>;
  addToConversation: () => void;
  handleCopyResponse: () => void;
} 