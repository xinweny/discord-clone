import { Link } from 'react-router-dom';

import { Gif } from '../media';

type LinkImageProps = {
  href: string;
  src: string;
  alt?: string;
};

export function LinkImage({
  href, src, alt
}: LinkImageProps) {
  const ext = src.split('.').pop();

  const img = ext === 'gif'
    ? <Gif src={src} />
    : <img src={src} alt={alt} />;

  return href[0] === '/'
    ? <Link to={href}>{img}</Link>
    : <a href={href}>{img}</a>;
}