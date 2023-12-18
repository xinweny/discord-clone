import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { UpdateSensitiveFields } from '../types';

import { editPasswordSchema } from '../schema';

import {
  FormGroup,
  TextInput,
  ResetSubmitButtons,
} from '@components/ui/forms';

import { useUpdateSensitiveMutation } from '../api';
import { useGetUserData } from '@features/auth/hooks';

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
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const methods = useForm<UpdateSensitiveFields>({
    defaultValues,
    mode: 'onSubmit',
    resolver: zodResolver(editPasswordSchema),
  });

  const { handleSubmit } = methods;

  const [changePassword] = useUpdateSensitiveMutation();

  const onSubmit = async (data: UpdateSensitiveFields) => {
    const { currentPassword, password } = data;

    await changePassword({
      userId,
      currentPassword,
      password,
    });

    closeBtnRef.current?.click();
  };

  const pwdProps = {
    rules: { required: true },
    options: { trim: false },
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label="current password" htmlFor="password">
          <TextInput
            type="password"
            id="current-password"
            name="oldPassword"
            {...pwdProps}
          />
        </FormGroup>
        <FormGroup label="new password" htmlFor="password" showError>
          <TextInput
            type="password"
            id="new-password"
            name="newPassword"
            {...pwdProps}
          />
        </FormGroup>
        <FormGroup label="confirm new password" htmlFor="confirmPassword" showError>
          <TextInput
            type="password"
            id="confirm-password"
            name="confirmPassword"
            {...pwdProps}
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