import { Link } from 'react-router-dom';

import { Gif } from '../media';

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
    ? <Link to={href}>{img}</Link>
    : <a href={href}>{img}</a>;
}