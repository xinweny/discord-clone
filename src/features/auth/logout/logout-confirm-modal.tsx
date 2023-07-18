import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import api from '@services/api';

import { useLazyLogoutQuery } from '../api';

type LogoutConfirmModalProps = {
  show: boolean;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
};

export function LogoutConfirmModal({
  show, onCancel,
}: LogoutConfirmModalProps) {
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onConfirm = async () => {
    const result = await logout();

    if (result.isSuccess) {
      navigate('/');
      dispatch(api.util.resetApiState());
    }
  };

  if (!show) return null;

  return (
    <div>
      <h2>Log Out</h2>
      <p>Are you sure you want to log out?</p>
      <div>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="button" onClick={onConfirm}>Log Out</button>
      </div>
    </div>
  )
}