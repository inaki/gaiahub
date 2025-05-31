import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/lib/theme';
import { PageLayout } from '@/components/layout/PageLayout';
import { HomePage } from '@/pages/HomePage';
import { CommunitiesPage } from '@/pages/CommunitiesPage';
import { CommunityDetailsPage } from '@/pages/CommunityDetailsPage';
import { DiscussionsPage } from '@/pages/DiscussionsPage';
import { DiscussionDetailsPage } from '@/pages/DiscussionDetailsPage';
import { DecisionsPage } from '@/pages/DecisionsPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ProjectDetailsPage } from '@/pages/ProjectDetailsPage';
import { DocumentsPage } from '@/pages/DocumentsPage';
import { DocumentDetailsPage } from '@/pages/DocumentDetailsPage';
import { ActivityPage } from '@/pages/ActivityPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Router>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="communities" element={<CommunitiesPage />} />
            <Route path="communities/:id" element={<CommunityDetailsPage />} />
            <Route path="discussions" element={<DiscussionsPage />} />
            <Route path="discussions/:id" element={<DiscussionDetailsPage />} />
            <Route path="decisions" element={<DecisionsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:id" element={<ProjectDetailsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="documents/:id" element={<DocumentDetailsPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;