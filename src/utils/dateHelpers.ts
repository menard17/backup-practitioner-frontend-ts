import { format, parseJSON } from "date-fns";

export function formatDateString(date: string, dateTimeFormat: string) {
  return format(parseJSON(date), dateTimeFormat);
}

// e.g. 10:05 AM
export function converTimeToInt(time: string): number {
  try {
    const splited = time.split(":");
    const hours = parseInt(splited[0]);
    const minutes = parseInt(splited[1].split(" ")[0]);
    const isPM = splited[1].split(" ")[1] === "PM" ? 1 : 0;
    return hours * 60 + minutes + isPM * 12 * 60;
  } catch {
    return -1;
  }
}

export function fomartStringDate(date: Date) {
  return format(date, "yyyy-M");
}
