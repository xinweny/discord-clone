import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { UpdateSensitiveFields } from '../types';

import { editUsernameSchema } from '../schema';

import { handleServerError } from '@utils';

import {
  FormGroup,
  TextInput,
  ResetSubmitButtons,
  ErrorMessage,
} from '@components/ui/forms';

import { useUpdateSensitiveMutation } from '../api';
import { useGetUserData } from '@features/auth/hooks';

type ChangeUsernameFormProps = {
  closeBtnRef: React.RefObject<HTMLButtonElement>;
};

export function ChangeUsernameForm({
  closeBtnRef,
}: ChangeUsernameFormProps) {
  const { user } = useGetUserData();
  const userId = user.data!.id;

  const defaultValues = {
    currentPassword: '',
    username: user.data!.username,
  };

  const methods = useForm<UpdateSensitiveFields>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(editUsernameSchema),
  });

  const { handleSubmit, setError } = methods;

  const [changeUsername] = useUpdateSensitiveMutation();

  const onSubmit = async (data: UpdateSensitiveFields) => {
    try {
      const { currentPassword, username } = data;
  
      await changeUsername({
        userId,
        currentPassword,
        username: username!,
      });
  
      closeBtnRef.current?.click();
    } catch (error) {
      handleServerError(error, { status: 401 }, () => {
        setError('currentPassword', {
          type: 'custom',
          message: 'Password does not match.',
        });
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label="username" htmlFor="username">
          <TextInput
            type="text"
            id="username"
            name="username"
            rules={{ required: true, max: 32 }}
          />
          <ErrorMessage name="username" validatedMsg="Username is available. Nice!" />
        </FormGroup>
        <FormGroup label="current password" htmlFor="current-password" name="currentPassword">
          <TextInput
            type="password"
            id="current-password"
            name="currentPassword"
            rules={{ required: true }}
            options={{ trim: false }}
          />
        </FormGroup>
        <ResetSubmitButtons
          submitLabel="Done"
          closeBtnRef={closeBtnRef}
        />
      </form>
    </FormProvider>
  );
}