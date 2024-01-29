import { DateTime } from 'luxon';

type MessageDateProps = {
  messageDate: string;
  currentDate: Date;
};

export function MessageDate({ messageDate, currentDate }: MessageDateProps) {
  const start = DateTime.fromISO(messageDate);
  const end = DateTime.fromJSDate(currentDate);

  const getRelativeDate = (start: DateTime, end: DateTime) => {
    const hoursSinceMidnight = end.diff(end.startOf('day'), 'hours').hours;

    const diffInHours = Math.floor(end.diff(start, 'hours').hours);

    if (diffInHours < hoursSinceMidnight) return 'Today';
    if (diffInHours < hoursSinceMidnight + 24) return 'Yesterday';

    return start.toFormat('dd/MM/yyyy');
  };

  return (
    <p>{`${getRelativeDate(start, end)} at ${start.toFormat('h:mm a')}`}</p>
  );
}