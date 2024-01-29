import { useNavigate } from 'react-router-dom';

import type { ModalProps } from '@types';

import { useServerContext } from '@features/servers/context';
import { useServerMemberContext } from '../context';

import { ConfirmationModal } from '@components/ui/modals';

import { useLeaveServerMutation } from '../api';

export function LeaveServerModal ({
  isOpen,
  onClose,
}: ModalProps) {
  const server = useServerContext();
  const member = useServerMemberContext();

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