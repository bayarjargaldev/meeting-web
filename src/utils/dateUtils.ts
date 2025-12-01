import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

export const formatDate = (date: string | Date): string =>
  dayjs(date).format("MMM D, YYYY");

export const formatTime = (date: string | Date): string =>
  dayjs(date).format("h:mm A");

export const formatDateTime = (date: string | Date): string =>
  dayjs(date).format("MMM D, YYYY h:mm A");

export const formatTimeRange = (
  start: string | Date,
  end: string | Date,
): string => `${formatTime(start)} - ${formatTime(end)}`;

export const getRelativeTime = (date: string | Date): string =>
  dayjs(date).fromNow();

export const isToday = (date: string | Date): boolean =>
  dayjs(date).isSame(dayjs(), "day");

export const isPast = (date: string | Date): boolean =>
  dayjs(date).isBefore(dayjs());

export default {
  formatDate,
  formatTime,
  formatDateTime,
  formatTimeRange,
  getRelativeTime,
  isToday,
  isPast,
};
