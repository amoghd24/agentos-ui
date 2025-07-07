import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely converts any value to a string
 */
export function safeToString(value: unknown): string {
  if (value === null || value === undefined) return ""
  if (typeof value === "string") return value
  if (typeof value === "object") {
    try {
      return JSON.stringify(value)
    } catch {
      return "[Object]"
    }
  }
  return String(value)
}

/**
 * Formats a date string into a human-readable format.
 * Falls back to the original input on error.
 */
export function formatDate(
  dateString: string,
  formatString: string = "MMM d, yyyy"
): string {
  if (!dateString) return ""
  try {
    return format(new Date(dateString), formatString)
  } catch {
    return dateString
  }
}

/**
 * Truncates text to a maximum length, appending an ellipsis when needed.
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return ""
  return text.length > maxLength ? `${text.substring(0, maxLength)}…` : text
}

/**
 * Extracts a reasonable display name from diverse user payloads.
 */
export function extractUserName(createdBy: unknown): string {
  if (!createdBy) return "Unknown"

  if (typeof createdBy === "string") {
    return createdBy.includes("@") ? createdBy.split("@")[0] : createdBy
  }

  if (typeof createdBy === "object") {
    try {
      const obj = createdBy as Record<string, any>
      const firstName = obj.first_name ?? ""
      const lastName = obj.last_name ?? ""
      if (firstName || lastName) return `${firstName} ${lastName}`.trim()
      if (obj.username) return obj.username
    } catch {
      /* ignore */
    }
  }

  return "Unknown"
}

/**
 * Formats a timestamp for display in chat messages
 */
export function formatTimestamp(dateString: string): string {
  if (!dateString) return "Unknown time";
  
  try {
    return new Date(dateString).toLocaleTimeString();
  } catch {
    return "Unknown time";
  }
}
