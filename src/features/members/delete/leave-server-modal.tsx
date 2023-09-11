import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import type { ModalProps } from '@types';

import { ServerContext } from '@features/servers/context';
import { ServerMemberContext } from '../context';

import { ConfirmationModal } from '@components/ui/modals';

import { useLeaveServerMutation } from '../api';

export function LeaveServerModal ({
  isOpen,
  onClose,
}: ModalProps) {
  const server = useContext(ServerContext);
  const member = useContext(ServerMemberContext);

  const [leaveServer] = useLeaveServerMutation();

  const navigate = useNavigate();

  if (!server) return null;

  const { name, _id } = server;

  const handleConfirm = async () => {
    await leaveServer({
      memberId: member!._id,
      serverId: _id,
    }).unwrap();
  
    navigate('/channels/@me');
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