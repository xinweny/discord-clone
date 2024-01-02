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
  ModalForm,
} from '@components/ui/forms';

import { ImagePreview } from '@components/ui/media';

import { useCreateServerMutation } from '../api';

import ImageUploadIcon from '@assets/icons/image-upload.svg?react';

import styles from './create-server-form.module.scss';

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
      <ModalForm
        onSubmit={handleSubmit(onSubmit)}
        submitComponent={<ResetSubmitButtons
          submitLabel="Create"
          closeBtnRef={closeBtnRef}
        />}
      >
        <label htmlFor="upload" className={styles.imageUpload}>
          <ImagePreview name="file">
            <ImageUploadIcon />
          </ImagePreview>
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
      </ModalForm>
    </FormProvider>
  );
}