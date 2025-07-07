import * as React from "react"
import { Link } from "react-router-dom"
import type { SidebarItemConfig } from "@/types/sidebar"
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
} from "./sidebar-menu"

export interface SidebarItemProps {
  item: SidebarItemConfig
  /** Mark item as active based on current route */
  isActive?: boolean
  onClick?: () => void
}

/**
 * Pure presentational list item for the sidebar.
 * Renders icon + label and optional badge.
 */
export const SidebarItem = React.memo<SidebarItemProps>(
  ({ item, isActive, onClick }) => {
    const { Icon, label, to, badge } = item
    const content = (
      <>
        {Icon && <Icon />}
        <span>{label}</span>
        {badge != null && <SidebarMenuBadge>{badge}</SidebarMenuBadge>}
      </>
    )

    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive} onClick={onClick} tooltip={label}>
          {to ? <Link to={to}>{content}</Link> : <span>{content}</span>}
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }
)

SidebarItem.displayName = "SidebarItem" 