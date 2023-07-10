import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@common/hooks';

import { login } from '../ducks/actions';

export function LoginForm() {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const res = await dispatch(login(data));
    
    if (res.meta.requestStatus === 'fulfilled') navigate('/channels/@me');
  };

  return (
    <div>
      <div>
        <h3>Welcome back!</h3>
        <p>We're so excited to see you again!</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">EMAIL</label>
          <input type="email" id="email" {...register('email', { required: true })} />
        </div>
        <div>
          <label htmlFor="password">PASSWORD</label>
          <input type="password" id="password" {...register('password', { required: true })} />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}