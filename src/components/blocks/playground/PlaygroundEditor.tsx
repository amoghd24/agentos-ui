import React, { ChangeEvent } from 'react';
import { PromptNameInput } from "./PromptNameInput";
import { PromptTab } from "./PromptTab";
import { PromptEditor } from "./PromptEditor";
import { ConversationThread } from "./ConversationThread";
import { UserMessageInput } from "./UserMessageInput";

interface PlaygroundEditorProps {
  promptName: string;
  promptText: string;
  conversation: any[]; // Would be more specific in a real implementation
  userMessage: string;
  currentMessage: string;
  isRunning: boolean;
  aiResponse: string | null;
  onPromptNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPromptTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onUserMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCurrentMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRun: () => Promise<void>;
}

export const PlaygroundEditor = React.memo(({
  promptName,
  promptText,
  conversation,
  userMessage,
  currentMessage,
  isRunning,
  aiResponse,
  onPromptNameChange,
  onPromptTextChange,
  onUserMessageChange,
  onCurrentMessageChange,
  onRun
}: PlaygroundEditorProps) => {
  return (
    <>
      <PromptNameInput 
        value={promptName}
        onChange={onPromptNameChange}
      />
      
      <PromptTab label="PROMPT" />
      
      <PromptEditor
        value={promptText}
        onChange={onPromptTextChange}
      />
      
      {/* Conversation thread - only show if there are messages */}
      <ConversationThread conversation={conversation} />
      
      {/* Input message box - different mode based on conversation state */}
      {conversation.length === 0 ? (
        <UserMessageInput
          value={userMessage}
          onChange={onUserMessageChange}
          onRun={onRun}
          isRunning={isRunning}
        />
      ) : (
        <UserMessageInput
          value={currentMessage}
          onChange={onCurrentMessageChange}
          onRun={onRun}
          isRunning={isRunning}
          disabled={aiResponse !== null}
          placeholder="Continue the conversation..."
        />
      )}
    </>
  );
}); 