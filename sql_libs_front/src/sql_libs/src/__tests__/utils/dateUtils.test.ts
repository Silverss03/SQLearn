// import { addDays, subDays } from 'date-fns';
// import { formatInTimeZone } from 'date-fns-tz';
// import {
//   translateDateToIsoStringWithTz,
//   formatDateWithTokyoTz,
//   differenceInDaysWithTokyoTz,
//   datetimeRegex,
// } from '../../utils/dateUtils';
// import { TIME_ZONES, DATE_TIME_FORMAT } from '../../constants';

// const invalidDates = [
//   '',
//   '.',
//   'invalid',
//   '20230112112233',
//   '01/12',
//   '00:00:00',
//   '2023/01/12T00:00:00+09:00',
//   '2023-01-12T00:00:00.09:00',
//   '2023-01-12 00:00',
//   '2023 01 01 11:22:33',
//   '2023/01/12 11:22:33',
//   '2023-01-12 11:22:33xxx',
//   'xxx2023-01-12 11:22:33',
//   '2023-01-12 11:22:33.00000000',
// ];

// describe('translateDateToIsoStringWithTz', () => {
//   it('正しいDate型の場合、ISO型のstringが取得できること', () => {
//     // 2023-01-12 14:22:33+14:00 === UTC 2023/01/12 0:22:33 === JST 2023/01/12 09:22:33
//     const date = new Date('2023-01-12 14:22:33+14:00');
//     const formattedDate = translateDateToIsoStringWithTz(
//       date,
//       TIME_ZONES.TOKYO
//     );

//     expect(formattedDate).toBe('2023-01-12T09:22:33+09:00'); // 東京タイムゾーン(JST)
//   });

//   it('Invalid Dateの場合、空文字を返すこと', () => {
//     const date = new Date('xxx');
//     const formattedDate = translateDateToIsoStringWithTz(
//       date,
//       TIME_ZONES.TOKYO
//     );

//     expect(translateDateToIsoStringWithTz).not.toThrow();
//     expect(formattedDate).toBe('');
//   });
// });

// type TestCase = {
//   name: string;
//   date: string | Date;
//   formatter: string;
//   expectedVal: string;
// };

// describe('formatDateWithTokyoTz', () => {
//   const cases: TestCase[] = [
//     {
//       name: 'string: "2023/01/12"場合はそのまま整形されること',
//       date: '2023/01/12',
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '2023-01-12 00:00:00+09:00',
//     },
//     {
//       name: 'string: タイムゾンなしで日付のみの"2023-01-12"の場合、"yyyy年MM月dd日"に整形されること',
//       date: '2023-01-12',
//       formatter: DATE_TIME_FORMAT.,
//       expectedVal: '2023年01月12日',
//     },
//     {
//       name: 'string: タイムゾンなしで時刻付きの"2023-01-12 11:22:33"の場合、正しく整形されること',
//       date: '2023-01-12 11:22:33',
//       formatter: DATE_TIME_FORMAT.DATE_TIME_SECOND_FORMAT,
//       expectedVal: '20230112112233',
//     },
//     {
//       name: 'string: タイムゾンなしで時刻付きの"2023-01-12T11:22:33"の場合、正しく整形されること',
//       date: '2023-01-12T11:22:33',
//       formatter: DATE_TIME_FORMAT.DATE_TIME_SECOND_FORMAT,
//       expectedVal: '20230112112233',
//     },
//     {
//       name: 'string: タイムゾンが日本で"2023-01-12 11:22:33+09:00"の場合、そのまま整形されること',
//       date: '2023/01/12 11:22:33+09:00',
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '2023-01-12 11:22:33+09:00',
//     },
//     {
//       name: 'string: タイムゾンが日本以外で"2023-01-12 11:22:33+14:00"の場合、日本時間に変更されて整形されること',
//       date: '2023/01/12 11:22:33+14:00', // 2023-01-12 06:22:33+09:00と同じ時刻
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '2023-01-12 06:22:33+09:00',
//     },
//     {
//       name: 'string: タイムゾンが日本以外で"2023-01-12 11:22:33Z"の場合、日本時間に変更されて整形されること',
//       date: '2023/01/12 11:22:33Z', // 2023-01-12 20:22:33+09:00と同じ時刻
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '2023-01-12 20:22:33+09:00',
//     },
//     {
//       name: 'string: タイムゾンが日本以外で"2023-01-12T11:22:33Z"の場合、日本時間に変更されて整形されること',
//       date: '2023-01-12T11:22:33Z', // 2023-01-12 20:22:33+09:00と同じ時刻
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '2023-01-12 20:22:33+09:00',
//     },
//     {
//       name: 'Date: タイムゾンが日本でnew Date("2023/01/12 11:22:33+09:00")の場合、そのまま変換して整形されること',
//       date: new Date('2023/01/12 11:22:33+09:00'),
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '2023-01-12 11:22:33+09:00',
//     },
//     {
//       name: 'Date: タイムゾンが日本以外でnew Date("2023/01/12 11:22:33+14:00")の場合、同じ時刻の日本時間に変換して整形されること',
//       date: new Date('2023/01/12 11:22:33+14:00'), // 2023-01-12 06:22:33+09:00と同じ時刻
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '2023-01-12 06:22:33+09:00',
//     },
//   ];

//   const badCases: TestCase[] = [
//     {
//       name: '不正なstring"xxx"場合は空文字を返すこと',
//       date: 'xxx',
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '',
//     },
//     {
//       name: '年指定がないstring"01-12"場合は空文字を返すこと',
//       date: '01-12',
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '',
//     },
//     {
//       name: '時刻指定のみstring"11:22:33"場合は空文字を返すこと',
//       date: '11:22:33',
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '',
//     },
//     {
//       name: '不正なstring"20230112112233"の場合、空文字を返すこと',
//       date: '20230112112233', // 2023-01-12 11:22:33の場合はOK
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '',
//     },
//     {
//       name: '※不正なstring"2023/01/12 11:22:33"場合は日付のみ変換されること',
//       date: '2023/01/12 11:22:33', // 2023-01-12 11:22:33の場合はOK
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '',
//     },
//     {
//       // slashと時刻を合わせる場合は日付のみ変換される
//       name: '※不正なstring"2023 01 01 11:22:33"場合は日付のみ変換されること',
//       date: '2023 01 01 11:22:33', // 2023-01-12 11:22:33の場合はOK
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '',
//     },
//     {
//       // slashとTの組み合わせの場合、不正なstringになる
//       name: '※不正なstring"2023/01/12T11:22:33"場合は日付のみ変換されること',
//       date: '2023/01/12T11:22:33', // 2023-01-12T11:22:33の場合はOK
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '',
//     },
//     {
//       // slashとTの組み合わせの場合、不正なstringになる
//       name: '※不正なstring"2023/01/12T11:22:33+09:00"場合は日付のみ変換されること',
//       date: '2023/01/12T11:22:33+09:00', // 2023/01/12 11:22:33+09:00の場合はOK
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '',
//     },
//     {
//       // slashとTの組み合わせの場合、不正なstringになる
//       name: 'Ivalid Dateの場合は空文字を返すこと',
//       date: new Date('xxx'), // 2023-01-12T11:22:33の場合はOK
//       formatter: DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT,
//       expectedVal: '', // 時刻がクリアされる
//     },
//   ];

//   it.each(cases)('$name', ({ date, formatter, expectedVal }) => {
//     const value = formatDateWithTokyoTz(date, formatter);

//     expect(value).toBe(expectedVal);
//   });

//   it.each(badCases)('$name', ({ date, formatter, expectedVal }) => {
//     const value = formatDateWithTokyoTz(date, formatter);
//     expect(formatDateWithTokyoTz).not.toThrow();
//     expect(value).toBe(expectedVal);
//   });

//   it('日本語の曜日が表示されること', () => {
//     // 2日後の日本時刻
//     const date = formatDateWithTokyoTz(
//       '2024-01-26',
//       DATE_TIME_FORMAT.WEEKDAY_HYPHEN_DATE_FORMAT
//     );

//     expect(date).toBe('2024-01-26 (金)');
//   });
// });

// describe('differenceInDaysWithTokyoTz', () => {
//   it('日本タイムゾンの未来日付のの場合、正しい日数の差分が取得できること', () => {
//     // 2日後の日本時刻
//     const date = formatDateWithTokyoTz(
//       addDays(new Date(), 2),
//       DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT
//     );
//     const diff = differenceInDaysWithTokyoTz(date);

//     expect(diff).toBe(2); // 2日の差
//   });

//   it('日本タイムゾンの過去日付の場合、正しい日数の差分が取得できること', () => {
//     // 33日前の日本時刻
//     const date = formatDateWithTokyoTz(
//       subDays(new Date(), 33),
//       DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT
//     );
//     const diff = differenceInDaysWithTokyoTz(date);

//     expect(diff).toBe(-33); // 33日の差
//   });

//   it('日本以外のタイムゾンの場合、正しい日数の差分が取得できること', () => {
//     // 33日前のGTM+14時刻
//     const gmt14 = formatInTimeZone(
//       subDays(new Date(), 33),
//       'Pacific/Kiritimati',
//       DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT
//     );

//     expect(differenceInDaysWithTokyoTz(gmt14)).toBe(-33); // 33日の差

//     // UTC時刻
//     const utc = formatInTimeZone(
//       subDays(new Date(), 33),
//       'UTC',
//       DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT
//     );

//     expect(differenceInDaysWithTokyoTz(utc)).toBe(-33); // 33日の差

//     // GTM-10の時刻
//     const hawaii = formatInTimeZone(
//       subDays(new Date(), 33),
//       'Pacific/Honolulu',
//       DATE_TIME_FORMAT.DATE_TIME_TZ_FORMAT
//     );

//     expect(differenceInDaysWithTokyoTz(hawaii)).toBe(-33); // 33日の差
//   });

//   it('タイムゾンの設定がない場合、正しい日数の差分が取得できること', () => {
//     const hyphenDate = formatInTimeZone(
//       addDays(new Date(), 2),
//       TIME_ZONES.HA_NOI,
//       DATE_TIME_FORMAT.HYPHEN_DATE_FORMAT
//     );
//     expect(differenceInDaysWithTokyoTz(hyphenDate)).toBe(2);

//     const hyphenDateTime = formatInTimeZone(
//       addDays(new Date(), 2),
//       TIME_ZONES.HA_NOI,
//       'yyyy-MM-dd HH:mm:ss'
//     );
//     expect(differenceInDaysWithTokyoTz(hyphenDateTime)).toBe(2);
//   });

//   it('不正なstringの場合、"differenceInDaysWithTokyoTz(): Invalid date string"をthrowすること', () => {
//     invalidDates.forEach((inValidDate) => {
//       expect(() => differenceInDaysWithTokyoTz(inValidDate)).toThrow(
//         'differenceInDaysWithTokyoTz(): Invalid date string'
//       );
//     });
//   });
// });

// describe('Datetime Regex', () => {
//   const validDates = [
//     '2023-01-12',
//     '2023-01-12 11:22:00',
//     '2023-01-12 11:22:00.0000000',
//     '2023-01-12T00:00:00',
//     '2023-01-12T00:00:00.0000000',
//     '2023-01-12 11:22:00+09:00',
//     '2023-01-12 11:22:00Z',
//     '2023-01-12T11:22:00+09:00',
//     '2023-01-12T11:22:00Z',
//     '2023-01-12T00:00:00.0000000+09:00',
//     '2023-01-12T00:00:00.0000000Z',
//     '2023/01/12 11:22:00+09:00',
//     '2023/01/12 11:22:00Z',
//   ];

//   validDates.forEach((date) => {
//     test(`valid date: ${date}`, () => {
//       expect(datetimeRegex.test(date)).toBeTruthy();
//     });
//   });

//   invalidDates.forEach((date) => {
//     test(`invalid date: ${date}`, () => {
//       expect(datetimeRegex.test(date)).toBeFalsy();
//     });
//   });
// });
