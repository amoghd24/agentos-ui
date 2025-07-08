/**
 * Route utility functions for route definition and navigation
 */
import React from 'react';
import { RouteObject } from 'react-router-dom';

/**
 * Centralized route paths
 */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  AI_PROVIDERS: '/ai-providers',
  AGENTS: '/agents',
  PLAYGROUND: '/playground',
  PLAYGROUND_DETAIL: (id: string) => `/playground/${id}`,
  PROMPTS_EDIT: (promptId: string) => `/prompts/edit/${promptId}`,
  PROMPTS: (id: string) => `/prompts/${id}`,
  AGENT_CHAT: '/agent-chat', // Direct route for MCP Agent Chat
  CONVERSATIONS: '/conversations',
  CONVERSATION_DETAIL: (id: string) => `/conversations/${id}`,
  CONVERSATION_NEW: '/conversations/new',
  LOGIN: '/login'
} as const;

/**
 * Maps route paths to their display names - centralized title definitions
 */
export const ROUTE_DISPLAY_NAMES: Record<string, string> = {
  [ROUTES.HOME]: "Dashboard",
  [ROUTES.DASHBOARD]: "Dashboard",
  [ROUTES.AI_PROVIDERS]: "AI Providers",
  [ROUTES.AGENTS]: "Agents",
  [ROUTES.PLAYGROUND]: "Create Prompt",
  [ROUTES.CONVERSATIONS]: "Conversations",
  [ROUTES.LOGIN]: "Login",
  [ROUTES.AGENT_CHAT]: "MCP Agent", // Display name for MCP Agent Chat
  // Dynamic routes - these are used as fallbacks for routes with parameters
  "playground/:id": "Edit Prompt",
  "prompts/edit/:promptId": "Edit Prompt",
  "prompts/:id": "Prompt Chat",
  "conversations/:id": "Conversation Details",
  "": "Select Conversation"
};

/**
 * Extended RouteObject with additional metadata
 */
export type RouteWithMeta = RouteObject & {
  meta?: {
    title?: string;
    icon?: React.ComponentType<any>;
    auth?: boolean;
    [key: string]: any;
  };
};

/**
 * Helper to flatten routes returned from createRouteWithMeta
 */
export const flattenRoutes = (routes: RouteWithMeta | RouteWithMeta[]): RouteWithMeta[] => {
  if (Array.isArray(routes)) return routes;
  return [routes];
};

/**
 * Creates a route with metadata
 */
export function createRouteWithMeta(
  path: string | string[],
  element: React.ReactNode,
  options: {
    children?: RouteWithMeta[];
    title?: string;
    [key: string]: any;
  } = {}
): RouteWithMeta | RouteWithMeta[] {
  const { children, title, ...rest } = options;
  
  // If we have multiple paths, create a route for each
  if (Array.isArray(path)) {
    return path.map(p => createRouteWithMeta(p, element, options) as RouteWithMeta);
  }
  
  // Use explicit title or fallback to ROUTE_DISPLAY_NAMES or path
  const routeTitle = title || ROUTE_DISPLAY_NAMES[path] || path;
  
  return {
    path,
    element,
    ...(children ? { children } : {}),
    meta: {
      title: routeTitle,
      ...rest
    }
  };
}

/**
 * Gets the page title based on the current path
 */
export function getPageTitle(pathname: string): string {
  // Handle exact matches
  if (ROUTE_DISPLAY_NAMES[pathname]) {
    return ROUTE_DISPLAY_NAMES[pathname];
  }
  
  // Check for dynamic route patterns
  for (const [pattern, title] of Object.entries(ROUTE_DISPLAY_NAMES)) {
    if (pattern.includes(':') && matchDynamicRoute(pathname, pattern)) {
      return title;
    }
  }
  
  // Default to capitalized last segment
  const pathSegments = pathname.split("/").filter(Boolean);
  const lastSegment = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : "";
  return lastSegment
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") || "Dashboard";
}

/**
 * Simple utility to match a pathname against a dynamic route pattern
 */
function matchDynamicRoute(pathname: string, pattern: string): boolean {
  const patternParts = pattern.split('/');
  const pathParts = pathname.split('/');
  
  if (patternParts.length !== pathParts.length) return false;
  
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) continue; // Skip parameter parts
    if (patternParts[i] !== pathParts[i]) return false;
  }
  
  return true;
} 