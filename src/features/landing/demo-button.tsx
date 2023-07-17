import { useOutletContext } from 'react-router-dom';

type ContextType = { isLoggedIn: boolean };

export function DemoButton() {
  const { isLoggedIn } = useOutletContext<ContextType>();

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