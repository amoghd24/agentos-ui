import { AreaChart, Clock } from "lucide-react";
import { StatCard } from "./StatCard";

interface StatsOverviewProps {
  weeklyPrompts: number;
}

export function StatsOverview({ weeklyPrompts }: StatsOverviewProps) {
  return (
    <div className="max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <StatCard
            label="Agents Onboarded This Week"
            value={weeklyPrompts.toString()}
            icon={AreaChart}
            trend="+15%"
          />
        </div>
        <div className="lg:col-span-2">
          <StatCard
            label="Time Saved with AI"
            value="127 hours"
            icon={Clock}
            trend="+32%"
          />
        </div>
      </div>
    </div>
  );
} 