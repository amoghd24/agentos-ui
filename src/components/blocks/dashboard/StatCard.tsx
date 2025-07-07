import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-dark-hover flex items-center justify-center">
            <Icon
              className="h-5 w-5 text-gray-900 dark:text-dark-text-primary"
              strokeWidth={1.5}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-gray-500 dark:text-dark-text-tertiary mb-1">
              {label}
            </div>
            <div className="flex items-baseline gap-3">
              <div className="text-2xl font-light text-gray-900 dark:text-dark-text-primary">
                {value}
              </div>
              {trend && (
                <div className="flex items-center gap-1">
                  <TrendingUp
                    className="h-3.5 w-3.5 text-emerald-500"
                    strokeWidth={1.5}
                  />
                  <span className="text-xs font-medium text-emerald-500">
                    {trend}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 