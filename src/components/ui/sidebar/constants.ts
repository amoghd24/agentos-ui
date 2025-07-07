import { LayoutDashboard, Bot, MessageSquare, Wrench, Settings2, BotMessageSquare } from "lucide-react"
import type { SidebarSectionConfig } from "@/types/sidebar"

// Default sidebar navigation used when no children are passed to <SidebarMenu />
export const SIDEBAR_SECTIONS: SidebarSectionConfig[] = [
  {
    id: "platform",
    title: "Platform",
    collapsible: false,
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        to: "/dashboard",
        Icon: LayoutDashboard,
      },
      {
        id: "agents",
        label: "Agents",
        to: "/agents",
        Icon: Bot,
      },
      {
        id: "conversations",
        label: "Conversations",
        to: "/conversations",
        Icon: MessageSquare,
      },
      {
        id: "tools",
        label: "Tools",
        to: "/tools",
        Icon: Wrench,
      },
      {
        id: "integrations",
        label: "Integrations",
        to: "/integrations",
        Icon: Settings2,
      },
      {
        id: "ai-providers",
        label: "AI Providers",
        to: "/ai-providers",
        Icon: BotMessageSquare,
      },
    ],
  },
] 