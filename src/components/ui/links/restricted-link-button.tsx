import { LinkButton } from '@components/ui/links';
import { useOutletContext } from 'react-router-dom';

type ContextType = { isLoggedIn: boolean };

interface RestrictedLinkButtonProps {
  to: string;
  children: string;
}

export function RestrictedLinkButton(
  { to, children }: RestrictedLinkButtonProps
) {
  const { isLoggedIn } = useOutletContext<ContextType>();

  return (isLoggedIn)
    ? <LinkButton to="/channels/@me">Open DiscordClone</LinkButton>
    : <LinkButton to={to}>{children}</LinkButton>;
}