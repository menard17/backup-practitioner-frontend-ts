import { format, parseJSON } from "date-fns";

export function formatDateString(date: string, dateTimeFormat: string) {
  return format(parseJSON(date), dateTimeFormat);
}
