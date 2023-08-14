import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ModalProps } from '@types';

import { SettingsContext } from '@components/layouts';
import { ServerContext } from '../context';

import { ConfirmationModal } from '@components/ui/modals';

import { useDeleteServerMutation } from '../api';

export function DeleteServerModal({
  isOpen,
  onClose,
}: ModalProps) {
  const server = useContext(ServerContext);
  const closeBtnRef = useContext(SettingsContext);

  const [deleteServer] = useDeleteServerMutation();

  const navigate = useNavigate();

  if (!server) return null;

  const onConfirm = async () => {
    await deleteServer(server._id);

    if (closeBtnRef) closeBtnRef.current?.click();
    navigate('/channels/@me');
  };

  return (
    <ConfirmationModal
      title="Delete Channel"
      message={`Are you sure you want to delete ${server.name}? This cannot be undone.`}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmation={{
        label: 'Enter Server Name',
        value: server.name,
      }}
    />
  );
}