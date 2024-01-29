import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { UpdateSensitiveFields } from '../types';

import { editPasswordSchema } from '../schema';

import { useGetUserData } from '@features/auth/hooks';

import { ModalForm } from '@components/ui/forms';

import { handleServerError } from '@utils';

import {
  FormGroup,
  TextInput,
  ResetSubmitButtons,
} from '@components/ui/forms';

import { useUpdateSensitiveMutation } from '../api';

type ChangePasswordFormProps = {
  closeBtnRef: React.RefObject<HTMLButtonElement>;
};

export function ChangePasswordForm({
  closeBtnRef,
}: ChangePasswordFormProps) {
  const { user } = useGetUserData();
  const userId = user.data!.id;

  const defaultValues = {
    userId,
    currentPassword: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm<UpdateSensitiveFields>({
    defaultValues,
    mode: 'onSubmit',
    resolver: zodResolver(editPasswordSchema),
  });

  const { handleSubmit, setError } = methods;

  const [changePassword] = useUpdateSensitiveMutation();

  const onSubmit = async (data: UpdateSensitiveFields) => {
    const { currentPassword, password } = data;

    const res = await changePassword({
      userId,
      currentPassword,
      password,
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

  const pwdProps = {
    rules: { required: true },
    options: { trim: false },
  };

  return (
    <FormProvider {...methods}>
      <ModalForm
        onSubmit={handleSubmit(onSubmit)}
        submitComponent={<ResetSubmitButtons
          submitLabel="Done"
          closeBtnRef={closeBtnRef}
        />}
      >
        <FormGroup label="current password" htmlFor="current-password" name="currentPassword">
          <TextInput
            type="password"
            id="current-password"
            name="currentPassword"
            {...pwdProps}
          />
        </FormGroup>
        <FormGroup label="new password" htmlFor="password" name="password">
          <TextInput
            type="password"
            id="password"
            name="password"
            {...pwdProps}
          />
        </FormGroup>
        <FormGroup label="confirm new password" htmlFor="confirmPassword" name="confirmPassword">
          <TextInput
            type="password"
            id="confirm-password"
            name="confirmPassword"
            {...pwdProps}
          />
        </FormGroup>
      </ModalForm>
    </FormProvider>
  );
}