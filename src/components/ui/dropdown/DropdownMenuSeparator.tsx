import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DropdownMenuSeparatorProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Separator line for dividing sections in a dropdown menu
 */
const DropdownMenuSeparator = React.memo(function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
});

export { DropdownMenuSeparator }; 