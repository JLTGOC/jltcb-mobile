import { format, isThisWeek, isThisYear, isToday, parseISO } from "date-fns";

export const formatInboxItemTime = (isoString: string) => {
  const date = parseISO(isoString);

  if (isToday(date)) {
    return format(date, "h:mm a"); // 2:30 PM
  }

  if (isThisWeek(date)) {
    return format(date, "EEE"); // Mon, Tue
  }

  if (isThisYear(date)) {
    return format(date, "MMM d"); // Feb 12
  }

  return format(date, "MMM d, yyyy"); // Feb 12, 2024
};
