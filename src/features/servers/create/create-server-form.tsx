import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import { FormInput, FileInput, ErrorMessage } from '@components/ui';

import { useLazySignUploadQuery } from '@features/auth/api';

type CreateServerFields = {
  name?: string;
  file?: File;
};

const serverSchema = zod.object({
  name: zod.string(),
  file: zod.instanceof(File)
    .refine(file => file.size <= 1024 * 1024, 'Max file size is 1MB')
    .refine(file => ['jpeg', 'jpg', 'png', 'gif', 'webp'].includes(file.type.split('/')[1]), 'Filetype not supported')
    .optional(),
});

export function CreateServerForm() {
  const {
    register, 
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateServerFields>({
    resolver: zodResolver(serverSchema),
  });
  const [getSignature] = useLazySignUploadQuery();

  const onSubmit = async (data: CreateServerFields) => {
    const { name, file } = data;

    const serverId = 1234;

    if (file) {
      const result = await getSignature({
        folder: `/avatars/servers/${serverId}`,
        filename: file.name,
      });

      console.log(result);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessage error={errors.file} />
      <FileInput
        name="file"
        accept="image/*"
        label="Upload"
        register={register}
        setValue={setValue}
      >
        <img src="#" alt="Placeholder" />
      </FileInput>
      <FormInput
        type="text"
        name="name"
        id="serverName"
        label="Server's name"
        register={register}
        rules={{ required: true }}
      />
      <button type="submit">Create</button>
      <p>{errors.file?.message}</p>
    </form>
  );
}