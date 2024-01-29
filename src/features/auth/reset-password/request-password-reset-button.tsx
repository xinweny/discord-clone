import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { handleServerError } from '@utils';

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
  const [hasServerError, setHasServerError] = useState<boolean>(false);

  const { watch, trigger, setError, formState: { errors } } = useFormContext();

  const [requestPasswordReset] = useLazyRequestPasswordResetMailQuery();

  const email = watch(name);

  const handleClick = async () => {
    const isValidated = await trigger(name, { shouldFocus: true });

    if (!isValidated) return;

    const response = await requestPasswordReset(email);

    if ('error' in response) {
      setHasServerError(true);
      handleServerError(response.error, {
        status: 400,
        message: 'User does not exist',
      }, () => {
        setError(name, {
          type: 'custom',
          message: 'Email does not exist.',
        });
      });
    } else {
      setHasServerError(false);
    }
  };
  
  return (
    <ButtonWithNotice
      action={handleClick}
      className={className}
      modal={PasswordRequestSentModal}
      modalProps={{ email }}
      hasError={!!errors[name] || hasServerError}
    >
      Forgot your password?
    </ButtonWithNotice>
  );
}