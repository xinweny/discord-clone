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
    const className = styles.avatar;
    
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
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      className={styles.mask}
      aria-hidden
    >
      <foreignObject
        x="0"
        y="0"
        width="32"
        height="32"
        mask={`url(#svg-mask-${notification ? 'avatar-status' : 'avatar-default'})`}
      >
        <div className={styles.wrapper}>
          {renderImg(src)}
        </div>
      </foreignObject>
      {notification}
    </svg>
  );
}