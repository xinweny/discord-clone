import { useParams } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { EditChannelFields } from '../types';

import { editChannelSchema } from '../schema';

import { useChannelContext } from '../context';

import { EditChannelNameInput } from './edit-channel-name-input';
import { ChannelDescriptionInput } from './channel-description-input';

import { FormChangesAlert } from '@components/ui/forms';

import { useEditChannelMutation } from '../api';

export function ChannelOverviewForm() {
  const { serverId } = useParams();
  const channel = useChannelContext();

  const [editChannel] = useEditChannelMutation();

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

  const onSubmit = async (data: EditChannelFields) => {
    const channel = await editChannel(data).unwrap();
    const { name, description } = channel;
    
    reset({
      name,
      description,
      serverId,
      channelId: channel._id,
    });
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