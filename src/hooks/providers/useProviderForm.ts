import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import type { AiProvider } from '@/types/aiProvider';

interface ProviderFormState {
  name: string;
  key: string;
}

interface UseProviderFormResult {
  formState: ProviderFormState;
  isEditMode: boolean;
  showKey: boolean;
  selectedProviderId: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleToggleShowKey: () => void;
  setFormForProvider: (provider: AiProvider) => void;
  resetForm: () => void;
  setSelectedId: (id: string) => void;
}

export function useProviderForm(): UseProviderFormResult {
  const [formState, setFormState] = useState<ProviderFormState>({
    name: "",
    key: "",
  });
  const [showKey, setShowKey] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);

  // Reset form state
  const resetForm = () => {
    setFormState({ name: "", key: "" });
    setShowKey(false);
    setIsEditMode(false);
    setSelectedProviderId(null);
  };

  // Set form for editing a provider
  const setFormForProvider = (provider: AiProvider) => {
    setIsEditMode(true);
    setSelectedProviderId(provider.id);
    setFormState({
      name: provider.name,
      key: provider.plain_key || "",
    });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  // Toggle showing the key
  const handleToggleShowKey = () => {
    setShowKey(!showKey);
  };

  // Set the selected provider ID
  const setSelectedId = (id: string) => {
    setSelectedProviderId(id);
  };

  return {
    formState,
    isEditMode,
    showKey,
    selectedProviderId,
    handleInputChange,
    handleToggleShowKey,
    setFormForProvider,
    resetForm,
    setSelectedId,
  };
}

export default useProviderForm; 