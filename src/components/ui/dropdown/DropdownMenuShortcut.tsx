import * as React from "react";
import { DropdownMenuShortcutProps } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Shortcut display component for dropdown menu items
 */
const DropdownMenuShortcut = React.memo(function DropdownMenuShortcut({
  className,
  ...props
}: DropdownMenuShortcutProps) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
});

export { DropdownMenuShortcut }; 