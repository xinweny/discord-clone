interface AvatarProps {
  src: string;
  alt?: string;
  notification?: React.ReactNode;
}

export function Avatar({
  src, alt, notification
}: AvatarProps) {
  return (
    <div>
      <img src={src} alt={alt || ''} />
      {notification}
    </div>
  )
}