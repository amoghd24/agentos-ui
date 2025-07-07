import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AiProvider } from "@/types/aiProvider";
import { LoadingState } from "@/components/ui/loading-state";
import { EmptyState } from "@/components/blocks/conversation/EmptyState";
import { formatDate } from "@/lib/utils";
import { getProviderLabel } from "@/lib/constants";

interface AIProviderTableProps {
  providers: AiProvider[];
  isLoading: boolean;
  error: any;
  onEdit: (provider: AiProvider) => void;
  onDelete: (id: string) => void;
}

export function AIProviderTable({
  providers,
  isLoading,
  error,
  onEdit,
  onDelete
}: AIProviderTableProps) {
  return (
    <Card className="px-6">
      <CardContent className="p-0 py-6">
        {isLoading ? (
          <LoadingState message="Loading providers..." className="p-8" />
        ) : error ? (
          <div className="p-8 text-center text-red-500">
            Error loading providers. Please try again.
          </div>
        ) : providers.length === 0 ? (
          <EmptyState message="No AI providers configured yet. Click 'Add Key' to add your first provider." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/5">Name</TableHead>
                <TableHead className="w-1/3">Status</TableHead>
                <TableHead className="w-1/5">Created</TableHead>
                <TableHead className="w-1/4 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providers.map((provider) => (
                <TableRow key={provider.id}>
                  <TableCell className="font-medium">
                    {getProviderLabel(provider.name)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          provider.status === "Configured"
                            ? "bg-emerald-500"
                            : provider.status === "Error"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      />
                      <span className="capitalize">{provider.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(provider.created)}</TableCell>
                  <TableCell className="text-right pr-6">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onEdit(provider)}
                        title="Edit Provider"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onDelete(provider.id)}
                        title="Delete Provider"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
} 