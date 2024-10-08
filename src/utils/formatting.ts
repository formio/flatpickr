import { int, pad } from "../utils";
import { Locale } from "../types/locale";
import { ParsedOptions, getDayNumber} from "../types/options";

export type token =
  | "D"
  | "F"
  | "G"
  | "H"
  | "J"
  | "K"
  | "M"
  | "S"
  | "U"
  | "W"
  | "Y"
  | "Z"
  | "d"
  | "h"
  | "i"
  | "j"
  | "l"
  | "m"
  | "n"
  | "s"
  | "u"
  | "w"
  | "y";

const doNothing = (): undefined => undefined;

export const monthToStr = (
  monthNumber: number,
  shorthand: boolean,
  locale: Locale
) => locale.months[shorthand ? "shorthand" : "longhand"][monthNumber];

export type RevFormatFn = (
  date: Date,
  data: string,
  locale: Locale,
  format: string
) => Date | void | undefined;
export type RevFormat = Record<string, RevFormatFn>;
export const revFormat: RevFormat = {
  D: doNothing,
  F: function(dateObj: Date, monthName: string, locale: Locale) {
    const monthNameFormatted = monthName && monthName.length ?
        monthName[0].toUpperCase() + monthName.slice(1).toLowerCase()
        : monthName;
    dateObj.setMonth(locale.months.longhand.indexOf(monthNameFormatted));
  },
  G: (dateObj: Date, hour: string) => {
    dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
  },
  H: (dateObj: Date, hour: string) => {
    dateObj.setHours(parseFloat(hour));
  },
  J: (dateObj: Date, day: string) => {
    dateObj.setDate(parseFloat(day));
  },
  K: (dateObj: Date, amPM: string, locale: Locale) => {
    dateObj.setHours(
      (dateObj.getHours() % 12) +
        12 * int(new RegExp(locale.amPM[1], "i").test(amPM))
    );
  },
  M: function(dateObj: Date, shortMonth: string, locale: Locale) {
    const shortMonthFormatted = shortMonth && shortMonth.length ?
        shortMonth[0].toUpperCase() + shortMonth.slice(1).toLowerCase()
        : shortMonth;
    dateObj.setMonth(locale.months.shorthand.indexOf(shortMonthFormatted));
  },
  S: (dateObj: Date, seconds: string) => {
    dateObj.setSeconds(parseFloat(seconds));
  },
  U: (_: Date, unixSeconds: string) => new Date(parseFloat(unixSeconds) * 1000),

  W: function (dateObj: Date, weekNum: string, locale: Locale, format: string) {
    const weekNumber = parseInt(weekNum);

    const date = new Date(dateObj);
    date.setMonth(0);
    date.setDate(2 + (weekNumber - 1) * 7);

    const firstWeekDay = date.getDate() - date.getDay() + locale.firstDayOfWeek;
    const firstWeekDate = new Date(date); 
    firstWeekDate.setDate(firstWeekDay);
    const lastWeekDate = new Date(date); 
    lastWeekDate.setDate(firstWeekDay + 6);

    if (firstWeekDate.getTime() <= dateObj.getTime() && dateObj.getTime() <= lastWeekDate.getTime()) {
      return dateObj;
    }

    if (format.includes('w') && format.indexOf('w') < format.indexOf('W')) {
      date.setDate(firstWeekDay + Math.abs(getDayNumber(firstWeekDate, locale.firstDayOfWeek) - getDayNumber(dateObj, locale.firstDayOfWeek)))
    }
    else {
      date.setDate(firstWeekDay);
    }

    return date;
  },
  Y: (dateObj: Date, year: string) => {
    dateObj.setFullYear(parseFloat(year));
  },
  Z: (_: Date, ISODate: string) => new Date(ISODate),

  d: (dateObj: Date, day: string) => {
    dateObj.setDate(parseFloat(day));
  },
  h: (dateObj: Date, hour: string) => {
    dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
  },
  i: (dateObj: Date, minutes: string) => {
    dateObj.setMinutes(parseFloat(minutes));
  },
  j: (dateObj: Date, day: string) => {
    dateObj.setDate(parseFloat(day));
  },
  l: doNothing,
  m: (dateObj: Date, month: string) => {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  n: (dateObj: Date, month: string) => {
    dateObj.setMonth(parseFloat(month) - 1);
  },
  s: (dateObj: Date, seconds: string) => {
    dateObj.setSeconds(parseFloat(seconds));
  },
  u: (_: Date, unixMillSeconds: string) =>
    new Date(parseFloat(unixMillSeconds)),
  w: (dateObj: Date, day: string, _locale, format) => {
    const currentDayNumber = dateObj.getDay();
    const expectedDayNumber = parseFloat(day);

    if (currentDayNumber === expectedDayNumber) return;

    const currentMonth = dateObj.getMonth();
    const dateCopy = new Date(dateObj);
    const monthDayCorrespondingToExpectedDayNumber = dateObj.getDate() - currentDayNumber + expectedDayNumber;
    dateCopy.setDate(monthDayCorrespondingToExpectedDayNumber);

    const weekNumberSet = format.includes('W') && format.indexOf('w') > format.indexOf('W');
    dateObj.setDate(
      dateCopy.getMonth() !== currentMonth && !weekNumberSet 
        ? monthDayCorrespondingToExpectedDayNumber + 7 
        : monthDayCorrespondingToExpectedDayNumber
    );
  },
  y: (dateObj: Date, year: string) => {
    dateObj.setFullYear(2000 + parseFloat(year));
  },
};

export type TokenRegex = { [k in token]: string };
export const tokenRegex: TokenRegex = {
  D: "", // locale-dependent, setup on runtime
  F: "", // locale-dependent, setup on runtime
  G: "(\\d\\d|\\d)",
  H: "(\\d\\d|\\d)",
  J: "(\\d\\d|\\d)\\w+",
  K: "", // locale-dependent, setup on runtime
  M: "", // locale-dependent, setup on runtime
  S: "(\\d\\d|\\d)",
  U: "(.+)",
  W: "(\\d\\d|\\d)",
  Y: "(\\d{4})",
  Z: "(.+)",
  d: "(\\d\\d|\\d)",
  h: "(\\d\\d|\\d)",
  i: "(\\d\\d|\\d)",
  j: "(\\d\\d|\\d)",
  l: "", // locale-dependent, setup on runtime
  m: "(\\d\\d|\\d)",
  n: "(\\d\\d|\\d)",
  s: "(\\d\\d|\\d)",
  u: "(.+)",
  w: "(\\d\\d|\\d)",
  y: "(\\d{2})",
};

export type Formats = Record<
  token,
  (date: Date, locale: Locale, options: ParsedOptions) => string | number
>;
export const formats: Formats = {
  // get the date in UTC
  Z: (date: Date) => date.toISOString(),

  // weekday name, short, e.g. Thu
  D: function (date: Date, locale: Locale, options: ParsedOptions) {
    return locale.weekdays.shorthand[
      formats.w(date, locale, options) as number
    ];
  },

  // full month name e.g. January
  F: function (date: Date, locale: Locale, options: ParsedOptions) {
    return monthToStr(
      (formats.n(date, locale, options) as number) - 1,
      false,
      locale
    );
  },

  // padded hour 1-12
  G: function (date: Date, locale: Locale, options: ParsedOptions) {
    return pad(formats.h(date, locale, options));
  },

  // hours with leading zero e.g. 03
  H: (date: Date) => pad(date.getHours()),

  // day (1-30) with ordinal suffix e.g. 1st, 2nd
  J: function (date: Date, locale: Locale) {
    return locale.ordinal !== undefined
      ? date.getDate() + locale.ordinal(date.getDate())
      : date.getDate();
  },

  // AM/PM
  K: (date: Date, locale: Locale) => locale.amPM[int(date.getHours() > 11)],

  // shorthand month e.g. Jan, Sep, Oct, etc
  M: function (date: Date, locale: Locale) {
    return monthToStr(date.getMonth(), true, locale);
  },

  // seconds 00-59
  S: (date: Date) => pad(date.getSeconds()),

  // unix timestamp
  U: (date: Date) => date.getTime() / 1000,

  W: function (date: Date, _: Locale, options: ParsedOptions) {
    return options.getWeek(date, _);
  },

  // full year e.g. 2016, padded (0001-9999)
  Y: (date: Date) => pad(date.getFullYear(), 4),

  // day in month, padded (01-30)
  d: (date: Date) => pad(date.getDate()),

  // hour from 1-12 (am/pm)
  h: (date: Date) => (date.getHours() % 12 ? date.getHours() % 12 : 12),

  // minutes, padded with leading zero e.g. 09
  i: (date: Date) => pad(date.getMinutes()),

  // day in month (1-30)
  j: (date: Date) => date.getDate(),

  // weekday name, full, e.g. Thursday
  l: function (date: Date, locale: Locale) {
    return locale.weekdays.longhand[date.getDay()];
  },

  // padded month number (01-12)
  m: (date: Date) => pad(date.getMonth() + 1),

  // the month number (1-12)
  n: (date: Date) => date.getMonth() + 1,

  // seconds 0-59
  s: (date: Date) => date.getSeconds(),

  // Unix Milliseconds
  u: (date: Date) => date.getTime(),

  // number of the day of the week
  w: (date: Date) => date.getDay(),

  // last two digits of year e.g. 16 for 2016
  y: (date: Date) => String(date.getFullYear()).substring(2),
};
