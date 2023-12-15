import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { UpdatePasswordFields } from '../types';

import { changePasswordSchema } from '../schema';

import {
  FormGroup,
  TextInput,
  ResetSubmitButtons,
} from '@components/ui/forms';

import { useUpdatePasswordMutation } from '../api';
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

  const methods = useForm<UpdatePasswordFields>({
    defaultValues,
    mode: 'onSubmit',
    resolver: zodResolver(changePasswordSchema),
  });

  const { handleSubmit } = methods;

  const [changePassword] = useUpdatePasswordMutation();

  const onSubmit = async (data: UpdatePasswordFields) => {
    const { oldPassword, newPassword } = data;

    await changePassword({
      userId,
      oldPassword,
      newPassword,
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