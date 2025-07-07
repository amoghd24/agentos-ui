import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DropdownMenuGroupProps } from "@/types";

/**
 * Group component for organizing dropdown items
 */
const DropdownMenuGroup = React.memo(function DropdownMenuGroup({
  ...props
}: DropdownMenuGroupProps) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
});

export { DropdownMenuGroup }; 