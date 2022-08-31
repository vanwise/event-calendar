import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration, {
  DurationUnitsObjectType,
  DurationUnitType,
} from 'dayjs/plugin/duration';
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
  getStartOfDate(date?: TimeServiceRawDate) {
    return TimeService.getDate(date).startOf('date');
  },
  isDateSame(
    firstRawDate: TimeServiceRawDate,
    secondRawDate: TimeServiceRawDate,
  ) {
    const firstDate = TimeService.getDate(firstRawDate);
    const secondDate = TimeService.getDate(secondRawDate);

    return UNITS_FOR_DATE_COMPARE.every(unit =>
      firstDate.isSame(secondDate, unit),
    );
  },
  isOverlapped(
    firstDates: TimeServceOverlapDates,
    secondDates: TimeServceOverlapDates,
  ) {
    const firstDateFrom = TimeService.getDate(firstDates.from);
    const firstDateTo = TimeService.getDate(firstDates.to);
    const secondDateFrom = TimeService.getDate(secondDates.from);
    const secondDateTo = TimeService.getDate(secondDates.to);

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
    const currentDate = TimeService.getDate(date);

    return (
      currentDate.isValid() &&
      UNITS_FOR_DATE_COMPARE.every(unit =>
        currentDate.isBetween(from, to, unit, '[]'),
      )
    );
  },
  getDurationFromStartOfDay(date: TimeServiceRawDate, unit: DurationUnitType) {
    const currentDate = TimeService.getDate(date);
    const startOfDay = currentDate.startOf('date');
    const duration = dayjs.duration(startOfDay.diff(currentDate)).as(unit);

    return Math.abs(duration);
  },
  addMultiple(date: TimeServiceRawDate, timeUnits: DurationUnitsObjectType) {
    const currentDate = TimeService.getDate(date);
    return currentDate.add(TimeService.getDate.duration(timeUnits));
  },
};

type DayjsType = typeof dayjs;
export type TimeServiceDate = ReturnType<DayjsType>;
export type TimeServiceRawDate = Exclude<Parameters<DayjsType>[0], undefined>;

interface TimeServceOverlapDates {
  from: TimeServiceRawDate;
  to: TimeServiceRawDate;
}

export default TimeService;
