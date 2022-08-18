import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(updateLocale);
dayjs.extend(isBetween);
dayjs.extend(localizedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);
dayjs.extend(customParseFormat);

dayjs.updateLocale(dayjs.locale(), {
  weekStart: 1,
  weekdaysMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
});

const UNITS_FOR_DATE_COMPARE = ['year', 'month', 'date'] as const;

const TimeService = {
  getDate: dayjs,
  shortWeekdayNames: dayjs.weekdaysMin(),
  getStartOfNow() {
    return dayjs().startOf('date');
  },
  isDateSame(
    firstRawDate: TimeServiceRawDate,
    secondRawDate: TimeServiceRawDate,
  ) {
    const firstDate = dayjs(firstRawDate);
    const secondDate = dayjs(secondRawDate);

    return UNITS_FOR_DATE_COMPARE.every(unit =>
      firstDate.isSame(secondDate, unit),
    );
  },
  isOverlapped(
    firstDates: TimeServceOverlapDates,
    secondDates: TimeServceOverlapDates,
  ) {
    const firstDateFrom = dayjs(firstDates.from);
    const firstDateTo = dayjs(firstDates.to);
    const secondDateFrom = dayjs(secondDates.from);
    const secondDateTo = dayjs(secondDates.to);

    return (
      secondDateFrom.isBetween(firstDateFrom, firstDateTo) ||
      secondDateTo.isBetween(firstDateFrom, firstDateTo) ||
      firstDateFrom.isBetween(secondDateFrom, secondDateTo) ||
      firstDateTo.isBetween(secondDateFrom, secondDateTo) ||
      (secondDateFrom.isSame(firstDateFrom) && secondDateTo.isSame(firstDateTo))
    );
  },
  isDateBetween(
    { from, to }: TimeServceOverlapDates,
    date: TimeServiceRawDate,
  ) {
    const currentDate = dayjs(date);

    return (
      currentDate.isValid() &&
      UNITS_FOR_DATE_COMPARE.every(unit =>
        currentDate.isBetween(from, to, unit, '[]'),
      )
    );
  },
};

type DayjsType = typeof dayjs;
export type TimeServiceDate = ReturnType<DayjsType>;
type TimeServiceRawDate = Parameters<DayjsType>[0];

interface TimeServceOverlapDates {
  from: TimeServiceRawDate;
  to: TimeServiceRawDate;
}

export default TimeService;
