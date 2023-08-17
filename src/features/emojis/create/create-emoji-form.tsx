import { useContext, useEffect } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { CreateEmojiFields } from '../types';

import { createEmojiSchema } from '../schema';

import { ServerContext } from '@features/server/context';

import { EmojiInput } from './emoji-input';

import { useCreateEmojiMutation } from '../api';

export function CreateEmojiForm() {
  const server = useContext(ServerContext);

  const [createEmoji] = useCreateEmojiMutation();

  const defaultValues = {
    serverId: server?._id,
    name: '__',
    file: undefined,
  };

  const methods = useForm<CreateEmojiFields>({
    defaultValues,
    resolver: zodResolver(createEmojiSchema),
  });
  const { handleSubmit, control, reset } = methods;

  const file = useWatch({ control, name: 'file' });

  useEffect(() => {
    if (file && file instanceof Blob) handleSubmit(onSubmit)();
  }, [file]);
  
  const onSubmit = async (data: CreateEmojiFields) => {
    await createEmoji(data).unwrap();

    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EmojiInput />
      </form>
    </FormProvider>
  );
}