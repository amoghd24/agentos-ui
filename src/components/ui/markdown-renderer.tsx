import * as React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  /**
   * Markdown content to render
   */
  content: string;
  
  /**
   * Optional className for styling
   */
  className?: string;
}

/**
 * Renders markdown content with proper formatting
 */
export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  );
} 