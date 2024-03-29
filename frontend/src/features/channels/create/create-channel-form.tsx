import { useParams, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ChannelTypes, type CreateChannelFields } from '../types';

import { createChannelSchema } from '../schema';

import { ResetSubmitButtons, ModalForm } from '@components/ui/forms';

import { useCreateChannelMutation } from '../api';

import {
  ChannelTypeFieldset,
  CreateChannelNameInput,
} from '.';

type CreateChannelFormProps = {
  categoryId?: string;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
};

export function CreateChannelForm({
  categoryId, closeBtnRef
}: CreateChannelFormProps) {
  const { serverId } = useParams();
  const navigate = useNavigate();

  const methods = useForm<CreateChannelFields>({
    defaultValues: {
      name: '',
      type: ChannelTypes.TEXT,
      categoryId,
      serverId,
      private: false,
    },
    resolver: zodResolver(createChannelSchema),
    mode: 'onChange',
  });

  const [createChannel] = useCreateChannelMutation();

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: CreateChannelFields) => {
      const channel = await createChannel(data).unwrap();

      reset();
      closeBtnRef.current?.click();
      navigate(`/channels/${serverId}/${channel._id}`);
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        onSubmit={handleSubmit(onSubmit)}
        submitComponent={<ResetSubmitButtons
          closeBtnRef={closeBtnRef}
          submitLabel="Create Channel"
        />}
      >
        <ChannelTypeFieldset />
        <CreateChannelNameInput />
      </ModalForm>
    </FormProvider>
  );
}