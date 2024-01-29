import { LinkButton } from '@components/ui/links';
import { useOutletContext } from 'react-router-dom';

type ContextType = { isLoggedIn: boolean };

type RestrictedLinkButtonProps = {
  to: string;
  children: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function RestrictedLinkButton(
  { to, children, ...props }: RestrictedLinkButtonProps
) {
  const { isLoggedIn } = useOutletContext<ContextType>();

  return (isLoggedIn)
    ? <LinkButton to="/channels/@me" {...props}>Open DiscordClone</LinkButton>
    : <LinkButton to={to} {...props}>{children}</LinkButton>;
}