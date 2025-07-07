import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Grid, List } from "lucide-react";

interface PageHeaderProps {
  title: string;
  viewMode: 'table' | 'grid';
  onViewModeChange: (mode: 'table' | 'grid') => void;
  onAddClick: () => void;
}

export function PageHeader({
  title,
  viewMode,
  onViewModeChange,
  onAddClick
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-light">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
          <Button 
            variant={viewMode === 'table' ? "default" : "ghost"} 
            size="sm" 
            className="h-8 w-8 p-0 rounded"
            onClick={() => onViewModeChange('table')}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">Table View</span>
          </Button>
          <Button 
            variant={viewMode === 'grid' ? "default" : "ghost"} 
            size="sm" 
            className="h-8 w-8 p-0 rounded"
            onClick={() => onViewModeChange('grid')}
          >
            <Grid className="h-4 w-4" />
            <span className="sr-only">Grid View</span>
          </Button>
        </div>
        <Button onClick={onAddClick}>
          <Plus className="mr-2 h-4 w-4" /> Add Agent
        </Button>
      </div>
    </div>
  );
} 