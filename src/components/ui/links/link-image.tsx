import { Link } from 'react-router-dom';

import styles from './link-image.module.scss';

type LinkImageProps = {
  href: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>;

export function LinkImage({
  href, children, ...props
}: LinkImageProps) {
  const className = `${styles.linkImage} ${props.className || ''}`;

  return href[0] === '/'
    ? <Link {...props} className={className} to={href}>{children}</Link>
    : <a {...props} className={className} href={href}>{children}</a>;
}