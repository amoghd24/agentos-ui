import {
  Bot,
  Command,
  Settings2,
  LayoutDashboard,
  MessageSquare,
  Wrench,
  BotMessageSquare,
} from "lucide-react"
import { Link } from "react-router-dom"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

// Logo import
import amplitudeLogo from "@/assets/amlitudeLogo.png"

// This is sample data.
const data = {
  user: {
    name: "Amogh",
    email: "amogh@agentos.com",
    avatar: "/vite.svg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Agents",
      url: "/agents",
      icon: Bot,
      isActive: true,
    },
    {
      title: "Tools",
      url: "/tools",
      icon: Wrench,
      isActive: true,
    },
    // {
    //   title: "Conversations",
    //   url: "/conversations",
    //   icon: MessageSquare,
    //   isActive: true,
    // },
    // {
    //   title: "Integrations",
    //   url: "/integrations",
    //   icon: Settings2,
    //   isActive: true,
    // },
    // {
    //   title: "Evals",
    //   url: "/evals",
    //   icon: Settings2,
    //   isActive: true,
    // },
    // {
    //   title: "AI Providers",
    //   url: "/ai-providers",
    //   icon: BotMessageSquare,
    //   isActive: true,
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent">
                  <img src={amplitudeLogo} alt="Amplitude Logo" className="size-8" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Agentos</span>
                  <span className="truncate text-xs">Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
