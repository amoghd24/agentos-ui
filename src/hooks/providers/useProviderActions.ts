import { toast } from "@/components/ui/use-toast";
import { AiProvider } from "@/types/aiProvider";

// Define the FormState type here as we don't know the exact type from useProviderForm
type FormState = {
  name: string;
  key: string;
  [key: string]: any;
};

type ProviderActionsProps = {
  formState: FormState;
  selectedProviderId: string | null;
  createProvider: (data: { name: string; key: string }) => Promise<AiProvider>;
  updateProvider: (data: { id: string; name: string; key: string }) => Promise<AiProvider>;
  deleteProvider: (id: string) => Promise<void>;
  resetForm: () => void;
  setIsAddModalOpen: (isOpen: boolean) => void;
  setIsDeleteModalOpen: (isOpen: boolean) => void;
};

export function useProviderActions({
  formState,
  selectedProviderId,
  createProvider,
  updateProvider,
  deleteProvider,
  resetForm,
  setIsAddModalOpen,
  setIsDeleteModalOpen
}: ProviderActionsProps) {
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (selectedProviderId) {
        // For editing, if the key field is empty, we're not updating the key
        const updateData = {
          id: selectedProviderId,
          name: formState.name,
          key: formState.key || '' // Send empty string if no key provided
        };
        
        await updateProvider(updateData);
        toast({
          title: "Success",
          description: "Provider updated successfully!",
        });
      } else {
        // For new providers, key is required
        if (!formState.key) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "API key is required",
          });
          return;
        }
        
        await createProvider({
          name: formState.name,
          key: formState.key,
        });
        toast({
          title: "Success",
          description: "Provider added successfully!",
        });
      }
      
      setIsAddModalOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error saving provider:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to save provider: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    }
  };

  // Handle provider deletion
  const handleDelete = async () => {
    if (selectedProviderId) {
      try {
        await deleteProvider(selectedProviderId);
        toast({
          title: "Success",
          description: "Provider deleted successfully!",
        });
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting provider:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to delete provider: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
      }
    }
  };

  return { handleSubmit, handleDelete };
} 