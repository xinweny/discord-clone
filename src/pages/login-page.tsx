import { AuthLayout, LoginForm } from '@features/auth/components';

export const LoginPage = () => {
  return (
    <div>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </div>
  );
};