import { DateTime } from 'luxon';

type MessageDateProps = {
  messageDate: string;
  currentDate: Date;
};

export function MessageDate({ messageDate, currentDate }: MessageDateProps) {
  const start = DateTime.fromISO(messageDate);
  const end = DateTime.fromJSDate(currentDate);

  let diffInDays = Math.floor(end.diff(start, 'days').days);
  diffInDays = diffInDays < 0 ? 0 : diffInDays;

  let dateStr = '';

  switch (diffInDays) {
    case 0: dateStr = 'Today'; break;
    case 1: dateStr = 'Yesterday'; break;
    default: dateStr = start.toFormat('dd/MM/yyyy'); break;
  }

  return (
    <p>{`${dateStr} at ${start.toFormat('h:mm a')}`}</p>
  );
}