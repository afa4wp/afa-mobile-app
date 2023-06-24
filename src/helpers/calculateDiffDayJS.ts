import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import toObject from 'dayjs/plugin/toObject';
import duration from 'dayjs/plugin/duration';
dayjs.extend(relativeTime);
dayjs.extend(toObject);
dayjs.extend(duration);

export const calculateDiffDayJS = (date: string) => {
  const startDate = dayjs(date);
  const endDate = dayjs();

  const years = endDate.diff(startDate, 'year');
  const months = endDate.diff(startDate, 'month');
  const days = endDate.diff(startDate, 'day');
  const weeks = endDate.diff(startDate, 'week');
  const minutes = endDate.diff(startDate, 'minute');
  const seconds = endDate.diff(startDate, 'second');
  const hours = endDate.diff(startDate, 'hour');

  if (years >= 1) {
    return {
      value: years,
      unit: 'dayJS.years',
    };
  }

  if (months >= 1) {
    return {
      value: months,
      unit: 'dayJS.months',
    };
  }

  if (weeks >= 1) {
    return {
      value: weeks,
      unit: 'dayJS.weeks',
    };
  }

  if (days >= 1) {
    return {
      value: days,
      unit: 'dayJS.days',
    };
  }

  if (hours >= 1) {
    return {
      value: hours,
      unit: 'dayJS.hours',
    };
  }

  if (minutes >= 1) {
    return {
      value: minutes,
      unit: 'dayJS.minutes',
    };
  }

  return {
    value: seconds,
    unit: 'dayJS.seconds',
  };
};
