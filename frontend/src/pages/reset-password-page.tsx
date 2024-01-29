import { AuthLayout } from '@components/layouts';

import { ResetPasswordForm } from '@features/auth/reset-password';

export function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}