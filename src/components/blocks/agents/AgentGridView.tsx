import * as React from "react";
import { Prompt } from "@/types/prompt";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { formatDate, truncateText } from "@/lib/utils";

interface AgentGridViewProps {
  prompts: Prompt[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function AgentGridView({ prompts, onEdit, onDelete }: AgentGridViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <Card key={prompt.id} className="overflow-hidden border border-gray-200 dark:border-gray-800">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-lg font-medium text-foreground hover:text-primary hover:underline"
                  onClick={() => onEdit(prompt.id)}
                >
                  {prompt.name || 'Unnamed'}
                </Button>
                <div className="flex gap-2">
                  <div className="flex items-center h-6">
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={prompt.is_active}
                        readOnly 
                      />
                      <div className={`w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500`}></div>
                    </label>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                {prompt.system_prompt ? truncateText(prompt.system_prompt, 150) : ''}
              </p>
            </div>
            <div className="flex border-t border-gray-100 dark:border-gray-800">
              <Button 
                variant="ghost"
                className="flex-1 h-10 rounded-none text-xs text-gray-500 hover:text-gray-700"
                onClick={() => onEdit(prompt.id)} 
              >
                <Edit className="h-3.5 w-3.5 mr-1.5" />
                Edit
              </Button>
              <div className="w-px bg-gray-100 dark:bg-gray-800"></div>
              <Button 
                variant="ghost"
                className="flex-1 h-10 rounded-none text-xs text-gray-500 hover:text-gray-700"
                onClick={() => onDelete(prompt.id)}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                Delete
              </Button>
            </div>
          </CardContent>
          <CardFooter className="p-3 text-xs text-gray-500 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex flex-col w-full">
              <span>Created by {prompt.created_by?.first_name || 'Unknown'} on {formatDate(prompt.created_at || '')}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
} 