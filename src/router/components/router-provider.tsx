import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { authRoutes, appRoutes, ProtectedRoute } from "../routes";
import { MainLayout } from "@/components/layout/main-layout";

/**
 * Main Router Provider component
 * Configures the app router with public and protected routes
 */
export function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - no auth required */}
        {authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}

        {/* Protected routes - require authentication */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
} 