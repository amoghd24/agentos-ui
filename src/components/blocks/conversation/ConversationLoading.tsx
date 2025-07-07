import React from 'react';
import { RefreshCw } from 'lucide-react';

export const ConversationLoading = React.memo(() => (
  <div className="flex justify-center items-center p-8 h-[60vh]">
    <div className="animate-spin">
      <RefreshCw className="h-8 w-8 text-gray-500" />
    </div>
  </div>
)); 