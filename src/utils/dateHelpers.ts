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
    return (hours % 12) * 60 + minutes + isPM * 12 * 60;
  } catch {
    return -1;
  }
}

//e.g 17:00:00
export function convertTimeString(time: string): string {
  try {
    const splited = time.split(":");
    const hours = parseInt(splited[0]);
    const minutes = parseInt(splited[1]);

    const date = new Date(12, 0, 0, hours, minutes);

    return format(date, "h:mm aaaa");
  } catch {
    return "";
  }
}

export function fomartStringDate(date: Date) {
  return format(date, "yyyy-M");
}

// date should be formatted date string (e.g., 2022-08-01)
export function compareDate(date1: string, date2: string) {
  if (date1 === undefined || date2 === undefined) return false;

  const [year1, month1, day1] = date1.split("-");
  const [year2, month2, day2] = date2.split("-");

  if (year1 > year2) return true;
  if (month1 > month2) return true;
  if (day1 > day2) return true;
  return false;
}
