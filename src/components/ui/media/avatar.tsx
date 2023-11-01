import { Gif } from './gif';

import styles from './avatar.module.scss';

type AvatarProps = {
  src: string;
  alt?: string;
  notification?: React.ReactNode;
  placeholder?: string;
};

export function Avatar({
  src, alt, notification, placeholder
}: AvatarProps) {
  if (!src) return (
    <div>
      <img src={placeholder} alt="" />
      {notification}
    </div>
  );

  const ext = src.split('.').pop();

  return (
    <div className={styles.avatar}>
      {ext === 'gif'
        ? <Gif src={src} />
        : <img src={src} alt={alt || ''} />
      }
      <div className={styles.notification}>
        {notification}
      </div>
    </div>
  );
}