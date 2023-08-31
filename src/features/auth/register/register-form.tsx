import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import type { RegisterFields } from '../types';

import { registerSchema } from '../schema';

import {
  TextInput,
  FormGroup,
  ErrorMessage,
  SubmitButton,
} from '@components/ui/forms';

export function RegisterForm() {
  const defaultValues = {
    email: '',
    displayName: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm<RegisterFields>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });
  const { handleSubmit, setValue } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFields) => {
    console.log(data);
  };
  
  return (
    <div>
      <h2>Create an account</h2>
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
          <FormGroup label="display name" htmlFor="displayName">
            <TextInput
              type="text"
              id="display-name"
              name="displayName"
              label="display name"
              rules={{ required: true }}
              maxLength={32}
            />
          </FormGroup>
          <FormGroup label="username" htmlFor="username">
            <TextInput
              type="text"
              id="username"
              name="username"
              label="username"
              rules={{
                onChange: (e) => {
                  setValue('username', e.target.value.toLowerCase());
                },
              }}
            />
            <ErrorMessage
              name="username"
              validatedMsg="Username is available. Nice!"
            />
          </FormGroup>
          <FormGroup label="password" htmlFor="password">
            <TextInput
              type="password"
              id="password"
              name="password"
              label="password"
              rules={{ required: true }}
              options={{ trim: false }}
            />
            <ErrorMessage name="password" />
          </FormGroup>
          <FormGroup label="confirm password" htmlFor="confirmPassword">
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
          <SubmitButton>Continue</SubmitButton>
        </form>
      </FormProvider>
      <Link to="/login"><strong>Already have an account?</strong></Link>
    </div>
  )
}