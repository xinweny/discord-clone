import { useContext } from 'react';
import {
  useForm,
  FormProvider,
  SubmitHandler,
} from 'react-hook-form';

import type { EditEmojiFields, CustomEmojiData } from '../types';

import { ServerContext } from '@features/server/context';

import { EditEmojiNameInput } from './edit-emoji-name-input';

type EditEmojiFormProps = {
  emoji: CustomEmojiData;
  closeForm: () => void;
};

export function EditEmojiForm({ emoji, closeForm }: EditEmojiFormProps) {
  const server = useContext(ServerContext);

  const defaultValues = {
    serverId: server?._id,
    name: emoji.name,
  };

  const methods = useForm<EditEmojiFields>({
    defaultValues,
  });
  const { handleSubmit, reset } = methods;

  const onSubmit: SubmitHandler<EditEmojiFields> = async (data) => {
    const { name } = data;

    if (name === emoji.name) return;

    reset({
      name,
      serverId: server?._id,
    });

    closeForm();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditEmojiNameInput onSubmit={onSubmit} />
      </form>
    </FormProvider>
  );
}