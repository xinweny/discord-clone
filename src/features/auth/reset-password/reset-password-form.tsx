import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';

import type { ResetPasswordFields } from '../types';

import { resetPasswordSchema } from '../schema';

import {
  TextInput,
  FormGroup,
  SubmitButton,
  ErrorMessage,
} from '@components/ui/forms';

import { useResetPasswordMutation } from '@features/auth/api';

import passwordSrc from '@assets/static/password.svg';

import styles from './reset-password-form.module.scss';

export function ResetPasswordForm() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const id = searchParams.get('id');

  const methods = useForm<ResetPasswordFields>({
    defaultValues: {
      password: '',
      confirmPassword: '',
      token: token as string,
      uid: id as string,
    },
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onSubmit',
  });
  const { handleSubmit } = methods;

  const [resetPassword] = useResetPasswordMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: ResetPasswordFields) => {
    if (!token || !id) return;

    await resetPassword({
      ...data,
      token,
      uid: id,
    }).unwrap();
    
    navigate('/login');
  };
  
  return (
    <div className={styles.container}>
      <header>
        <img src={passwordSrc} />
        <h1>Change Your Password</h1>
      </header>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup name="password" label="new password" required className={styles.input}>
            <TextInput
              type="password"
              id="password"
              name="password"
              label="password"
              rules={{ required: true }}
              options={{ trim: false }}
            />
          </FormGroup>
          <FormGroup label="confirm new password" htmlFor="confirmPassword"  required className={styles.input}>
            <TextInput
              type="password"
              id="confirm-password"
              name="confirmPassword"
              label="confirm password"
              rules={{ required: true }}
              options={{ trim: false }}
            />
            <ErrorMessage name="confirmPassword" />
          </FormGroup>
          <SubmitButton className={styles.submitButton}>
            Change Password
          </SubmitButton>
        </form>
      </FormProvider>
    </div>
  );
}