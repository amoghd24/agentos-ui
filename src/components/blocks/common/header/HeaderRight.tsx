import * as React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus, Grid, List } from "lucide-react";
import { HeaderRightProps } from "@/types";

export function HeaderRight({
  actions,
  showReset = false,
  onResetClick,
  showAddButton = false,
  onAddClick,
  addButtonLabel = "Add",
  showViewModeToggle = false,
  viewMode = 'table',
  onViewModeChange,
  isConversationStyle = false,
  isPageStyle = false,
  className = "",
}: HeaderRightProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Custom actions */}
      {actions}
      
      {/* View mode toggle */}
      {showViewModeToggle && onViewModeChange && (
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
      )}
      
      {/* Add button */}
      {showAddButton && onAddClick && (
        <Button onClick={onAddClick}>
          <Plus className="mr-2 h-4 w-4" /> {addButtonLabel}
        </Button>
      )}
      
      {/* Reset button */}
      {showReset && onResetClick && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetClick}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Reset</span>
        </Button>
      )}
    </div>
  );
} 