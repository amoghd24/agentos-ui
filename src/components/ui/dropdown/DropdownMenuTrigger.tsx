import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTriggerProps } from "@/types";

/**
 * Trigger element that toggles the dropdown menu
 */
const DropdownMenuTrigger = React.memo(function DropdownMenuTrigger({
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
});

export { DropdownMenuTrigger }; 