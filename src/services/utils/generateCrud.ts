import api from './axios';

/**
 * Generates standard CRUD operations for an entity
 * 
 * @param pathPrefix The API path prefix for the entity
 * @param resourceName Optional resource name for consistent method naming
 * @returns Object with generated CRUD operations
 */
function generateCRUDOps<T, P = Record<string, any>>(
  pathPrefix: string,
  resourceName?: string
) {
  // Use provided resource name or extract from path
  const resource = resourceName || pathPrefix.split('/').filter(Boolean).pop() || 'resource';
  const singularResource = resource.endsWith('s') ? resource.slice(0, -1) : resource;
  const capitalizedResource = singularResource.charAt(0).toUpperCase() + singularResource.slice(1);

  return {
    /**
     * Get all resources with optional filtering
     */
    [`getAll${capitalizedResource}s`]: async (params?: P) => {
      const response = await api.get(pathPrefix, { params });
      return response.data;
    },

    /**
     * Get a specific resource by ID
     */
    [`get${capitalizedResource}ById`]: async (id: string | number) => {
      const response = await api.get(`${pathPrefix}${id}/`);
      return response.data;
    },

    /**
     * Create a new resource
     */
    [`create${capitalizedResource}`]: async (data: Partial<T>) => {
      const response = await api.post(pathPrefix, data);
      return response.data;
    },

    /**
     * Update an existing resource
     */
    [`update${capitalizedResource}`]: async (id: string | number, data: Partial<T>) => {
      const response = await api.patch(`${pathPrefix}${id}/`, data);
      return response.data;
    },

    /**
     * Delete a resource
     */
    [`delete${capitalizedResource}`]: async (id: string | number) => {
      await api.delete(`${pathPrefix}${id}/`);
      return true;
    },

    /**
     * List resources with pagination
     */
    [`list${capitalizedResource}s`]: async (page = 1, pageSize = 10, params?: P) => {
      const queryParams = {
        page,
        page_size: pageSize,
        ...params
      };
      const response = await api.get(pathPrefix, { params: queryParams });
      return response.data;
    }
  };
}

export default generateCRUDOps; 