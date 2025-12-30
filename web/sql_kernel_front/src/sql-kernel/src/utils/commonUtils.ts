import { differenceInDays, format, startOfDay } from 'date-fns';
import ja from 'date-fns/locale/ja';
import * as _ from 'lodash-es';

export function formatDate(
  date: string | null | undefined,
  formatType: string
): string {
  if (!date) return '';
  return format(new Date(date), formatType, { locale: ja });
}

export const countDay = (dateString?: string | null): number => {
  if (!dateString) return NaN;
  return differenceInDays(
    startOfDay(new Date(dateString)),
    startOfDay(new Date())
  );
};


export function pageToOffset(pageNum: number, limit: number): number {
  return (pageNum - 1) * limit;
}

export const isValidUrl = (inputString: string) => {
  try {
    const validUrl = new URL(inputString);
    return Boolean(validUrl);
  } catch (e) {
    return false;
  }
};


export const InvalidFolderName = (folderName: string) =>
  _.some(folderName, (char) => /[\uD800-\uDFFF]/.test(char));


export const getFolderNamesFromFolder = (
  currentFolderName?: string,
  currentFolderUrl?: string
) =>
  _.chain(currentFolderUrl ?? '')
    .split('/')
    .thru((path) => {
      _.pullAt(path, _.lastIndexOf(path, currentFolderName));
      return path;
    })
    .reject((path) => _.isEqual(path, ''))
    .value();

export const emptyToUndefined = (value: string): string | undefined =>
  value === '' ? undefined : value;
