import { Link } from 'react-router-dom';

type LinkImageProps = {
  href: string;
  src: string;
  alt?: string;
};

export function LinkImage({
  href, src, alt
}: LinkImageProps) {
  const img = <img src={src} alt={alt} />;

  return href[0] === '/'
  ? <Link to={href}>{img}</Link>
  : <a href={href}>{img}</a>;
}