import { useCallback } from 'react';

export function usePlaygroundActions(
  promptId: string | null | undefined,
  isDirty: boolean,
  conversation: any[],
  userMessage: string,
  currentMessage: string | null,
  runInitialPrompt: (id: string | null, message: string) => Promise<void>,
  continueConversation: (id: string | null, message: string) => Promise<void>,
  handleSavePrompt: () => Promise<string | null | undefined>
) {
  const handleInitialRun = useCallback(async () => {
    const id = promptId === undefined ? null : promptId;
    await runInitialPrompt(id, userMessage);
  }, [promptId, userMessage, runInitialPrompt]);

  const handleContinueConversation = useCallback(async () => {
    if (currentMessage) {
      const id = promptId === undefined ? null : promptId;
      await continueConversation(id, currentMessage);
    }
  }, [promptId, currentMessage, continueConversation]);

  const handleRun = useCallback(async () => {
    if (conversation.length === 0) {
      await handleInitialRun();
    } else {
      await handleContinueConversation();
    }
  }, [conversation.length, handleInitialRun, handleContinueConversation]);

  const handleSaveAndRun = useCallback(async () => {
    if (isDirty || !promptId) {
      const savedPromptId = await handleSavePrompt();
      if (savedPromptId) {
        await handleRun();
      }
    } else {
      await handleRun();
    }
  }, [isDirty, promptId, handleSavePrompt, handleRun]);

  return {
    handleRun,
    handleSaveAndRun
  };
} 