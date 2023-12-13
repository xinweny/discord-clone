import styles from './room-welcome.module.scss';

export enum RoomTypes {
  DM = 'dm',
  GROUP = 'group',
  CHANNEL = 'channel',
}

type ChannelWelcomeProps = {
  type: RoomTypes;
  name: string;
  username?: string;
  avatarSrc?: string;
  component?: React.ReactNode;
  imgComponent?: React.ReactNode;
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
  component,
  imgComponent,
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
    <div className={styles.container}>
      <div className={styles.avatar}>
        {imgComponent || <img src={avatarSrc} />}
      </div>
      <h3>{message[type].heading}</h3>
      {type === 'dm' && username && <h4>{username}</h4>}
      <p>{message[type].info}</p>
      <div>
        {component}
      </div>
    </div>
  );
}