import { useContext } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

import type { CreateEmojiFields } from '../types';

import { ServerContext } from '@features/server/context';

import { FileInput } from '@components/ui/forms';

export function CreateEmojiForm() {
  const server = useContext(ServerContext);

  const defaultValues = {
    serverId: server?._id,
    name: '__',
    file: undefined,
  };

  const methods = useForm<CreateEmojiFields>({
    defaultValues,
  });
  const { handleSubmit } = methods;
  
  const onSubmit = () => {
    console.log('emoji');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="emoji">
          <div>Upload Emoji</div>
          <FileInput
            id="emoji"
            label="emoji"
            name="file"
            accept="image/jpg image/jpeg image/png image/gif"
            hidden
          />
        </label>
      </form>
    </FormProvider>
  );
}