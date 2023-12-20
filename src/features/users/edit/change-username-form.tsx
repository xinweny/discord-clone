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
    const { currentPassword, username } = data;

    if (username === user.data!.username) return;

    const res = await changeUsername({
      userId,
      currentPassword,
      username: username!,
    });

    if ('error' in res) {
      handleServerError(res.error, { status: 401, message: 'Unauthorized' }, () => {
        setError('currentPassword', {
          type: 'custom',
          message: 'Password does not match.',
        });
      })
      
      return;
    }

    closeBtnRef.current?.click();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormGroup label="username" htmlFor="username">
            <TextInput
              type="text"
              id="username"
              name="username"
              rules={{ required: true, max: 32 }}
            />
            <ErrorMessage
              name="username"
              validatedMsg="Username is available. Nice!"
              initialMsg="Please only use numbers, letters, underscores _, or periods."
            />
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
        </div>
        <ResetSubmitButtons
          submitLabel="Done"
          closeBtnRef={closeBtnRef}
        />
      </form>
    </FormProvider>
  );
}