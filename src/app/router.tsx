import { Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route index /> // landing
      <Route path="login" />
      <Route path="register" />
      <Route path="channels">
        <Route path="@me/:roomId" /> // dm
        <Route path=":serverId/:roomId" /> // server channel
        <Route path="@me" /> // dashboard
        <Route index /> // dashboard
      </Route>
      <Route path="guild-discovery" /> // discover servers
      <Route path="*" /> // 404
    </Routes>
  );
};

export default Router;