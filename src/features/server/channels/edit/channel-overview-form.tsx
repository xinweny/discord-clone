import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { editChannelSchema } from './schema';

import { ChannelContext } from './edit-channel-button';

import { EditChannelNameInput } from './edit-channel-name-input';

import { FormChangesAlert } from '@components/ui/forms';
import { ChannelDescriptionInput } from './channel-description-input';

type EditChannelFields = {
  name: string;
  description: string;
  channelId: string;
  serverId: string;
};

export function ChannelOverviewForm() {
  const { serverId } = useParams();
  const channel = useContext(ChannelContext);

  const defaultValues = {
    name: channel?.name || '',
    description: channel?.description || '',
    channelId: channel?._id,
    serverId,
  };

  const methods = useForm<EditChannelFields>({
    defaultValues,
    resolver: zodResolver(editChannelSchema),
    mode: 'onChange',
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = () => {
    reset();
  };

  if (!channel) return null;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditChannelNameInput type={channel.type} />
        <ChannelDescriptionInput />
        <FormChangesAlert defaultValues={defaultValues} />
      </form>
    </FormProvider>
  );
}