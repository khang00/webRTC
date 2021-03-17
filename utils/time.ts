export const getToday = (): number => {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  return toSecond(today);
};

export const toSecond = (date: Date): number => {
  return Math.floor(date.getTime() / 1000);
};

export const getNow = (): number => {
  return Math.floor(Date.now() / 1000);
};

export const DAYS = 3600 * 24;

export const MONTHS = DAYS * 30;
