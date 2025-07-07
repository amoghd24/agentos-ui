import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ConversationSidebarProps {
  title: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  messageCount: number;
  children?: React.ReactNode;
}

export function ConversationSidebar({
  title,
  isActive,
  createdBy,
  createdAt,
  messageCount,
  children
}: ConversationSidebarProps) {
  return (
    <div className="w-80 border-l flex-shrink-0 h-full flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Conversation Name</h3>
            <p className="font-medium">{title}</p>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <p className="font-medium">{isActive ? "Active" : "Inactive"}</p>
          </div>

          <Tabs defaultValue="details" className="mt-6">
            <TabsList className="w-full">
              <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
              <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium">Conversation Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-xs text-muted-foreground">Created By</h4>
                      <p className="text-sm">{createdBy}</p>
                    </div>
                    <div>
                      <h4 className="text-xs text-muted-foreground">Created At</h4>
                      <p className="text-sm">{createdAt}</p>
                    </div>
                    {children}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history">
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  {messageCount === 0 
                    ? "No conversation history available."
                    : `${messageCount} messages in this conversation.`
                  }
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 