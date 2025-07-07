import * as React from "react";
import { MessageSquare } from "lucide-react";
import { PlaceholderState } from "@/components/blocks/common/PlaceholderState";

export default function ConversationPlaceholder() {
  return (
    <PlaceholderState
      icon={MessageSquare}
      title="No conversation selected"
      description="Select a conversation from the sidebar to view its details or start a new conversation."
    />
  );
} 