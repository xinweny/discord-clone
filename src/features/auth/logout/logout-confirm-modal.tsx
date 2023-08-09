import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import type { ModalProps } from '@types';

import { ConfirmationModal } from '@components/ui/modals';

import api from '@services/api';

import { useLazyLogoutQuery } from '../api';

export function LogoutConfirmModal({
  isOpen, onClose,
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

  if (!isOpen) return null;

  return (
    <ConfirmationModal
      title="Log Out"
      message="Are you sure you want to log out?"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}