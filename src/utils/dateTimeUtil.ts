import { DATE_FORMAT } from '@src/configs/constants';
import dayjs from '@src/utils/dayjs';

export const getTimeZone = () => `${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

export const getTimeByTimeZone = (time?: string, timeFormat?: string, outputFormat?: string) => {

    let hourOffset = new Date().getTimezoneOffset() / 60;

    if (hourOffset < 0) {
        return dayjs(time, timeFormat).add(-hourOffset, 'hours').format(outputFormat);
    } else {
        return dayjs(time, timeFormat).subtract(hourOffset, 'hours').format(outputFormat);
    }
};

export const getDaysBetweenDates = function(startDate: string, endDate: string) {
    const now = dayjs(startDate, DATE_FORMAT).clone();
    const dates = [];

    while (now.isSame(dayjs(endDate, DATE_FORMAT)) || now.isBefore(dayjs(endDate, DATE_FORMAT))) {
        dates.push(now.format(DATE_FORMAT));
        now.add(1, 'days');
    }
    return dates;
};