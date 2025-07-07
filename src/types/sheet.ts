import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"

// Sheet side type
export type SheetSide = "top" | "right" | "bottom" | "left"

// Sheet content props type
export interface SheetContentProps extends React.ComponentProps<typeof SheetPrimitive.Content> {
  side?: SheetSide
} 