import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { HeaderLeftProps } from "@/types";

export function HeaderLeft({
  title,
  subtitle,
  icon,
  showBackButton = false,
  onBackClick,
  showAvatar = false,
  isConversationStyle = false,
  isPageStyle = false,
  loading = false,
  error = false,
  className = "",
}: HeaderLeftProps) {
  // Handle loading and error states
  const displayTitle = loading ? "Loading..." : error ? "Error" : title || "Untitled";
  const firstLetter = typeof title === 'string' && title ? title[0].toUpperCase() : "?";
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showBackButton && onBackClick && (
        <Button 
          variant="ghost" 
          size={isConversationStyle ? "icon" : "default"}
          onClick={onBackClick}
          className={isConversationStyle ? "h-8 w-8" : "mr-2"}
        >
          <ChevronLeft className={isConversationStyle ? "h-4 w-4" : "h-5 w-5"} />
          <span className="sr-only">Back</span>
        </Button>
      )}
      
      {/* Icon (if provided) */}
      {icon && !showAvatar && (
        <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-md">
          {icon}
        </div>
      )}
      
      {/* Avatar (only in conversation style) */}
      {showAvatar && (
        <Avatar>
          <span>{firstLetter}</span>
        </Avatar>
      )}
      
      {/* Title and subtitle */}
      <div>
        <h1 className={isPageStyle ? "text-2xl font-light" : "text-lg font-medium truncate"}>
          {displayTitle}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
} 