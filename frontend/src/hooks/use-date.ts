import { useState, useEffect } from 'react';

const getNextMidnightTime = () => {
  const midnight = new Date();
  midnight.setHours(0, 0, 0, 0);
  midnight.setDate(midnight.getDate() + 1);

  return midnight;
};

const getCurrentTime = () => new Date();

export const useUpdateCurrentDate = () => {
  const midnight = getNextMidnightTime();
  const current = getCurrentTime();

  const [currentDate, setCurrentDate] = useState<Date>(current);
  const [timeToMidnight, setTimeToMidnight] = useState<number>(midnight.getTime() - current.getTime());
  const [lastTimeout, setLastTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const setReloader = () => setTimeout(() => {
      const nextMidnight = getNextMidnightTime();
      const nextCurrent = getCurrentTime();

      setCurrentDate(nextCurrent);
      setTimeToMidnight(nextMidnight.getTime() - nextCurrent.getTime());

      setLastTimeout(setReloader());
    }, timeToMidnight);

    setLastTimeout(setReloader());

    return () => { clearInterval(lastTimeout); };
  }, []);

  return currentDate;
};