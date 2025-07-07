import * as React from "react";
import { X, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormSection, FormLabel, FormDescription } from "@/components/ui/form";

interface Provider {
  value: string;
  label: string;
}

interface AddEditProviderModalProps {
  isOpen: boolean;
  isEditMode: boolean;
  onClose: () => void;
  formState: {
    name: string;
    key: string;
  };
  showKey: boolean;
  onToggleShowKey: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  providers: Provider[];
}

export function AddEditProviderModal({
  isOpen,
  isEditMode,
  onClose,
  formState,
  showKey,
  onToggleShowKey,
  onInputChange,
  onSubmit,
  isLoading,
  providers
}: AddEditProviderModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden bg-background border-0">
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b dark:border-gray-800 space-y-4">
          <DialogTitle className="text-lg font-semibold">
            {isEditMode ? "Edit AI Provider" : "Add AI Provider"}
          </DialogTitle>
          <Button 
            onClick={onClose} 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <Form onSubmit={onSubmit} className="p-6">
          <FormSection>
            <FormLabel htmlFor="name">Provider</FormLabel>
            <select 
              id="name" 
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
              value={formState.name}
              onChange={onInputChange}
              required
              disabled={isEditMode}
            >
              <option value="" disabled>Select a provider</option>
              {providers.map(provider => (
                <option key={provider.value} value={provider.value}>
                  {provider.label}
                </option>
              ))}
            </select>
          </FormSection>
          
          <FormSection>
            <FormLabel htmlFor="key">API Key</FormLabel>
            <div className="relative">
              <Input 
                id="key" 
                type={showKey ? "text" : "password"} 
                placeholder="Enter your API key"
                value={formState.key}
                onChange={onInputChange}
                required
              />
              <Button 
                type="button"
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full px-3"
                onClick={onToggleShowKey}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            <FormDescription>
              Your API key is securely stored and encrypted using Transparent Data Encryption with a unique 256-bit key.
            </FormDescription>
          </FormSection>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"></div>
                {isEditMode ? "Updating..." : "Adding..."}
              </>
            ) : (
              isEditMode ? "Update Provider" : "Add Provider"
            )}
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 