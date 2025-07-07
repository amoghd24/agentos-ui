import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Practice } from "@/types/conversation";
import { safeToString, formatDate } from "@/lib/utils";

interface ConversationItemProps {
  practice: Practice;
  isActive: boolean;
}

/**
 * ConversationItem component displays a single conversation in the sidebar
 */
export function ConversationItem({ practice, isActive }: ConversationItemProps) {
  return (
    <Link 
      to={`/conversations/${practice.id}`}
      className="block"
    >
      <Card 
        className={`hover:bg-accent/20 cursor-pointer transition-colors ${
          isActive ? "bg-accent/15 border-primary/30" : ""
        }`}
      >
        <CardContent className="p-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">
                {safeToString(practice.name)}
              </h3>
              <div className="flex items-center mt-1">
                <p className="text-xs text-muted-foreground truncate">
                  {practice.created_at && formatDate(practice.created_at)}
                </p>
                <Separator orientation="vertical" className="mx-2 h-3" />
                <Badge 
                  variant={practice.is_active ? "default" : "outline"}
                  className="text-[10px] h-4"
                >
                  {practice.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 