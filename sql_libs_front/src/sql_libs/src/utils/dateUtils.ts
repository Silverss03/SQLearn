import { differenceInDays, isValid, startOfDay } from 'date-fns';
import * as _ from 'lodash-es';
import { ja } from 'date-fns/locale';
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';
import { TIME_ZONES, DATE_TIME_FORMAT } from '../constants';


const timeZoneRegex = /([+-]\d{2}:\d{2}|Z)$/;
export const datetimeRegex =
  /^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}:\d{2}(\.\d{1,7})?(?:[+-]\d{2}:\d{2}|Z)?)?$|^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}(?:[+-]\d{2}:\d{2}|Z)$/;

const getTimezoneOffsetString = () => {
  const offset = new Date().getTimezoneOffset();
  const absoluteOffset = Math.abs(offset);
  const hours = Math.floor(absoluteOffset / 60);
  const minutes = absoluteOffset % 60;
  const sign = offset > 0 ? '-' : '+';

  const hoursString = String(hours).padStart(2, '0');
  const minutesString = String(minutes).padStart(2, '0');

  return `${sign}${hoursString}:${minutesString}`;
};
const getLocalStartOfDay = (dateStr: string) => {
  const timezoneReplacedDateStr = dateStr.replace(
    timeZoneRegex,
    getTimezoneOffsetString()
  );

  return startOfDay(new Date(timezoneReplacedDateStr));
};

const hasTimezone = (date: string) => timeZoneRegex.test(date);

const dateStrToDateType = (date: string) => {
  const cleanedDateStr = date.replace(/[(（][^)）]+[)）]/g, '').trim();
  if (/^(\d{4}\/\d{2}\/\d{2})$/.test(cleanedDateStr)) {
    return zonedTimeToUtc(
      cleanedDateStr.replaceAll('/', '-'),
      TIME_ZONES.HA_NOI
    );
  }

  if (!datetimeRegex.test(cleanedDateStr)) {
    return new Date('Invalid Date');
  }

  if (hasTimezone(cleanedDateStr)) {
    return new Date(cleanedDateStr);
  }

  return zonedTimeToUtc(cleanedDateStr, TIME_ZONES.HA_NOI);
};

export const translateDateToIsoStringWithTz = (
  date: Date,
  timeZone: (typeof TIME_ZONES)[keyof typeof TIME_ZONES] = TIME_ZONES.HA_NOI
): string => {
  if (!isValid(date)) {
    return '';
  }

  const dateString = formatInTimeZone(
    date,
    timeZone,
    DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT
  );
  return dateString.replace(/\s+/g, 'T');
};

export const formatDateWithTokyoTz = (
  date: string | Date,
  formatter: string
) => {
  let targetDate: Date;
  if (_.isString(date)) {
    targetDate = dateStrToDateType(date);
  } else if (isValid(date)) {
    targetDate = date;
  } else {
    return '';
  }

  if (!isValid(targetDate)) {
    return '';
  }

  const formattedDate = formatInTimeZone(
    targetDate,
    TIME_ZONES.HA_NOI,
    formatter,
    { locale: ja }
  );

  return formattedDate;
};

export const differenceInDaysWithTokyoTz = (dateStr: string) => {
  const targetDate = dateStrToDateType(dateStr);
  if (!isValid(targetDate)) {
    throw new Error('differenceInDaysWithTokyoTz(): Invalid date string');
  }

  const formattedDate = formatDateWithTokyoTz(
    targetDate,
    DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT
  );

  const now = formatDateWithTokyoTz(
    new Date(),
    DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT
  );

  return differenceInDays(
    getLocalStartOfDay(formattedDate),
    getLocalStartOfDay(now)
  );
};
