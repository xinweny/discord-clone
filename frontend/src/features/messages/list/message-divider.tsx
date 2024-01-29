import { DateTime } from 'luxon';

import styles from './message-divider.module.scss';

type MessageDividerProps = {
  prevDate?: string;
  currentDate: string;
};

export function MessageDivider({
  prevDate,
  currentDate,
}: MessageDividerProps) {
  const divider = (
    <div className={styles.divider}>
      <span>{DateTime.fromISO(currentDate).toFormat('LLLL d, yyyy')}</span>
    </div>
  );

  if (!prevDate) return divider;

  const [prevDay, currentDay] = [prevDate, currentDate]
    .map(date => DateTime.fromISO(date).toLocal().day);

  if (prevDay === currentDay) return null;

  return divider;
}