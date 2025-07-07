import { Routes, Route, useRoutes } from "react-router-dom";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme/toggle-theme";
import { AppBreadcrumbs } from "@/components/blocks/navigation";
import { appRoutes } from "@/router";

/**
 * Authenticated layout that renders the sidebar, header, and nested routes.
 */
export function MainLayout() {
  const routesElement = useRoutes(appRoutes);
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <AppBreadcrumbs />
          <div className="flex flex-1 justify-end">
            <ModeToggle />
          </div>
        </header>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          {routesElement}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MainLayout; 