import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';

import type { LoginFields } from '../types';

import { loginSchema } from '../schema';

import { handleServerError } from '@utils';

import { TextInput, FormGroup, SubmitButton } from '@components/ui/forms';

import { RequestPasswordResetButton } from '../reset-password';

import { useLoginMutation } from '@features/auth/api';

import styles from './login-form.module.scss';

export function LoginForm() {
  const methods = useForm<LoginFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });
  const { handleSubmit, setError } = methods;

  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFields) => {
    try {
      await login(data).unwrap();

      navigate('/channels/@me');
    } catch (error) {
      handleServerError(
        error,
        { status: 400, message: 'Invalid email or password.' },
        () => {
          setError('email', { type: 'custom', message: 'Login or password is invalid.' });
          setError('password', { type: 'custom', message: 'Login or password is invalid.' });
        }
      );
    }
  };
  
  return (
    <div className={styles.container}>
      <header>
        <h1>Welcome back!</h1>
        <span>We're so excited to see you again!</span>
      </header>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup
            name="email" label="email" required className={styles.input}>
            <TextInput
              type="email"
              id="email"
              name="email"
              label="email"
              rules={{ required: true }}
            />
          </FormGroup>
          <FormGroup name="password" label="password" required className={styles.input}>
            <TextInput
              type="password"
              id="password"
              name="password"
              label="password"
              rules={{ required: true }}
              options={{ trim: false }}
            />
            <RequestPasswordResetButton className={styles.requestResetButton} />
          </FormGroup>
          <SubmitButton
            className={styles.submitButton}
            withoutDisable
          >
            Log In
          </SubmitButton>
        </form>
      </FormProvider>
      <span>Need an account? <Link to="/register">Register</Link></span>
    </div>
  );
}