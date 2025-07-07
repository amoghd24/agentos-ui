import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Search, RefreshCw } from "lucide-react";
import { useConversationSidebar } from "@/hooks/conversation/useConversationSidebar";

export function ConversationSidebar() {
  const navigate = useNavigate();
  const { 
    searchTerm, 
    setSearchTerm, 
    sortedPractices, 
    loading, 
    error, 
    handleCreatePractice,
    fetchPractices: handleRefresh 
  } = useConversationSidebar();

  const handlePracticeClick = (id: string | number) => {
    navigate(`/conversations/${id.toString()}`);
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Search bar - absolutely positioned at top */}
      <div className="border-b p-4 bg-background absolute top-0 left-0 right-0 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Practice list - scrollable with padding for the search bar */}
      <div className="h-full min-h-0 overflow-y-auto pt-[72px] scrollbar-hide">
        {loading && (
          <div className="flex items-center justify-center h-20">
            <p className="text-sm text-muted-foreground">Loading practices...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-20">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && sortedPractices.length === 0 && (
          <div className="flex items-center justify-center h-20">
            <p className="text-sm text-muted-foreground">No practices found</p>
          </div>
        )}

        {sortedPractices.map((practice) => (
          <div
            key={practice.id}
            className="flex items-center border-b p-4 hover:bg-accent/15 cursor-pointer transition-colors"
            onClick={() => handlePracticeClick(practice.id)}
          >
            <div className="mr-3 flex-shrink-0">
              <Avatar>
                <span>{practice.name ? practice.name[0].toUpperCase() : "P"}</span>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium truncate">{practice.name}</h3>
                <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                  {new Date(practice.created_at).toLocaleString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className={`text-xs ${practice.is_active ? "text-green-500" : "text-gray-500"}`}>
                  {practice.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 