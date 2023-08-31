import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';

import type { LoginFields } from '../types';

import { TextInput, FormGroup, SubmitButton } from '@components/ui/forms';

import { useLoginMutation } from '@features/auth/api';

export function LoginForm() {
  const methods = useForm<LoginFields>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { handleSubmit } = methods;

  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFields) => {
    const result = await login(data).unwrap();
    
    if (result) navigate('/channels/@me');
  };
  
  return (
    <div>
      <div>
        <h3>Welcome back!</h3>
        <p>We're so excited to see you again!</p>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup label="email" htmlFor="email">
            <TextInput
              type="email"
              id="email"
              name="email"
              label="email"
              rules={{ required: true }}
            />
          </FormGroup>
          <FormGroup label="password" htmlFor="password">
            <TextInput
              type="password"
              id="password"
              name="password"
              label="password"
              rules={{ required: true }}
            />
          </FormGroup>
          <SubmitButton>Log In</SubmitButton>
        </form>
      </FormProvider>
      <p>Need an account? <Link to="/register"><strong>Register</strong></Link></p>
    </div>
  );
}