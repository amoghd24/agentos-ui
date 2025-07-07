import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { DropdownMenuRadioGroupProps } from "@/types";

/**
 * Radio group component for single-select menus
 */
const DropdownMenuRadioGroup = React.memo(function DropdownMenuRadioGroup({
  ...props
}: DropdownMenuRadioGroupProps) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
});

export { DropdownMenuRadioGroup }; 