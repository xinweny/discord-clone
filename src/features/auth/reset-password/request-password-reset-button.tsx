import { useFormContext } from 'react-hook-form';

import type { ErrorResponse } from '@types';

import { ButtonWithNotice } from '@components/ui/buttons';

import { PasswordRequestSentModal } from './password-request-sent-modal';

import { useLazyRequestPasswordResetMailQuery } from '../api';

type RequestPasswordResetButtonProps = {
  name?: string;
  className?: string;
};

export function RequestPasswordResetButton({
  name = 'email',
  className,
}: RequestPasswordResetButtonProps) {
  const { watch, trigger, setError } = useFormContext();

  const [requestPasswordReset] = useLazyRequestPasswordResetMailQuery();

  const email = watch(name);

  const handleClick = async () => {
    try {
      await trigger(name, { shouldFocus: true });

      await requestPasswordReset(email);
    } catch (error) {
      const err = error as ErrorResponse;

      if (err.status === 400 && err.data.message === 'User does not exist.') setError(name, {
        type: 'custom',
        message: 'Email does not exist.',
      });
    }
  };
  
  return (
    <ButtonWithNotice
      action={handleClick}
      className={className}
      modal={PasswordRequestSentModal}
      modalProps={{ email }}
    >
      Forgot your password?
    </ButtonWithNotice>
  );
}