import React from "react";
import { RouteObject } from "react-router-dom";
import LoginPage from "@/pages/login";
import { ROUTES, createRouteWithMeta } from "@/lib/utils/route-utils";

/**
 * Authentication routes configuration
 * These routes are public and accessible without authentication
 */
export const authRoutes: RouteObject[] = [
  createRouteWithMeta(ROUTES.LOGIN, <LoginPage />, { auth: false })
]; 