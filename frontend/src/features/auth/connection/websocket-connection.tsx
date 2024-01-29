import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

export function WebSocketConnection() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'socket/connect' });

    return () => { dispatch({ type: 'socket/disconnect' }); };
  }, []);

  return <Outlet />;
}