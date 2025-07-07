import * as React from "react"
import { ChevronRight } from "lucide-react"
import type { SidebarSectionConfig } from "@/types/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "./sidebar-menu"
import { SidebarItem } from "./SidebarItem"
import { Link } from "react-router-dom"

export interface SidebarSectionProps {
  section: SidebarSectionConfig
  /** Current active route to highlight */
  activeRoute?: string
}

export const SidebarSection: React.FC<SidebarSectionProps> = React.memo(
  ({ section, activeRoute }) => {
    if (!section.items?.length) return null

    if (section.collapsible) {
      // Render as collapsible group
      return (
        <Collapsible asChild defaultOpen>
          <li data-slot="sidebar-section" className="list-none">
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={section.title ?? "Section"}>
                <span className="font-medium flex-1 text-left">{section.title}</span>
                <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent asChild>
              <SidebarMenuSub>
                {section.items.map((item) => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    isActive={activeRoute === item.to}
                  />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </li>
        </Collapsible>
      )
    }

    // Non-collapsible section renders items directly.
    return (
      <>
        {section.title && (
          <li className="px-2 py-1 text-xs font-semibold text-muted-foreground select-none">
            {section.title}
          </li>
        )}
        {section.items.map((item) => (
          <SidebarItem key={item.id} item={item} isActive={activeRoute === item.to} />
        ))}
      </>
    )
  }
)

SidebarSection.displayName = "SidebarSection" 