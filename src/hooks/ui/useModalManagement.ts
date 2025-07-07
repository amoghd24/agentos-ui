import { useState } from "react";
import { AiProvider } from "@/types/aiProvider";

export function useModalManagement(
  resetForm: () => void, 
  setFormForProvider: (provider: AiProvider) => void,
  setSelectedId: (id: string) => void
) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const modals = {
    add: {
      isOpen: isAddModalOpen,
      setIsOpen: setIsAddModalOpen,
      open: () => {
        resetForm();
        setIsAddModalOpen(true);
      },
      openForEdit: (provider: AiProvider) => {
        setFormForProvider(provider);
        setIsAddModalOpen(true);
      },
      close: () => {
        setIsAddModalOpen(false);
        resetForm();
      }
    },
    delete: {
      isOpen: isDeleteModalOpen,
      setIsOpen: setIsDeleteModalOpen,
      open: (id: string) => {
        setSelectedId(id);
        setIsDeleteModalOpen(true);
      },
      close: () => setIsDeleteModalOpen(false)
    }
  };

  return modals;
} 