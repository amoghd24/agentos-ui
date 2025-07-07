// Re-export the router provider component as AppRouter to maintain backward compatibility
export { RouterProvider as AppRouter } from './components/router-provider';

// Export routes for components that need direct access (like MainLayout)
export { appRoutes } from './routes'; 