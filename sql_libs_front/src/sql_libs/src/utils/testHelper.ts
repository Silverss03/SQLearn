import * as _ from 'lodash-es';

const mockData = [
  { label: 'testLabel1', value: '1' },
  { label: 'testLabel2', value: '2' },
  { label: 'testLabel3', value: '3' },
  { label: 'testLabel4', value: '4' },
  { label: 'testLabel5', value: '5' },

  { label: 'testLabel6', value: '6' },
  { label: 'testLabel7', value: '7' },
  { label: 'testLabel8', value: '8' },
  { label: 'testLabel9', value: '9' },
  { label: 'testLabel10', value: '10' },
];

const translate = (
  rawData: typeof mockData,
  valueKey: string,
  labelKey: string,
  valueType: 'string' | 'number'
) =>
  _.map(rawData, (option) => ({
    [labelKey]: option.label,
    [valueKey]:
      valueType === 'number' ? Number.parseInt(option.value, 10) : option.value,
  }));

export const createDataForOption = <T>(
  valueKey: string,
  labelKey: string,
  valueType: 'string' | 'number' = 'string'
) => translate(mockData, valueKey, labelKey, valueType) as T[];

export const createFetchDataForOption =
  <T>(
    valueKey: string,
    labelKey: string,
    valueType: 'string' | 'number' = 'string'
  ) =>
    (params?: { page?: number; name?: string }) =>
      new Promise<T[]>((resolve) => {
        if (params && !params.name) {
          if (!params.page) {
            resolve([]);
          }
          if (params.page === 1) {
            resolve(
              translate(
                mockData.slice(0, 5),
                valueKey,
                labelKey,
                valueType
              ) as T[]
            );
          }
          if (params.page === 2) {
            resolve(
              translate(
                mockData.slice(5, 10),
                valueKey,
                labelKey,
                valueType
              ) as T[]
            );
          }
          if ((params.page as number) > 2) {
            resolve([]);
          }
        }
        if (params && params.name) {
          const reg = new RegExp(`${params.name}`, 'i');
          const filteredData = _.filter(
            mockData,
            (e) => !_.isEmpty(e.label.match(reg))
          );
          if (!params.page) {
            resolve([]);
          }
          if (params.page === 1) {
            resolve(
              translate(
                filteredData.slice(0, 5),
                valueKey,
                labelKey,
                valueType
              ) as T[]
            );
          }
          if (params.page === 2) {
            resolve(
              translate(
                filteredData.slice(5, 10),
                valueKey,
                labelKey,
                valueType
              ) as T[]
            );
          }
          if ((params.page as number) > 2) {
            resolve([]);
          }
        }
        resolve(translate(mockData, valueKey, labelKey, valueType) as T[]);
      });
