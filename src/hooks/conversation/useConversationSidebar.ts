import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PracticeService from "@/services/PracticeService";
import { Practice } from "@/types/conversation";

/**
 * Hook to manage conversation list data and actions
 */
export function useConversationSidebar() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [practices, setPractices] = useState<Practice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingPractice, setCreatingPractice] = useState<boolean>(false);

  // Fetch practices on mount
  useEffect(() => {
    fetchPractices();
  }, []);

  // Fetch practices from API
  const fetchPractices = async () => {
    try {
      setLoading(true);
      const data = await PracticeService.getPractices();
      setPractices(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching practices:", err);
      setError("Failed to load practices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle creating a new practice
  const handleCreatePractice = async () => {
    try {
      setCreatingPractice(true);
      const newPractice = await PracticeService.createPractice({
        name: "New Conversation",
        is_active: true
      });
      
      // Navigate to the new practice
      if (newPractice && newPractice.id) {
        navigate(`/conversations/${newPractice.id}`);
      }
      
      // Refresh the practices list
      await fetchPractices();
    } catch (err) {
      console.error("Error creating practice:", err);
      setError("Failed to create a new practice. Please try again.");
    } finally {
      setCreatingPractice(false);
    }
  };

  // Memoize filtered practices for performance
  const filteredPractices = useMemo(() => 
    practices.filter(practice =>
      practice.name?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [practices, searchTerm]
  );

  // Memoize sorted practices for performance
  const sortedPractices = useMemo(() => 
    [...filteredPractices].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    }),
    [filteredPractices]
  );

  return {
    id,
    searchTerm,
    setSearchTerm,
    sortedPractices,
    loading,
    error,
    creatingPractice,
    handleCreatePractice,
    fetchPractices
  };
} 