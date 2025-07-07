import * as React from "react";

/**
 * Base props shared between header components
 */
export interface HeaderBaseProps {
  className?: string;
  loading?: boolean;
  error?: boolean;
}

/**
 * Props for the left section of the header
 */
export interface HeaderLeftProps extends HeaderBaseProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showAvatar?: boolean;
  isConversationStyle?: boolean;
  isPageStyle?: boolean;
}

/**
 * Props for the right section of the header
 */
export interface HeaderRightProps extends HeaderBaseProps {
  actions?: React.ReactNode;
  showReset?: boolean;
  onResetClick?: () => void;
  showAddButton?: boolean;
  onAddClick?: () => void;
  addButtonLabel?: string;
  showViewModeToggle?: boolean;
  viewMode?: 'table' | 'grid';
  onViewModeChange?: (mode: 'table' | 'grid') => void;
  isConversationStyle?: boolean;
  isPageStyle?: boolean;
}

/**
 * Unified header component props that can adapt to various use cases across the application
 */
export interface AppHeaderProps extends HeaderBaseProps {
  // Common props
  title: string;
  
  // Optional content props
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  
  // Back button
  showBackButton?: boolean;
  onBackClick?: () => void;
  
  // Avatar
  showAvatar?: boolean;
  
  // Reset button
  showReset?: boolean;
  onResetClick?: () => void;
  
  // Add button
  showAddButton?: boolean;
  onAddClick?: () => void;
  addButtonLabel?: string;
  
  // View mode toggle
  showViewModeToggle?: boolean;
  viewMode?: 'table' | 'grid';
  onViewModeChange?: (mode: 'table' | 'grid') => void;
} 