import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
// import 'dayjs/locale/nl';
// import 'dayjs/locale/en';
// import 'dayjs/locale/fr';

// import { DEFAULT_LANGUAGE } from '@src/languages';

// dayjs.locale(DEFAULT_LANGUAGE);
dayjs.extend(customParseFormat);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);
dayjs.extend(timezone);

dayjs.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);

export default dayjs;