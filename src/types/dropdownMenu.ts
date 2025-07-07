import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

// Common extended props
export interface InsetProps {
  inset?: boolean;
}

export interface VariantProps {
  variant?: "default" | "destructive";
}

// Component-specific props interfaces
export type DropdownMenuProps = React.ComponentProps<typeof DropdownMenuPrimitive.Root>;

export type DropdownMenuTriggerProps = React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>;

export type DropdownMenuPortalProps = React.ComponentProps<typeof DropdownMenuPrimitive.Portal>;

export type DropdownMenuContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.Content>;

export type DropdownMenuGroupProps = React.ComponentProps<typeof DropdownMenuPrimitive.Group>;

export type DropdownMenuItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.Item> & InsetProps & VariantProps;

export type DropdownMenuCheckboxItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>;

export type DropdownMenuRadioGroupProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>;

export type DropdownMenuRadioItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>;

export type DropdownMenuLabelProps = React.ComponentProps<typeof DropdownMenuPrimitive.Label> & InsetProps;

export type DropdownMenuSeparatorProps = React.ComponentProps<typeof DropdownMenuPrimitive.Separator>;

export type DropdownMenuShortcutProps = React.ComponentProps<"span">;

export type DropdownMenuSubProps = React.ComponentProps<typeof DropdownMenuPrimitive.Sub>;

export type DropdownMenuSubTriggerProps = React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & InsetProps;

export type DropdownMenuSubContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>; 