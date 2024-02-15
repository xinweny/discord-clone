import { useNavigate, useOutletContext } from 'react-router-dom';

import type { LoggedInContext } from '@components/routes';

import { useLoginMutation } from '@features/auth/api';

export function DemoButton({ className }: React.HTMLAttributes<HTMLButtonElement>) {
  const { isLoggedIn } = useOutletContext<LoggedInContext>();

  const [login] = useLoginMutation();

  const navigate = useNavigate();

  if (isLoggedIn) return null;

  const loginDemoAccount = async () => {
    await login({
      email: 'byteborn2@jigsy.com',
      password: 'password2',
    });

    navigate('/channels/@me');
  };

  return (
    <button onClick={loginDemoAccount} className={className}>
      Demo
    </button>
  );
}