import { compose } from '@reduxjs/toolkit';
import TimeService, {
  TimeServiceDate,
  TimeServiceRawDate,
} from 'Services/TimeService';
import { DATE_FORMAT, HOURS_IN_DAY, MINUTES_IN_HOUR } from '../constants/date';

export function getDayHours(initialDay?: TimeServiceDate) {
  const startOfDay = TimeService.getStartOfDate(initialDay);

  return [...Array(HOURS_IN_DAY)].map((_, index) =>
    startOfDay.hour(index).format(DATE_FORMAT.HOUR_MINUTES),
  );
}

type TimeStepInMinutes = 15 | 30 | 45 | 60;
interface TrimmedTimeInMinutes {
  end?: number;
  start?: number;
}

interface GetDayHoursOptionsArgs {
  startDate?: TimeServiceRawDate;
  timeStepInMinutes?: TimeStepInMinutes;
  trimmedTimeInMinutes?: TrimmedTimeInMinutes;
}

const TWENTY_FOUR_HOUR_OPTION = {
  value: '24:00',
  label: '12:00 AM',
};

export function getDayHoursOptions({
  startDate,
  timeStepInMinutes = 30,
  trimmedTimeInMinutes,
}: GetDayHoursOptionsArgs): SelectOption[] {
  let currentDate = TimeService.getStartOfDate(startDate);
  let allMinutesInDay = HOURS_IN_DAY * MINUTES_IN_HOUR;

  const options: SelectOption[] = [];

  function handleStartDate() {
    if (startDate) {
      const startDateMinutes = TimeService.getDurationFromStartOfDay(
        startDate,
        'minutes',
      );
      const roundedMinutes =
        Math.ceil(startDateMinutes / timeStepInMinutes) * timeStepInMinutes;

      currentDate = currentDate.set('minutes', roundedMinutes);
      allMinutesInDay -= roundedMinutes;
    }
  }

  function handleTrimmedTimes() {
    if (trimmedTimeInMinutes) {
      const { start = 0, end = 0 } = trimmedTimeInMinutes;

      currentDate = currentDate.add(start, 'minutes');
      allMinutesInDay -= start + end;
    }
  }

  function setOptions() {
    for (
      let minutes = 0;
      minutes <= allMinutesInDay;
      minutes += timeStepInMinutes
    ) {
      const date = currentDate.add(minutes, 'minutes');
      const isLastOption = minutes === allMinutesInDay;

      const option =
        isLastOption && !trimmedTimeInMinutes?.end
          ? TWENTY_FOUR_HOUR_OPTION
          : {
              value: `${date.hour()}:${date.minute()}`,
              label: date.format(DATE_FORMAT.HOUR_MINUTES),
            };

      options.push(option);
    }
  }

  compose(setOptions, handleTrimmedTimes, handleStartDate)();

  return options;
}

type HourString = string | undefined;

export function parseHourString(timeString = '') {
  const [hour, minutes] = timeString.split(':') as [HourString, HourString];
  return [hour, minutes];
}

export function getJointDateAndTime(date: TimeServiceRawDate, time: string) {
  const [hour = 0, minutes = 0] = parseHourString(time);
  const dateObject = TimeService.getDate(date);

  const newDate = TimeService.addMultiple(dateObject, {
    hours: +hour,
    minutes: +minutes,
  });

  if (newDate.isValid()) {
    return newDate;
  }
}
