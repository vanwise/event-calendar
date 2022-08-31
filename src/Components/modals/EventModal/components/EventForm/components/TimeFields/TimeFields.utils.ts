import TimeService, { TimeServiceDate } from 'Services/TimeService';
import { getDayHoursOptions, getJointDateAndTime } from 'Utils/helpers/date';
import { EventFormValues } from '../../EventForm';

export function getStartTimeOptions(
  dateNow: TimeServiceDate,
  startDate?: string,
) {
  const isStartDateSameNow = startDate
    ? TimeService.isDateSame(startDate, dateNow)
    : false;
  const initialDate = isStartDateSameNow ? dateNow : undefined;

  return getDayHoursOptions({
    startDate: initialDate,
    trimmedTimeInMinutes: { end: 30 },
  });
}

type GetEndTimeOptionsArgs = Pick<
  EventFormValues,
  'startDate' | 'endDate' | 'startTime'
> & {
  dateNow: TimeServiceDate;
};

export function getEndTimeOptions({
  endDate,
  dateNow,
  startTime,
  startDate,
}: GetEndTimeOptionsArgs) {
  const isStartSameEndDate = Boolean(endDate && startDate === endDate);
  const isEndSameNowDate = endDate
    ? TimeService.isDateSame(endDate, dateNow)
    : false;

  function getStartDate() {
    if (isStartSameEndDate && startDate && startTime) {
      return getJointDateAndTime(startDate, startTime);
    } else if (isEndSameNowDate) {
      return dateNow;
    }
    return TimeService.getStartOfDate();
  }

  const trimmedStartMinutes = isStartSameEndDate
    ? ({ trimmedTimeInMinutes: { start: 30 } } as const)
    : null;

  return getDayHoursOptions({
    startDate: getStartDate(),
    ...trimmedStartMinutes,
  });
}
