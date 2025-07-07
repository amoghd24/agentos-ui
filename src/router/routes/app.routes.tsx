import { RouteObject } from "react-router-dom";
import React from "react";
import { ROUTES, createRouteWithMeta, RouteWithMeta, flattenRoutes } from "@/lib/utils/route-utils";

// Page components imports
import DashboardPage from "@/pages/dashboard";
import AIProvidersPage from "@/pages/ai-providers";
import AgentsPage from "@/pages/agents";
import PlaygroundPage from "@/pages/playground";
import ConversationsPage from "@/pages/conversations";
import ConversationDetailsPage from "@/pages/conversation-details";
import ConversationPlaceholder from "@/pages/conversation-placeholder";
import AgentChatPage from "@/pages/agent-chat";

/**
 * Main application routes configuration
 * All of these routes require authentication and are rendered within MainLayout
 */
export const appRoutes: RouteObject[] = [
  // Dashboard routes - HOME and DASHBOARD point to the same component
  ...flattenRoutes(createRouteWithMeta([ROUTES.HOME, ROUTES.DASHBOARD], <DashboardPage />)),
  createRouteWithMeta(ROUTES.AI_PROVIDERS, <AIProvidersPage />),
  createRouteWithMeta(ROUTES.AGENTS, <AgentsPage />),
  createRouteWithMeta(ROUTES.PLAYGROUND, <PlaygroundPage />),
  createRouteWithMeta(ROUTES.PLAYGROUND_DETAIL(':id'), <PlaygroundPage />),
  createRouteWithMeta(ROUTES.PROMPTS_EDIT(':promptId'), <PlaygroundPage />),
  createRouteWithMeta(ROUTES.PROMPTS(':id'), <AgentChatPage />),
  createRouteWithMeta(ROUTES.CONVERSATIONS, <ConversationsPage />, {
    children: [
      createRouteWithMeta("", <ConversationPlaceholder />, { index: true }),
      createRouteWithMeta(":id", <ConversationDetailsPage />)
    ]
  }),
]; 