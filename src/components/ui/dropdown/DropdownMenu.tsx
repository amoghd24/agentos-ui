import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DropdownMenuProps } from "@/types";

/**
 * Root component for dropdown menus
 */
const DropdownMenu = React.memo(function DropdownMenu({
  ...props
}: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
});

export { DropdownMenu }; 