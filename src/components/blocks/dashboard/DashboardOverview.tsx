import { useNavigate } from "react-router-dom";
// import { usePrompts } from "@/hooks/prompts/usePrompts";
// import { usePractice } from "@/hooks/prompts/usePractice";
import { StatsOverview } from "./StatsOverview";
import { ActiveAgentsTable } from "./ActiveAgentsTable";
import { Prompt } from "@/types/prompt";

export function DashboardOverview() {
  // Legacy code - commented out
  // const { prompts, loading, error, weeklyPrompts } = usePrompts();
  // const { createPracticeAndNavigate } = usePractice();
  const navigate = useNavigate();
  
  // Simplified MCP handling
  const handleMcpClick = () => {
    navigate("/agent-chat");
  };
  
  // Create default MCP agent
  const displayPrompts = [{
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
      <StatsOverview weeklyPrompts={0} />

      {/* Active Agents Table */}
      <ActiveAgentsTable
        prompts={displayPrompts}
        loading={false}
        error={null}
        onAgentClick={handleMcpClick}
      />
    </div>
  );
} 