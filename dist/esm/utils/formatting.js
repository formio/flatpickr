import { int, pad } from "../utils";
import { getDayNumber } from "../types/options";
var doNothing = function () { return undefined; };
export var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
export var revFormat = {
    D: doNothing,
    F: function (dateObj, monthName, locale) {
        var monthNameFormatted = monthName && monthName.length ?
            monthName[0].toUpperCase() + monthName.slice(1).toLowerCase()
            : monthName;
        dateObj.setMonth(locale.months.longhand.indexOf(monthNameFormatted));
    },
    G: function (dateObj, hour) {
        dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM, locale) {
        dateObj.setHours((dateObj.getHours() % 12) +
            12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        var shortMonthFormatted = shortMonth && shortMonth.length ?
            shortMonth[0].toUpperCase() + shortMonth.slice(1).toLowerCase()
            : shortMonth;
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonthFormatted));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum, locale, format) {
        var weekNumber = parseInt(weekNum);
        var date = new Date(dateObj);
        date.setMonth(0);
        date.setDate(2 + (weekNumber - 1) * 7);
        var firstWeekDay = date.getDate() - date.getDay() + locale.firstDayOfWeek;
        var firstWeekDate = new Date(date);
        firstWeekDate.setDate(firstWeekDay);
        var lastWeekDate = new Date(date);
        lastWeekDate.setDate(firstWeekDay + 6);
        if (firstWeekDate.getTime() <= dateObj.getTime() && dateObj.getTime() <= lastWeekDate.getTime()) {
            return dateObj;
        }
        if (format.includes('w') && format.indexOf('w') < format.indexOf('W')) {
            date.setDate(firstWeekDay + Math.abs(getDayNumber(firstWeekDate, locale.firstDayOfWeek) - getDayNumber(dateObj, locale.firstDayOfWeek)));
        }
        else {
            date.setDate(firstWeekDay);
        }
        return date;
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours((dateObj.getHours() >= 12 ? 12 : 0) + parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: doNothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    u: function (_, unixMillSeconds) {
        return new Date(parseFloat(unixMillSeconds));
    },
    w: function (dateObj, day, _locale, format) {
        var currentDayNumber = dateObj.getDay();
        var expectedDayNumber = parseFloat(day);
        if (currentDayNumber === expectedDayNumber)
            return;
        var currentMonth = dateObj.getMonth();
        var dateCopy = new Date(dateObj);
        var monthDayCorrespondingToExpectedDayNumber = dateObj.getDate() - currentDayNumber + expectedDayNumber;
        dateCopy.setDate(monthDayCorrespondingToExpectedDayNumber);
        var weekNumberSet = format.includes('W') && format.indexOf('w') > format.indexOf('W');
        dateObj.setDate(dateCopy.getMonth() !== currentMonth && !weekNumberSet
            ? monthDayCorrespondingToExpectedDayNumber + 7
            : monthDayCorrespondingToExpectedDayNumber);
    },
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
export var tokenRegex = {
    D: "",
    F: "",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    u: "(.+)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
export var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return pad(formats.h(date, locale, options));
    },
    H: function (date) { return pad(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return pad(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date, _);
    },
    Y: function (date) { return pad(date.getFullYear(), 4); },
    d: function (date) { return pad(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return pad(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return pad(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    u: function (date) { return date.getTime(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};
