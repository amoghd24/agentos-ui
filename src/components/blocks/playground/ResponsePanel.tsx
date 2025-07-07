import * as React from "react";
import { Play, Loader2, Clipboard, PanelBottom, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

interface ResponseMetadata {
  providerUsed: string;
  modelUsed: string;
  tokenUsage: any;
}

interface ResponsePanelProps {
  response: string | null;
  isRunning: boolean;
  isSaving: boolean;
  onSave: () => void;
  onRun?: () => void;
  onAddToConversation: () => void;
  onCopy?: () => void;
  metadata?: ResponseMetadata | null;
  showRunButton?: boolean;
  onOpenModelSettings?: () => void;
}

export function ResponsePanel({
  response,
  isRunning,
  isSaving,
  onSave,
  onRun,
  onAddToConversation,
  onCopy,
  metadata,
  showRunButton = false,
  onOpenModelSettings
}: ResponsePanelProps) {
  return (
    <div className="w-1/2 h-full flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">Generated Response</h2>
        <div className="flex gap-2 items-center">
          {onOpenModelSettings && (
            <Button
              variant="outline"
              size="icon"
              onClick={onOpenModelSettings}
              title="Model Settings"
            >
              <Settings2 className="h-4 w-4" />
              <span className="sr-only">Model Settings</span>
            </Button>
          )}
          
          <Button
            variant="default"
            className="gap-1"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Prompt"
            )}
          </Button>
          
          {showRunButton && onRun && (
            <Button
              variant="outline"
              className="gap-1"
              onClick={onRun}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Run
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <Card className="flex-1 overflow-auto">
        {!response && !isRunning ? (
          <div className="flex items-center justify-center text-gray-400 text-center p-8 h-full">
            <div>
              <p>Click Run to generate a response</p>
            </div>
          </div>
        ) : (
          <div className="p-6 h-full flex flex-col">
            {isRunning ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                <span className="ml-2">Generating response...</span>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto whitespace-pre-wrap">
                  {response && <MarkdownRenderer content={response} />}
                </div>
                
                {metadata && (
                  <div className="mt-4 text-xs text-muted-foreground border-t pt-2">
                    <div className="flex flex-col gap-0.5">
                      <p><strong>Provider:</strong> {metadata.providerUsed}</p>
                      <p><strong>Model:</strong> {metadata.modelUsed}</p>
                      {metadata.tokenUsage && (
                        <p><strong>Tokens:</strong> {JSON.stringify(metadata.tokenUsage)}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Action buttons */}
                <div className="mt-4 flex justify-between gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onCopy}
                    disabled={!onCopy || !response}
                  >
                    <Clipboard className="h-4 w-4 mr-2" /> Copy
                  </Button>
                  
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={onAddToConversation}
                  >
                    <PanelBottom className="h-4 w-4 mr-2" /> Add to Conversation
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  );
} 