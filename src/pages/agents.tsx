import * as React from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, AgentTableView, AgentGridView, AgentsContent } from "@/components/blocks/agents";
import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/blocks/conversation/EmptyState";
import { DeleteConfirmationModal } from "@/components/blocks/common/DeleteConfirmationModal";
import { PageLayout } from "@/components/blocks/common/PageLayout";
import { useAgents } from "@/hooks/agents/useAgents";
import { useViewMode } from "@/hooks/ui/useViewMode";
import { useDeleteModal } from "@/hooks/ui/useDeleteModal";

export default function AgentsPage() {
  const navigate = useNavigate();
  
  // Use our custom hooks
  const { viewMode, setViewMode } = useViewMode({ 
    storageKey: 'agents-view-mode', 
    defaultMode: 'table' 
  });
  
  const { 
    agents, 
    isLoading, 
    error, 
    deleteAgent,
    isDeleting 
  } = useAgents();
  
  const {
    isDeleteModalOpen,
    selectedItem: selectedPromptId,
    openDeleteModal,
    closeDeleteModal,
    resetSelection
  } = useDeleteModal<string>();
  
  // Navigation handlers - memoized to prevent unnecessary re-renders
  const handleNewAgent = useCallback(() => navigate('/playground'), [navigate]);
  const handleEditAgent = useCallback((id: string) => navigate(`/prompts/edit/${id}`), [navigate]);
  
  // Simplified delete handler
  const handleDelete = async () => {
    if (!selectedPromptId) return;
    try {
      await deleteAgent(selectedPromptId);
      closeDeleteModal();
      resetSelection();
    } catch (error) {
      console.error("Delete agent error:", error);
    }
  };

  // Content is now handled by AgentsContent component
  const renderContent = () => (
    <AgentsContent
      agents={agents}
      isLoading={isLoading}
      error={error}
      viewMode={viewMode as "table" | "grid"}
      onEdit={handleEditAgent}
      onDelete={openDeleteModal}
    />
  );

  return (
    <PageLayout>
      <PageHeader 
        title="Agents" 
        viewMode={viewMode as 'table' | 'grid'}
        onViewModeChange={setViewMode}
        onAddClick={handleNewAgent}
      />
      {renderContent()}
      <DeleteConfirmationModal
        title="Delete Agent"
        description="Are you sure you want to delete this agent? This action cannot be undone."
        isOpen={isDeleteModalOpen}
        isDeleting={isDeleting}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
      />
    </PageLayout>
  );
} 