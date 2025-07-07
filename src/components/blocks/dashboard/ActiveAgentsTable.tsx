import { Play } from "lucide-react";
import { Prompt } from "@/types/prompt";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as React from "react";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorDisplay } from "@/components/blocks/common/ErrorDisplay";
import { PlaceholderState } from "@/components/blocks/common/PlaceholderState";

interface ActiveAgentsTableProps {
  prompts: Prompt[];
  loading: boolean;
  error: string | null;
  onAgentClick: (prompt: Prompt) => void;
}

const RowBase = ({ prompt, onAgentClick }: { prompt: Prompt; onAgentClick: (prompt: Prompt) => void }) => (
  <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
    <TableCell className="font-medium">
      <Button
        variant="link"
        className="p-0 h-auto font-medium text-foreground hover:text-primary hover:underline"
        onClick={() => onAgentClick(prompt)}
      >
        {prompt.name || "Unnamed Agent"}
      </Button>
    </TableCell>
    <TableCell className="text-right">
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full"
        onClick={() => onAgentClick(prompt)}
      >
        <Play className="h-4 w-4" />
        <span className="sr-only">Run</span>
      </Button>
    </TableCell>
  </TableRow>
);

const MemoRowBase = React.memo(RowBase);

export function ActiveAgentsTable({ 
  prompts, 
  loading, 
  error, 
  onAgentClick 
}: ActiveAgentsTableProps) {
  
  const AgentRowComponent = prompts.length > 20 ? MemoRowBase : RowBase;

  const renderContent = () => {
    if (loading) {
      return <LoadingState message="Loading agents..." />;
    }

    if (error) {
      return <ErrorDisplay message={`Error loading agents: ${error}`} />;
    }

    if (prompts.length === 0) {
      return (
        <PlaceholderState
          icon={Play}
          title="No agents found"
          description="Create your first agent to see it listed here."
        />
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Agent</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {prompts.map((prompt) => (
            <AgentRowComponent key={prompt.id} prompt={prompt} onAgentClick={onAgentClick} />
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Agents</CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
} 