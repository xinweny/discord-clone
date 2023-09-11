import { useContext } from 'react';

import type { ModalProps } from '@types';

import { ServerContext } from '@features/servers/context';

import { ConfirmationModal } from '@components/ui/modals';

import { useLeaveServerMutation } from '../api';

export function LeaveServerModal ({
  isOpen,
  onClose,
}: ModalProps) {
  const server = useContext(ServerContext);

  const [leaveServer] = useLeaveServerMutation();

  if (!server) return null;

  const { name, _id } = server;

  const handleConfirm = async () => {
    await leaveServer({
      memberId: '',
      serverId: _id,
    }).unwrap();
  };

  return (
    <ConfirmationModal
      title={`Leave '${name}'`}
      message={`Are you sure you want to leave ${name}?`}
      confirmLabel="Leave Server"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
    />
  )
}