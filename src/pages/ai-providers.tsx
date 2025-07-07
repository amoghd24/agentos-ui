import * as React from "react";
import { useAiProviders } from "@/hooks/providers/useAiProviders";
import { useProviderForm } from "@/hooks/providers/useProviderForm";
import { useProviderActions } from "@/hooks/providers/useProviderActions";
import { useModalManagement } from "@/hooks/ui/useModalManagement";
import { AIProviderHeader } from "@/components/blocks/ai-providers/AIProviderHeader";
import { AIProviderTable } from "@/components/blocks/ai-providers/AIProviderTable";
import { AddEditProviderModal } from "@/components/blocks/ai-providers/AddEditProviderModal";
import { DeleteConfirmationModal } from "@/components/blocks/common/DeleteConfirmationModal";
import { PageLayout } from "@/components/blocks/common/PageLayout";
import { AI_PROVIDERS } from "@/lib/constants";

export default function AIProvidersPage() {
  // Use our custom hooks for form state and API data
  const {
    formState,
    isEditMode,
    showKey, 
    selectedProviderId,
    handleInputChange,
    handleToggleShowKey,
    setFormForProvider,
    resetForm,
    setSelectedId
  } = useProviderForm();
  
  // Use hook for providers data and operations
  const {
    providers,
    isLoading,
    error,
    createProvider,
    isCreating,
    updateProvider,
    isUpdating,
    deleteProvider,
    isDeleting,
  } = useAiProviders();

  // Use our modal management hook
  const modals = useModalManagement(resetForm, setFormForProvider, setSelectedId);

  // Create a wrapper for deleteProvider to handle the return type
  const deleteProviderWrapper = async (id: string): Promise<void> => {
    await deleteProvider(id);
    return;
  };

  // Use our provider actions hook
  const { handleSubmit, handleDelete } = useProviderActions({
    formState,
    selectedProviderId,
    createProvider,
    updateProvider,
    deleteProvider: deleteProviderWrapper,
    resetForm,
    setIsAddModalOpen: modals.add.setIsOpen,
    setIsDeleteModalOpen: modals.delete.setIsOpen
  });

  // Group table props for cleaner JSX
  const tableProps = {
    providers,
    isLoading,
    error,
    onEdit: modals.add.openForEdit,
    onDelete: modals.delete.open
  };

  // Group modal props for cleaner JSX
  const addModalProps = {
    isOpen: modals.add.isOpen,
    isEditMode,
    onClose: modals.add.close,
    formState,
    showKey,
    onToggleShowKey: handleToggleShowKey,
    onInputChange: handleInputChange,
    onSubmit: handleSubmit,
    isLoading: isCreating || isUpdating,
    providers: AI_PROVIDERS
  };

  return (
    <PageLayout>
      <AIProviderHeader onAddClick={modals.add.open} />
      <AIProviderTable {...tableProps} />
      <AddEditProviderModal {...addModalProps} />
      <DeleteConfirmationModal
        title="Delete Provider"
        description="Are you sure you want to delete this AI provider? This action cannot be undone."
        isOpen={modals.delete.isOpen}
        isDeleting={isDeleting}
        onClose={modals.delete.close}
        onConfirm={handleDelete}
      />
    </PageLayout>
  );
} 