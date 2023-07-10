import { Routes, Route, Navigate } from 'react-router-dom';

import { PublicRoute, PrivateRoute, RestrictedRoute } from '@common/components/routes';
import { WebSocketConnection } from '@features/websocket';

import {
  LandingPage,
  LoginPage,
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
        <Route path="register" element={<p>Register</p>} />
      </Route>

      // Private routes
      <Route element={<PrivateRoute />}>
        <Route element={<WebSocketConnection />}>
          <Route path="channels">
            <Route path="@me">
              <Route path=":roomId" element={<p>DM room</p>} />
              <Route index element={<p>Dashboard</p>} />
            </Route>
            <Route path=":serverId/:roomId" element={<p>Server channel room</p>} />
            <Route index element={<Navigate to="/channels/@me" />} />
          </Route>
          <Route path="servers" element={<p>Discover servers</p>} />
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