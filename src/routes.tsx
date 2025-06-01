// src/routes.tsx
import { PageLayout } from "@/components/layout/PageLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { HomePage } from "@/pages/HomePage";
import { CommunitiesPage } from "@/pages/CommunitiesPage";
import { CommunityDetailsPage } from "@/pages/CommunityDetailsPage";
import { DiscussionsPage } from "@/pages/DiscussionsPage";
import { DiscussionDetailsPage } from "@/pages/DiscussionDetailsPage";
import { DecisionsPage } from "@/pages/DecisionsPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProjectDetailsPage } from "@/pages/ProjectDetailsPage";
import { DocumentsPage } from "@/pages/DocumentsPage";
import { DocumentDetailsPage } from "@/pages/DocumentDetailsPage";
import { ActivityPage } from "@/pages/ActivityPage";
import { NotificationsPage } from "@/pages/NotificationsPage";
import { Profile } from "@/pages/Profile";
import { SettingsPage } from "@/pages/SettingsPage";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { AuthCallback } from "@/pages/auth/AuthCallback";
import { Navigate } from "react-router-dom";
import MembersDirectory from "@/pages/members";

export const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <PageLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "members", element: <MembersDirectory /> },
      { path: "communities/:id", element: <CommunityDetailsPage /> },
      { path: "discussions", element: <DiscussionsPage /> },
      { path: "discussions/:id", element: <DiscussionDetailsPage /> },
      { path: "decisions", element: <DecisionsPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:id", element: <ProjectDetailsPage /> },
      { path: "documents", element: <DocumentsPage /> },
      { path: "documents/:id", element: <DocumentDetailsPage /> },
      { path: "activity", element: <ActivityPage /> },
      { path: "notifications", element: <NotificationsPage /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "/profile",
    element: <Navigate to="/home/profile" replace />,
  },
];
