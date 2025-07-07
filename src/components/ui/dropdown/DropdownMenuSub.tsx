import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DropdownMenuSubProps } from "@/types";

/**
 * Sub-menu root component for nested dropdown menus
 */
const DropdownMenuSub = React.memo(function DropdownMenuSub({
  ...props
}: DropdownMenuSubProps) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
});

export { DropdownMenuSub }; 