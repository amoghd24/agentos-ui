import * as React from "react";

interface BrandLogoProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function BrandLogo({
  title,
  subtitle,
  className = "",
}: BrandLogoProps) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
} 