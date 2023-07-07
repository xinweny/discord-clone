import { useLoggedInCheck } from '@common/hooks';

import { LinkButton } from '@common/components/ui';

export const HeaderButton = () => {
  const { pending, isLoggedIn } = useLoggedInCheck();

  if (pending) return null;

  return (isLoggedIn)
    ? <LinkButton to="/channels/@me">Open Discord Clone</LinkButton>
    : <LinkButton to="/login">Login</LinkButton>;
}