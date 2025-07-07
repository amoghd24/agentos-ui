import * as React from "react";
import { HeaderLeft, HeaderRight } from "./header";
import { AppHeaderProps } from "@/types";

/**
 * Unified header component that can adapt to various use cases across the application
 */
export function AppHeader({
  // Common props
  title,
  className = "",
  
  // Optional content props
  subtitle,
  icon,
  actions,
  
  // Back button
  showBackButton = false,
  onBackClick,
  
  // Avatar
  showAvatar = false,
  
  // Reset button
  showReset = false,
  onResetClick,
  
  // Add button
  showAddButton = false,
  onAddClick,
  addButtonLabel = "Add",
  
  // View mode toggle
  showViewModeToggle = false,
  viewMode = 'table',
  onViewModeChange,
  
  // State
  loading = false,
  error = false,
}: AppHeaderProps) {
  // Different layouts based on usage pattern
  const isConversationStyle = showBackButton && (showReset || showAvatar);
  const isPageStyle = showAddButton || showViewModeToggle;
  
  return (
    <div className={`flex items-center ${isConversationStyle ? 'gap-2 p-2 border-b' : 'justify-between'} ${className}`}>
      <HeaderLeft
        title={title}
        subtitle={subtitle}
        icon={icon}
        showBackButton={showBackButton}
        onBackClick={onBackClick}
        showAvatar={showAvatar}
        isConversationStyle={isConversationStyle}
        isPageStyle={isPageStyle}
        loading={loading}
        error={error}
      />
      
      {/* Flexible spacer */}
      {!isPageStyle && <div className="flex-1"></div>}
      
      <HeaderRight
        actions={actions}
        showReset={showReset}
        onResetClick={onResetClick}
        showAddButton={showAddButton}
        onAddClick={onAddClick}
        addButtonLabel={addButtonLabel}
        showViewModeToggle={showViewModeToggle}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
        isConversationStyle={isConversationStyle}
        isPageStyle={isPageStyle}
      />
    </div>
  );
} 