import { useParams, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createChannelSchema } from './schema';

import { SubmitButton } from '@components/ui/forms';

import { useCreateChannelMutation } from '../api';

import {
  ChannelTypeFieldset,
  CreateChannelNameInput,
} from '.';

type CreateChannelFormProps = {
  categoryId?: string;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
};

export type CreateChannelFields = {
  serverId: string;
  name: string;
  type: 'text' | 'voice';
  categoryId?: string;
  private: boolean;
};

export function CreateChannelForm({
  categoryId, closeBtnRef
}: CreateChannelFormProps) {
  const { serverId } = useParams();
  const navigate = useNavigate();

  const methods = useForm<CreateChannelFields>({
    defaultValues: {
      name: '',
      type: 'text',
      categoryId,
      serverId,
    },
    resolver: zodResolver(createChannelSchema),
    mode: 'onChange',
  });

  const [createChannel] = useCreateChannelMutation();

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: CreateChannelFields) => {
    try {
      const channel = await createChannel(data).unwrap();

      reset();
      closeBtnRef.current?.click();
      navigate(`/channels/${serverId}/${channel._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ChannelTypeFieldset />
        <CreateChannelNameInput />
        <div>
          <button
            type="button"
            onClick={() => { closeBtnRef.current?.click(); }}
          >Cancel</button>
          <SubmitButton>Create Channel</SubmitButton>
        </div>
      </form>
    </FormProvider>
  );
}