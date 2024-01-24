import { useFormContext } from 'react-hook-form';

import type { ErrorResponse } from '@types';

import { ButtonWithNotice } from '@components/ui/buttons';

import { PasswordRequestSentModal } from './password-request-sent-modal';

import { useLazyRequestPasswordResetMailQuery } from '../api';
import { handleServerError } from '@utils';

type RequestPasswordResetButtonProps = {
  name?: string;
  className?: string;
};

export function RequestPasswordResetButton({
  name = 'email',
  className,
}: RequestPasswordResetButtonProps) {
  const { watch, trigger, setError, formState: { errors } } = useFormContext();

  const [requestPasswordReset] = useLazyRequestPasswordResetMailQuery();

  const email = watch(name);

  const handleClick = async () => {
    const isValidated = await trigger(name, { shouldFocus: true });

    if (!isValidated) return;

    const response = await requestPasswordReset(email);

    handleServerError(response, {
      status: 400,
      message: 'User does not exist',
    }, () => {
      setError(name, {
        type: 'custom',
        message: 'Email does not exist.',
      });
  });
  };
  
  return (
    <ButtonWithNotice
      action={handleClick}
      className={className}
      modal={PasswordRequestSentModal}
      modalProps={{ email }}
      error={errors[name]}
    >
      Forgot your password?
    </ButtonWithNotice>
  );
}