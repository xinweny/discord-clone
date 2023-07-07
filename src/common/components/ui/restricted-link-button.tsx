import { LinkButton } from '@common/components/ui';

interface RestrictedLinkButtonProps {
  to: string;
  children: string;
  isLoggedIn: boolean;
}

export function RestrictedLinkButton(
  { to, children, isLoggedIn }: RestrictedLinkButtonProps
) {
  return (isLoggedIn)
    ? <LinkButton to="/channels/@me">Open DiscordClone</LinkButton>
    : <LinkButton to={to}>{children}</LinkButton>;
}