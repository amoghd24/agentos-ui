import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DropdownMenuPortalProps } from "@/types";

/**
 * Portal component that renders the dropdown content in a portal
 */
const DropdownMenuPortal = React.memo(function DropdownMenuPortal({
  ...props
}: DropdownMenuPortalProps) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
});

export { DropdownMenuPortal }; 