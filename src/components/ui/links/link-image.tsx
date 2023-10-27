import { Link } from 'react-router-dom';

import { Gif } from '../media';

import styles from './link-image.module.scss';

type LinkImageProps = {
  href: string;
  src: string;
  alt?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export function LinkImage({
  href, src, alt, ...props
}: LinkImageProps) {
  const ext = src.split('.').pop();

  const img = ext === 'gif'
    ? <Gif {...props} src={src} />
    : <img {...props} src={src} alt={alt} />;

  return href[0] === '/'
    ? <Link className={styles.linkImage} to={href}>{img}</Link>
    : <a className={styles.linkImage} href={href}>{img}</a>;
}