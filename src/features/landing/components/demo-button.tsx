import { Button } from '@common/components/ui';

export function DemoButton() {
  const loginDemoAccount = () => {
    console.log('TODO: Login Demo account and redirect to dashboard');
  };

  return (
    <Button onClick={loginDemoAccount}>
      Demo
    </Button>
  );
}