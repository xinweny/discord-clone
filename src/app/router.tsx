import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from '@common/components';

const Router = () => {
  return (
    <Routes>
      // Public routes
      <Route index element={<p>Landing</p>} />
      <Route path="login" element={<p>Login</p>} />
      <Route path="register" element={<p>Register</p>} />

      // Private routes
      <Route element={<PrivateRoute/>}>
        <Route path="channels">
          <Route path="@me">
            <Route path=":roomId" element={<p>DM room</p>} />
            <Route index element={<p>Dashboard</p>} />
          </Route>
          <Route path=":serverId/:roomId" element={<p>Server channel room</p>} />
          <Route index element={<Navigate to="/channels/@me" />} />
        </Route>
        <Route path="guild-discovery" element={<p>Discover servers</p>} />
      </Route>

      // Redirection routes
      <Route path="app" element={<Navigate to="/channels/@me" />} />

      // 404 routes
      <Route path="*" element={<p>404 not found</p>} />
    </Routes>
  );
};

export default Router;