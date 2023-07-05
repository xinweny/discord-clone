import { Button } from '@common/components/ui';

export const DemoButton = () => {
  const loginDemoAccount = () => {
    console.log('TODO: Login Demo account and redirect to dashboard');
  };

  return (
    <Button onClick={loginDemoAccount}>
      Demo
    </Button>
  );
};