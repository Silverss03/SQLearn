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

export const getTimeAgo = (sentAt: string, t: any): string => {
    const now = dayjs();

    const sentTime = dayjs(sentAt, 'YYYY-MM-DD HH:mm:ss');
    const diffInMinutes = now.diff(sentTime, 'minutes');
    const diffInHours = now.diff(sentTime, 'hours');
    const diffInDays = now.diff(sentTime, 'days');
    const diffInWeeks = now.diff(sentTime, 'weeks');
    const diffInMonths = now.diff(sentTime, 'months');

    if (diffInMinutes < 1) {
        return t('just_now');
    } else if (diffInMinutes < 60) {
        return diffInMinutes === 1 ? t('minute_ago', { count: diffInMinutes }) : t('minutes_ago', { count: diffInMinutes });
    } else if (diffInHours < 24) {
        return diffInHours === 1 ? t('hour_ago', { count: diffInHours }) : t('hours_ago', { count: diffInHours });
    } else if (diffInDays < 7) {
        return diffInDays === 1 ? t('day_ago', { count: diffInDays }) : t('days_ago', { count: diffInDays });
    } else if (diffInWeeks < 4) {
        return diffInWeeks === 1 ? t('week_ago', { count: diffInWeeks }) : t('weeks_ago', { count: diffInWeeks });
    } else {
        return diffInMonths === 1 ? t('month_ago', { count: diffInMonths }) : t('months_ago', { count: diffInMonths });
    }
};

export const calculateTimeLeft = (startDate: string): string => {
    const now = new Date();
    const examDate = new Date(startDate);
    const diff = examDate.getTime() - now.getTime();

    if (diff <= 0) {
        return 'Đang diễn ra';
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
        return `${days} ngày ${hours} giờ`;
    } else if (hours > 0) {
        return `${hours} giờ ${minutes} phút`;
    } else {
        return `${minutes} phút`;
    }
};