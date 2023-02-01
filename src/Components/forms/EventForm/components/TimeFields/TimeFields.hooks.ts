import { useEffect } from 'react';
import TimeService, { TimeServiceDate } from 'Services/TimeService';
import { getJointDateAndTime } from 'Utils/helpers/date';
import { EventFormValues } from '../../EventForm';
import { TimeFieldsProps } from './TimeFields';

type UseEndTimeResetingArgs = Pick<TimeFieldsProps, 'resetFormField'> &
  Pick<EventFormValues, 'startDate' | 'endDate' | 'startTime' | 'endTime'>;

export function useEndTimeReseting({
  endDate,
  endTime,
  startTime,
  startDate,
  resetFormField,
}: UseEndTimeResetingArgs) {
  useEffect(() => {
    if (!endDate || !startTime || !endTime || startDate !== endDate) return;

    const startTimeObject = getJointDateAndTime(startDate, startTime);
    const endTimeObject = getJointDateAndTime(endDate, endTime);

    if (startTimeObject?.isSameOrAfter(endTimeObject)) {
      resetFormField('endTime');
    }
  }, [startDate, endDate, startTime, endTime, resetFormField]);
}

type UseStartTimeResetingArgs = Pick<TimeFieldsProps, 'resetFormField'> &
  Pick<EventFormValues, 'startDate' | 'startTime'> & {
    dateNow: TimeServiceDate;
  };

export function useStartTimeResetingByNow({
  dateNow,
  startTime,
  startDate,
  resetFormField,
}: UseStartTimeResetingArgs) {
  useEffect(() => {
    if (!startDate || !startTime) return;

    const isStartSameNowDate = TimeService.isDateSame(dateNow, startDate);

    if (isStartSameNowDate) {
      const dateWithStartTime = getJointDateAndTime(
        TimeService.getStartOfDate(),
        startTime,
      );

      if (dateNow.isAfter(dateWithStartTime)) {
        resetFormField('startTime');
      }
    }
  }, [dateNow, startDate, startTime, resetFormField]);
}
