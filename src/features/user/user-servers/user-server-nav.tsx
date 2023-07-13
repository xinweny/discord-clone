import { LinkImage } from '@components/ui';

interface ServerNavProps {
  server: {
    id: string;
    name: string;
    imageUrl: string;
  }
}

export function UserServerNav({ server }: ServerNavProps) {
  const { id, imageUrl } = server;

  return (
    <div>
      <LinkImage href={`/${id}`} src={imageUrl} />
    </div>
  );
}