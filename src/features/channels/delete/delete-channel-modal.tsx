import { useParams, useNavigate } from 'react-router-dom';

import type { ModalProps } from '@types';

import { useSettingsContext } from '@components/context';
import { useChannelContext } from '../context';

import { ConfirmationModal } from '@components/ui/modals';

import { useDeleteChannelMutation } from '../api';

export function DeleteChannelModal({
  isOpen,
  onClose,
}: ModalProps) {
  const channel = useChannelContext();
  const closeBtnRef = useSettingsContext();

  const [deleteChannel] = useDeleteChannelMutation();

  const { serverId } = useParams();
  const navigate = useNavigate();

  if (!channel) return null;

  const onConfirm = async () => {
    await deleteChannel({
      serverId: serverId!,
      channelId: channel._id,
    });

    if (closeBtnRef) closeBtnRef.current?.click();
    navigate(`/channels/${serverId}/${channel._id}`);
  };

  return (
    <ConfirmationModal
      title="Delete Channel"
      message={`Are you sure you want to delete #${channel.name}? This cannot be undone.`}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}