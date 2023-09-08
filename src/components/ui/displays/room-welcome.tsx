export enum RoomTypes {
  DM = 'dm',
  GROUP = 'group',
  CHANNEL = 'channel',
}

type ChannelWelcomeProps = {
  type: RoomTypes;
  name: string;
  username?: string;
  avatarSrc: string;
};

type MessageInfo = {
  [key in RoomTypes]: {
    heading: string;
    info: string;

  }
};

export function RoomWelcome({
  avatarSrc,
  type,
  name,
  username,
}: ChannelWelcomeProps) {
  const message: MessageInfo = {
    dm: {
      heading: name,
      info: `This is the beginning of your direct message history with ${name}.`,
    },
    group: {
      heading: name,
      info: `Welcome to the beginning of the ${name} group.`,
    },
    channel: {
      heading: `Welcome to #${name}!`,
      info: `This is the start of the #${name} channel.`,
    },
  };

  return (
    <div>
      <img src={avatarSrc} alt="" />
      <h1>{message[type].heading}</h1>
      {type === 'dm' && username && <h2>{username}</h2>}
      <p>{message[type].info}</p>
    </div>
  );
}