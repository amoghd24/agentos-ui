import * as React from "react"
import { cn } from "@/lib/utils"

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("space-y-6", className)}
        {...props}
      >
        {children}
      </form>
    )
  }
)
Form.displayName = "Form"

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FormSection.displayName = "FormSection"

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn("block text-sm font-medium text-foreground", className)}
        {...props}
      >
        {children}
      </label>
    )
  }
)
FormLabel.displayName = "FormLabel"

interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-xs text-muted-foreground mt-1", className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)
FormDescription.displayName = "FormDescription"

export { Form, FormSection, FormLabel, FormDescription } 