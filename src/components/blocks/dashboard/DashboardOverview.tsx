import { usePrompts } from "@/hooks/prompts/usePrompts";
import { usePractice } from "@/hooks/prompts/usePractice";
import { StatsOverview } from "./StatsOverview";
import { ActiveAgentsTable } from "./ActiveAgentsTable";

export function DashboardOverview() {
  const { prompts, loading, error, weeklyPrompts } = usePrompts();
  const { createPracticeAndNavigate } = usePractice();

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
        prompts={prompts}
        loading={loading}
        error={error}
        onAgentClick={createPracticeAndNavigate}
      />
    </div>
  );
} 