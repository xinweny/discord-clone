import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import type { ModalProps } from '@types';

import api from '@services/api';

import { useLazyLogoutQuery } from '../api';

export function LogoutConfirmModal({
  show, onClose,
}: ModalProps) {
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
        <button type="button" onClick={onClose}>Cancel</button>
        <button type="button" onClick={onConfirm}>Log Out</button>
      </div>
    </div>
  )
}