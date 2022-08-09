import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(updateLocale);

dayjs.updateLocale(dayjs.locale(), {
  weekStart: 1,
  weekdaysMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
});

export type TimeServiceDate = ReturnType<typeof dayjs>;

const TimeService = {
  getDate: dayjs,
  shortWeekdayNames: dayjs.weekdaysMin(),
};

export default TimeService;
