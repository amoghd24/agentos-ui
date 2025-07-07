import { useState } from 'react';

interface UseDeleteModalResult<T> {
  isDeleteModalOpen: boolean;
  selectedItem: T | null;
  openDeleteModal: (item: T) => void;
  closeDeleteModal: () => void;
  resetSelection: () => void;
}

/**
 * Custom hook for managing delete confirmation modals
 * 
 * @returns Modal state and handlers
 */
export function useDeleteModal<T>(): UseDeleteModalResult<T> {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  
  const openDeleteModal = (item: T) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };
  
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  
  const resetSelection = () => {
    setSelectedItem(null);
  };
  
  return {
    isDeleteModalOpen,
    selectedItem,
    openDeleteModal,
    closeDeleteModal,
    resetSelection,
  };
} 