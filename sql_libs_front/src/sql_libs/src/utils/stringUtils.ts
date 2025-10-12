import * as _ from 'lodash-es';

export const removeControlChars = (input: string) => {
  // eslint-disable-next-line no-control-regex -- TODO
  const replacedInput = input.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  return replacedInput;
};


export const removeControlCharsAndTrim = (input: string) => {
  // eslint-disable-next-line no-control-regex -- TODO
  const removedControlChars = input.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  return removedControlChars.trim();
};


export const getFileExtension = (filename: string) => {
  const parts = filename.split('.');
  const nonEmptyParts = _.filter(parts, (part) => !_.isEmpty(part));
  const extension =
    nonEmptyParts.length > 1 ? _.toLower(_.last(nonEmptyParts)) : '';
  return extension;
};

export const toHalfWidthNums = (str: string) => {
  const fullNums = '０１２３４５６７８９';
  return str.replace(/[０-９]/g, (m) => fullNums.indexOf(m).toString());
};


export const capitalizeFirstLetter = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);
