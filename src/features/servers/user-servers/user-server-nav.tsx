import { LinkImage } from '@components/ui';

type ServerNavProps = {
  server: {
    _id: string;
    name: string;
    avatarUrl: string;
  }
};

export function UserServerNav({ server }: ServerNavProps) {
  const { _id: id, avatarUrl, name } = server;

  return (
    <div>
      <LinkImage href={`/channels/${id}`} src={avatarUrl} />
      <p>{name}</p>
    </div>
  );
}