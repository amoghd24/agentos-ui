import * as React from "react";
import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/blocks/conversation/EmptyState";
import { ErrorDisplay } from "@/components/blocks/common/ErrorDisplay";
import { AgentTableView } from "./AgentTableView";
import { AgentGridView } from "./AgentGridView";
import { Prompt } from "@/types/prompt";

interface AgentsContentProps {
  agents: Prompt[];
  isLoading: boolean;
  error: unknown;
  viewMode: "table" | "grid";
  onEdit(id: string): void;
  onDelete(id: string): void;
}

export const AgentsContent: React.FC<AgentsContentProps> = ({
  agents,
  isLoading,
  error,
  viewMode,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <LoadingState message="Loading agents..." />;
  }

  if (error) {
    return (
      <ErrorDisplay message={`Error loading agents: ${(error as Error).message}`} />
    );
  }

  if (agents.length === 0) {
    return <EmptyState message="No agents found" />;
  }

  const viewProps = {
    prompts: agents,
    onEdit,
    onDelete,
  } as const;

  return viewMode === "table" ? (
    <AgentTableView {...viewProps} />
  ) : (
    <AgentGridView {...viewProps} />
  );
}; 