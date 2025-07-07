import * as React from "react";
import { usePlaygroundForm } from "@/hooks/playground/usePlaygroundForm";
import { usePlaygroundExecution } from "@/hooks/playground/usePlaygroundExecution";
import { usePlaygroundActions } from "@/hooks/playground/usePlaygroundActions";
import { useBrowserbaseIntegration } from "@/hooks/playground/useBrowserbaseIntegration";
import { PlaygroundHeader } from "@/components/blocks/playground/PlaygroundHeader";
import { ResponsePanel } from "@/components/blocks/playground/ResponsePanel";
import { PlaygroundLayout } from "@/components/blocks/playground/PlaygroundLayout";
import { PlaygroundEditor } from "@/components/blocks/playground/PlaygroundEditor";
import { ModelSettingsModalContainer } from "@/components/blocks/playground/ModelSettingsModalContainer";
import { ModelSettings } from "@/types/playground";

export default function PlaygroundPage() {
  // Custom hooks for form state and execution state
  const formState = usePlaygroundForm();
  const executionState = usePlaygroundExecution();
  
  // Integrate Browserbase URL detection
  const browserbaseIntegration = useBrowserbaseIntegration(executionState.aiResponse);
  
  // Log detected Browserbase URL for verification during development
  React.useEffect(() => {
    console.log('[Playground] aiResponse updated, length:', 
      executionState.aiResponse ? executionState.aiResponse.length : 0);
    
    console.log('[Playground] Browserbase integration state:', {
      hasBrowserbaseUrl: browserbaseIntegration.hasBrowserbaseUrl,
      browserbaseUrl: browserbaseIntegration.browserbaseUrl
    });
    
    if (browserbaseIntegration.browserbaseUrl) {
      console.log('[Playground] Browserbase URL detected:', browserbaseIntegration.browserbaseUrl);
      
      // Let's also verify it's a valid URL
      try {
        const url = new URL(browserbaseIntegration.browserbaseUrl);
        console.log('[Playground] Valid URL details:', {
          protocol: url.protocol,
          hostname: url.hostname,
          pathname: url.pathname,
          search: url.search
        });
      } catch (e) {
        console.error('[Playground] Invalid URL:', e);
      }
    }
  }, [executionState.aiResponse, browserbaseIntegration.browserbaseUrl]);
  
  // Extract action handlers to a custom hook
  const { handleSaveAndRun } = usePlaygroundActions(
    formState.promptId,
    formState.isDirty,
    executionState.conversation,
    executionState.userMessage,
    executionState.currentMessage,
    executionState.runInitialPrompt,
    executionState.continueConversation,
    formState.handleSavePrompt
  );

  // Ensure modelSettings matches the expected interface
  const modelSettings: ModelSettings = {
    isOpen: executionState.modelSettings.isOpen,
    settings: executionState.modelSettings.settings,
    availableModels: executionState.modelSettings.availableModels,
    openSettings: executionState.modelSettings.openSettings,
    closeSettings: executionState.modelSettings.closeSettings,
    updateModel: executionState.modelSettings.updateModel,
    updateTemperature: executionState.modelSettings.updateTemperature,
    updateMaxTokens: executionState.modelSettings.updateMaxTokens,
    saveSettings: executionState.modelSettings.saveSettings
  };

  return (
    <>
      <PlaygroundLayout
        header={
          <PlaygroundHeader 
            title={formState.promptId ? "Edit Prompt" : "Create Prompt"}
            onBackClick={formState.handleBack}
          />
        }
        editor={
          <PlaygroundEditor
            promptName={formState.promptName}
            promptText={formState.promptText}
            conversation={executionState.conversation}
            userMessage={executionState.userMessage}
            currentMessage={executionState.currentMessage}
            isRunning={executionState.isRunning}
            aiResponse={executionState.aiResponse}
            onPromptNameChange={formState.handlePromptNameChange}
            onPromptTextChange={formState.handlePromptTextChange}
            onUserMessageChange={executionState.handleUserMessageChange}
            onCurrentMessageChange={executionState.handleCurrentMessageChange}
            onRun={handleSaveAndRun}
          />
        }
        response={
          <ResponsePanel
            response={executionState.aiResponse}
            isRunning={executionState.isRunning}
            isSaving={formState.isSaving}
            onSave={formState.handleSavePrompt}
            onRun={handleSaveAndRun}
            onAddToConversation={executionState.addToConversation}
            onCopy={executionState.handleCopyResponse}
            metadata={executionState.responseMetadata}
            showRunButton={true}
            onOpenModelSettings={modelSettings.openSettings}
          />
        }
      />
      
      <ModelSettingsModalContainer modelSettings={modelSettings} />
    </>
  );
} 