import { AuthLayout } from '@components/layouts';

import { LoginForm } from '@features/auth/login';

export function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}