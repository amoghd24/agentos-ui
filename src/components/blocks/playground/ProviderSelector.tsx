import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProviderLabel } from "@/lib/constants";

interface Provider {
  id: string;
  name: string;
}

interface ProviderSelectorProps {
  providers: Provider[];
  selectedProvider: string | null;
  onProviderChange: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ProviderSelector({
  providers,
  selectedProvider,
  onProviderChange,
  isLoading = false,
  disabled = false
}: ProviderSelectorProps) {
  // Handle provider selection change
  const handleChange = (value: string) => {
    onProviderChange(value);
  };

  // If loading, show loading state
  if (isLoading) {
    return (
      <div className="w-full p-2 flex items-center">
        <div className="text-sm text-muted-foreground">Loading providers...</div>
      </div>
    );
  }

  // If no providers, show empty state
  if (providers.length === 0) {
    return (
      <div className="w-full p-2 flex items-center">
        <div className="text-sm text-muted-foreground">No providers available</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <label className="text-sm font-medium mb-1 block">Select AI Provider</label>
      <Select
        value={selectedProvider || ""}
        onValueChange={handleChange}
        className={disabled ? "opacity-50 pointer-events-none" : ""}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose a provider" />
        </SelectTrigger>
        <SelectContent>
          {providers.map((provider) => (
            <SelectItem key={provider.id} value={provider.id}>
              {getProviderLabel(provider.name)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 