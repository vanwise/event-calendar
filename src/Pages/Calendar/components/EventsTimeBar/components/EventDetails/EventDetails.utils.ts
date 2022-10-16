import TimeService, { TimeServiceDate } from 'Services/TimeService';
import { Event } from 'Types/api';
import { DATE_FORMAT, MINUTES_IN_HOUR } from 'Utils/constants/date';
import { HOUR_HEIGHT_IN_PX } from '../HoursList/HoursList';

const ONE_MINUTE_IN_PX = HOUR_HEIGHT_IN_PX / MINUTES_IN_HOUR;
const { HOUR_MINUTES, SHORT_MONTH_DAY_HOURS_MINUTES } = DATE_FORMAT;

export function getEventTimeProps(
  { startDateISO, endDateISO }: Event,
  activeDate: TimeServiceDate,
) {
  const startDate = TimeService.getDate(startDateISO);
  const endDate = TimeService.getDate(endDateISO);

  const isStartDateBeforeActiveDate = startDate.isBefore(activeDate, 'date');
  const startTimeFormat = isStartDateBeforeActiveDate
    ? SHORT_MONTH_DAY_HOURS_MINUTES
    : HOUR_MINUTES;

  const { duration: eventDuration, durationString: duration } =
    TimeService.getDurations(startDate, endDate);

  function getEventGeometry() {
    const startDateDuration = TimeService.getDate.duration({
      hours: startDate.hour(),
      minutes: startDate.minute(),
    });

    const topPosition = isStartDateBeforeActiveDate
      ? 0
      : startDateDuration.asMinutes() * ONE_MINUTE_IN_PX;
    const eventHeight = getCorrectDuration().asMinutes() * ONE_MINUTE_IN_PX;

    function getCorrectDuration() {
      const isEndDateAfterActiveDate = endDate.isAfter(activeDate, 'date');

      if (isEndDateAfterActiveDate) {
        return TimeService.getDate
          .duration({ days: 1 })
          .subtract(startDateDuration);
      } else if (isStartDateBeforeActiveDate) {
        return TimeService.getDate.duration({
          hours: endDate.hour(),
          minutes: endDate.minute(),
        });
      }

      return eventDuration;
    }

    return { topPosition, eventHeight };
  }

  return {
    duration,
    startTime: startDate.format(startTimeFormat),
    geometryByTime: getEventGeometry(),
  };
}
