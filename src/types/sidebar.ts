import type * as React from "react"

export interface SidebarItemConfig {
  id: string
  /**
   * Display label shown in the sidebar.
   */
  label: string
  /**
   * Optional route path. When provided the item should render a <Link>.
   */
  to?: string
  /**
   * Optional lucide-react icon component.
   */
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  /**
   * Badge value (count, status, etc.).
   */
  badge?: string | number
  /**
   * Nested items (used only for sections that behave like folders).
   */
  items?: SidebarItemConfig[]
}

export interface SidebarSectionConfig {
  id: string
  /**
   * Heading text shown for the section.
   */
  title?: string
  /**
   * Whether the section can collapse/expand.
   */
  collapsible?: boolean
  /**
   * The child menu items contained in this section.
   */
  items: SidebarItemConfig[]
} 