import { AuthLayout } from '@components/layouts';

import { LoginForm } from '@features/auth/login';

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};