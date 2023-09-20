import { Routes, Route, Navigate } from 'react-router-dom';

import { PublicRoute, PrivateRoute, RestrictedRoute } from '@components/routes';

import { WebSocketConnection } from '@features/auth/connection';
import { ChannelRedirector } from '@features/channels/nav';

import {
  LandingPage,
  LoginPage,
  RegisterPage,
  AppPage,
  DashboardPage,
  ContactsPage,
  DMPage,
  ServerPage,
  ChannelPage,
  PublicServersPage,
} from '@pages';

const Router = () => {
  return (
    <Routes>
      // Public routes
      <Route element={<PublicRoute />}>
        <Route index element={<LandingPage />} />
      </Route>

      // Restricted routes
      <Route element={<RestrictedRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      // Private routes
      <Route element={<PrivateRoute />}>
        <Route element={<WebSocketConnection />}>
          <Route element={<AppPage />}>
            <Route path="channels">
              <Route path="@me" element={<DashboardPage />}>
                <Route path="" element={<ContactsPage />} />
                <Route path=":roomId" element={<DMPage />} />
              </Route>
              <Route path=":serverId" element={<ServerPage />}>
                <Route path="" element={<ChannelRedirector />} />
                <Route path=":roomId" element={<ChannelPage />} />
              </Route>
              <Route index element={<Navigate to="/channels/@me" />} />
            </Route>
            <Route path="servers" element={<PublicServersPage />} />
          </Route>
        </Route>
      </Route>

      // Redirection routes
      <Route path="app" element={<Navigate to="/channels/@me" />} />

      // 404 routes
      <Route path="*" element={<p>404 not found</p>} />
    </Routes>
  );
};

export default Router;