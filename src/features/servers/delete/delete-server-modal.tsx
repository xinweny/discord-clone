import { useNavigate } from 'react-router-dom';

import type { ModalProps } from '@types';

import { useSettingsContext } from '@components/context';
import { useServerContext } from '../context';

import { ConfirmationModal } from '@components/ui/modals';

import { useDeleteServerMutation } from '../api';

import styles from './delete-server-modal.module.scss';

export function DeleteServerModal({
  isOpen,
  onClose,
}: ModalProps) {
  const server = useServerContext();
  const { closeBtnRef } = useSettingsContext()!;

  const [deleteServer] = useDeleteServerMutation();

  const navigate = useNavigate();

  if (!server) return null;

  const onConfirm = async () => {
    await deleteServer(server._id);

    if (closeBtnRef) closeBtnRef.current?.click();
    navigate('/channels/@me');
  };

  const { name } = server;

  return (
    <ConfirmationModal
      title={`Delete '${name}'`}
      message={<>
        Are you sure you want to delete <strong>{name}</strong>? This cannot be undone.
      </>}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      className={styles.modal}
      confirmation={{
        label: 'Enter Server Name',
        value: server.name,
      }}
    />
  );
}