import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { CreateServerFields } from '../types';

import { createServerSchema } from '../schema';

import { useGetUserData } from '@features/auth/hooks';

import {
  TextInput,
  FileInput,
  FormGroup,
  ResetSubmitButtons,
} from '@components/ui/forms';

import { ImagePreview } from '@components/ui/media';

import { useCreateServerMutation } from '../api';

type CreateServerFormProps = {
  closeBtnRef: React.RefObject<HTMLButtonElement>;
};

export function CreateServerForm({ closeBtnRef }: CreateServerFormProps) {
  const { user } = useGetUserData();

  const defaultValues = {
    file: undefined,
    name: `${user.data?.displayName}'s server`,
  };

  const methods = useForm<CreateServerFields>({
    defaultValues,
    mode: 'onSubmit',
    resolver: zodResolver(createServerSchema),
  });
  const {
    handleSubmit,
    reset,
  } = methods;

  const [createServer] = useCreateServerMutation();

  const onSubmit = async (data: CreateServerFields) => {
    const { name, file } = data;

    try {
      await createServer({ name, file }).unwrap();
      reset();
      closeBtnRef.current?.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="upload">
            <ImagePreview
              name="file"
              defaultSrc="#"
            />
            <FileInput
              id="upload"
              name="file"
              accept="image/*"
              label="Upload"
              hidden
            />
          </label>
          <FormGroup label="server's name" htmlFor="server-name">
            <TextInput
              type="text"
              name="name"
              id="server-name"
              label="Server's name"
              maxLength={100}
              rules={{ required: true }}
            />
          </FormGroup>
        </div>
        <ResetSubmitButtons
          submitLabel="Create"
          closeBtnRef={closeBtnRef}
        />
      </form>
    </FormProvider>
  );
}