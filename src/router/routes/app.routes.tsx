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
  //@ts-ignore
  ...flattenRoutes(createRouteWithMeta([ROUTES.HOME, ROUTES.DASHBOARD], <DashboardPage />)),
  // createRouteWithMeta(ROUTES.AI_PROVIDERS, <AIProvidersPage />),
  //@ts-ignore
  createRouteWithMeta(ROUTES.AGENTS, <AgentsPage />),
  //@ts-ignore
  createRouteWithMeta(ROUTES.PLAYGROUND, <PlaygroundPage />),
  //@ts-ignore
  createRouteWithMeta(ROUTES.PLAYGROUND_DETAIL(':id'), <PlaygroundPage />),
  //@ts-ignore
  createRouteWithMeta(ROUTES.PROMPTS_EDIT(':promptId'), <PlaygroundPage />),
  //@ts-ignore
  createRouteWithMeta(ROUTES.PROMPTS(':id'), <AgentChatPage />),
  // Direct route to MCP Agent Chat - no parameters required
  //@ts-ignore
  createRouteWithMeta(ROUTES.AGENT_CHAT, <AgentChatPage />),
  // createRouteWithMeta(ROUTES.CONVERSATIONS, <ConversationsPage />, {
  //   children: [
  //     createRouteWithMeta("", <ConversationPlaceholder />, { index: true }),
  //     createRouteWithMeta(":id", <ConversationDetailsPage />)
  //   ]
  // }),
]; 