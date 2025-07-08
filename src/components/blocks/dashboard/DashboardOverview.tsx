import { usePrompts } from "@/hooks/prompts/usePrompts";
import { usePractice } from "@/hooks/prompts/usePractice";
import { StatsOverview } from "./StatsOverview";
import { ActiveAgentsTable } from "./ActiveAgentsTable";
import { Prompt } from "@/types/prompt";

export function DashboardOverview() {
  const { prompts, loading, error, weeklyPrompts } = usePrompts();
  const { createPracticeAndNavigate } = usePractice();

  // Create default MCP agent when no agents are available or when there's an error
  const displayPrompts = (prompts.length > 0 && !error) ? prompts : [{
    id: "default-mcp",
    name: "MCP",
    system_prompt: "Default system agent",
    is_active: true,
    created_by: {
      first_name: "System",
      last_name: "Agent",
      username: "system"
    },
    type: "agent"
  }] as Prompt[];

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light text-gray-900 dark:text-dark-text-primary">
          Dashboard Overview
        </h1>
      </div>

      {/* Stats Cards */}
      <StatsOverview weeklyPrompts={weeklyPrompts} />

      {/* Active Agents Table */}
      <ActiveAgentsTable
        prompts={displayPrompts}
        loading={loading}
        error={null} // Pass null to prevent error display
        onAgentClick={createPracticeAndNavigate}
      />
    </div>
  );
} 