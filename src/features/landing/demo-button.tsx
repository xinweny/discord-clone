import { useOutletContext } from 'react-router-dom';

import type { LoggedInContext } from '@components/routes';

export function DemoButton() {
  const { isLoggedIn } = useOutletContext<LoggedInContext>();

  if (isLoggedIn) return null;

  const loginDemoAccount = () => {
    console.log('TODO: Login Demo account and redirect to dashboard');
  };

  return (
    <button onClick={loginDemoAccount}>
      Demo
    </button>
  );
}