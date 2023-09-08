import { UserBasicData } from '@features/user/types'

type DmParticipantsListProps = {
  participants: UserBasicData[];
};

export function DmParticipantsList({ participants }: DmParticipantsListProps) {
  return (
    <div>
      {participants.length === 1
        ? <></>
        : <div>
          <p>{`MEMBERS = ${participants.length}`}</p>
        </div>}
    </div>
  )
}