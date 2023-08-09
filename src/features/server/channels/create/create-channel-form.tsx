import { useParams, useNavigate } from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form';

import { SubmitButton } from '@components/ui/forms';

import { useCreateChannelMutation } from '../api';

import {
  ChannelTypeFieldset,
  ChannelNameInput,
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
        <ChannelNameInput />
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