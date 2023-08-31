import { AuthLayout } from '@components/layouts';

import { RegisterForm } from '@features/auth/register';

export function RegisterPage() {
  return (
    <div>
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </div>
  );
}