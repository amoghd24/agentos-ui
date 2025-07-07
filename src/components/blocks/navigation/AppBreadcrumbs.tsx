import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { usePromptDetails } from "@/hooks/prompts/usePromptDetails";
import { getPageTitle } from "@/lib/utils/route-utils";

/**
 * Global breadcrumb component for navigating the application hierarchy.
 * Uses route utilities to determine current page name.
 */
export function AppBreadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  // Extract prompt ID if available (ensuring it's string | null)
  const promptId = location.pathname.includes('prompts') ? 
    pathSegments[pathSegments.length - 1] || null : null;
  const { promptName } = usePromptDetails(promptId);
  
  // Get the current page title
  let pageName = getPageTitle(location.pathname);
  
  // Add prompt name if available
  if (promptName && location.pathname.includes('prompts')) {
    pageName = location.pathname.includes('edit') ? `Edit: ${promptName}` : promptName;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="#">Agentos UI</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{pageName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
} 