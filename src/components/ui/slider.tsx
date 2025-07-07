import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  className?: string;
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  disabled?: boolean;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ 
    className, 
    label, 
    value, 
    onChange, 
    min, 
    max, 
    step = 1, 
    showValue = true,
    valuePrefix = "",
    valueSuffix = "",
    disabled = false,
    ...props 
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      onChange(newValue);
    };

    // Calculate the progress percentage for the fill effect
    const progress = ((value - min) / (max - min)) * 100;

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">{label}</label>
            {showValue && (
              <span className="text-sm text-muted-foreground">
                {valuePrefix}{value}{valueSuffix}
              </span>
            )}
          </div>
        )}

        <div className="relative">
          <input
            type="range"
            ref={ref}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              "w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-primary/50",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            style={{
              background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${progress}%, var(--secondary) ${progress}%, var(--secondary) 100%)`
            }}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider }; 