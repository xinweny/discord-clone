import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { TextInput, FormGroup } from '@components/ui';

import { useLazyLoginQuery } from '@features/auth/api';

type LoginFormFields = {
  email: string;
  password: string;
};

export function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormFields>();
  const [login] = useLazyLoginQuery();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormFields) => {
    const result = await login(data);
    
    if (result.isSuccess) navigate('/channels/@me');
  };

  return (
    <div>
      <div>
        <h3>Welcome back!</h3>
        <p>We're so excited to see you again!</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup label="email" htmlFor="email">
          <TextInput
            type="email"
            id="email"
            name="email"
            label="email"
            register={register}
            rules={{ required: true }}
          />
        </FormGroup>
        <FormGroup label="password" htmlFor="password">
          <TextInput
            type="password"
            id="password"
            name="password"
            label="password"
            register={register}
            rules={{ required: true }}
          />
        </FormGroup>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}