import type { LayoutProps } from '@types';

import authBackground from '@assets/static/auth-background.svg';

import styles from './auth-layout.module.scss';

export function AuthLayout({ children }: LayoutProps) {
  return (
    <div
      className={styles.layout}
      style={{
        backgroundImage: `url(${authBackground})`,
      }}
    >
      {children}
    </div>
  );
}