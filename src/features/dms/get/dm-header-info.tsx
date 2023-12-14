import type { DMData } from '../types';

import { getDmInfo } from '../utils';

import { useGetUserData } from '@features/auth/hooks';
import { useDmHeaderContext } from '../context';

import { Avatar } from '@components/ui/media';
import { Tooltip } from '@components/ui/popups';

import { UserStatusIcon } from '@features/users/status';
import {
  EditGroupAvatarForm,
  EditGroupNameForm,
} from '../edit';

import styles from './dm-header-info.module.scss';

type DmHeaderInfoProps = {
  dm: DMData;
};

export function DmHeaderInfo({ dm }: DmHeaderInfoProps) {
  const { user } = useGetUserData();

  const { avatarUrl, name, participants: dmUsers } = getDmInfo(dm, user.data!.id);

  const { isGroup } = dm;

  const { tooltipProps } = useDmHeaderContext()!;

  return (
    <div className={styles.container}>
      {isGroup
        ? <>
          <EditGroupAvatarForm dm={dm} />
          <EditGroupNameForm dm={dm} />
        </>
        : <>
          <Avatar
            src={avatarUrl}
            notification={<UserStatusIcon userId={dmUsers[0]._id} />}
          />
          <Tooltip
            text={dmUsers[0].username}
            {...tooltipProps}
          >
            <p className={styles.displayName}>{name}</p>
          </Tooltip>
        </>
      }
    </div>
  );
}