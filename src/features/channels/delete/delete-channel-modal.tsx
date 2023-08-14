import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import type { ModalProps } from '@types';

import { SettingsContext } from '@components/layouts';
import { ChannelContext } from '../context';

import { ConfirmationModal } from '@components/ui/modals';

import { useDeleteChannelMutation } from '../api';

export function DeleteChannelModal({
  isOpen,
  onClose,
}: ModalProps) {
  const channel = useContext(ChannelContext);
  const closeBtnRef = useContext(SettingsContext);

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