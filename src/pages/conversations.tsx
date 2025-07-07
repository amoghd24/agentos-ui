import * as React from "react";
import { Outlet } from "react-router-dom";
import { ConversationSidebar } from "@/components/sidebar/conversation-sidebar";
import { TwoColumnLayout } from "@/components/blocks/common/TwoColumnLayout";

export default function ConversationsPage() {
  return (
    <TwoColumnLayout
      className="border rounded-md h-screen overflow-hidden"
      sidebar={<ConversationSidebar />}
      main={<Outlet />}
    />
  );
} 