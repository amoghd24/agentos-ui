/**
 * Utility functions for Browserbase integration
 */

/**
 * Detects Browserbase Live View URLs in a string content
 * @param content The string content to search for Browserbase URLs
 * @returns The first Browserbase URL found, or null if none found
 */
export function detectBrowserbaseUrl(content: string): string | null {
  if (!content) return null;
  
  // Patterns to match Browserbase Live View URLs
  const browserbasePatterns = [
    // Original pattern
    /https:\/\/www\.browserbase\.com\/devtools-fullscreen\/inspector\.html\?wss=connect\.browserbase\.com\/debug[^\s)]*/g,
    // New pattern for view.browserbase.com
    /https:\/\/view\.browserbase\.com[^\s)]*/g
  ];
  
  // Try each pattern in order
  for (const pattern of browserbasePatterns) {
    const match = pattern.exec(content);
    if (match) {
      return match[0];
    }
  }
  
  return null;
} 