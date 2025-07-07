import * as React from "react";
import { Prompt } from "@/types/prompt";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

interface AgentTableViewProps {
  prompts: Prompt[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AgentTableView({ prompts, onEdit, onDelete }: AgentTableViewProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 dark:border-gray-800">
              <TableHead className="px-6 py-3 font-medium">Name</TableHead>
              <TableHead className="py-3 font-medium">Type</TableHead>
              <TableHead className="py-3 font-medium">Created By</TableHead>
              <TableHead className="py-3 font-medium">Status</TableHead>
              <TableHead className="px-6 py-3 font-medium text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prompts.map((prompt) => (
              <TableRow 
                key={prompt.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <TableCell className="px-6 py-4 font-medium">
                  <Button 
                    variant="link" 
                    className="p-0 h-auto font-medium text-foreground hover:text-primary hover:underline"
                    onClick={() => onEdit(prompt.id)}
                  >
                    {prompt.name || 'Unnamed'}
                  </Button>
                </TableCell>
                <TableCell className="py-4">{prompt.type || "Practice Agent"}</TableCell>
                <TableCell className="py-4">
                  {prompt.created_by ? 
                    `${prompt.created_by.first_name || ''} ${prompt.created_by.last_name || ''}` : 
                    'Unknown'}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        prompt.is_active ? "bg-emerald-500" : "bg-gray-400"
                      }`}
                    />
                    <span>{prompt.is_active ? "Active" : "Inactive"}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-8 w-8 rounded-full p-0 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    onClick={() => onDelete(prompt.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 