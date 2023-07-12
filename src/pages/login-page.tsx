import { AuthLayout, LoginForm } from '@features/auth';

export const LoginPage = () => {
  return (
    <div>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </div>
  );
};