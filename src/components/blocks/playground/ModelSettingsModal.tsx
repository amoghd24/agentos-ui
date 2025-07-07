import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { AI_MODELS, TEMPERATURE_RANGE } from "@/lib/constants";

interface ModelSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  model: string;
  temperature: number;
  maxTokens: number;
  onModelChange: (model: string) => void;
  onTemperatureChange: (value: number) => void;
  onMaxTokensChange: (value: number) => void;
  onSave: () => void;
  availableModels: { value: string; label: string }[];
}

export function ModelSettingsModal({
  isOpen,
  onClose,
  model,
  temperature,
  maxTokens,
  onModelChange,
  onTemperatureChange,
  onMaxTokensChange,
  onSave,
  availableModels
}: ModelSettingsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6 gap-6 bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Model Settings</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Model Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Model</label>
            <Select
              value={model}
              onValueChange={onModelChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((modelOption) => (
                  <SelectItem key={modelOption.value} value={modelOption.value}>
                    {modelOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Temperature Slider */}
          <Slider
            label="Temperature"
            min={TEMPERATURE_RANGE.min}
            max={TEMPERATURE_RANGE.max}
            step={TEMPERATURE_RANGE.step}
            value={temperature}
            onChange={onTemperatureChange}
          />

          {/* Max Tokens Slider */}
          <Slider
            label="Max Tokens"
            min={0}
            max={8192}
            step={1}
            value={maxTokens}
            onChange={onMaxTokensChange}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button onClick={onSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 