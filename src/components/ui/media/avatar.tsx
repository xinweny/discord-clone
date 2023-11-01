import { Gif } from './gif';

import defaultAvatar from '@assets/static/default-user-avatar.png';

import styles from './avatar.module.scss';

type AvatarProps = {
  src: string | undefined;
  alt?: string;
  notification?: React.ReactNode;
  placeholder?: string;
};

export function Avatar({
  src, alt, notification, placeholder
}: AvatarProps) {
  const renderImg = (src: string | undefined) => {
    const className = styles.withNotification;
    
    if (!src) return <img
      className={className}
      src={placeholder || defaultAvatar}
    />;

    const ext = src.split('.').pop();

    return ext === 'gif'
      ? <Gif className={className} src={src} alt={alt} />
      : <img className={className} src={src} alt={alt} />;
  };

  return (
    <div className={styles.avatar}>
      {renderImg(src)}
      <div className={styles.notification}>
        {notification}
      </div>
    </div>
  );
}