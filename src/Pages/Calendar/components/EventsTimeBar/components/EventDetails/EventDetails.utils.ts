import TimeService, { TimeServiceDate } from 'Services/TimeService';
import { Event } from 'Types/api';
import { DATE_FORMAT } from 'Utils/constants/date';
import { HOUR_HEIGHT_IN_PX } from '../../EventsTimeBar.utils';

const ONE_MINUTE_IN_PX = HOUR_HEIGHT_IN_PX / 60;
const { HOUR_MINUTES, SHORT_MONTH_DAY_HOURS_MINUTES } = DATE_FORMAT;

export function getEventTimeProps(
  { startDateISO, endDateISO }: Event,
  activeDate: TimeServiceDate,
) {
  const startDate = TimeService.getDate(startDateISO);
  const endDate = TimeService.getDate(endDateISO);

  const isStartDateBeforeActiveDate = startDate.isBefore(activeDate, 'date');
  const eventDuration = TimeService.getDate.duration(
    Math.abs(startDate.diff(endDate, 'minutes')),
    'minutes',
  );
  const durationInHours = eventDuration.hours();
  const durationInMinutes = eventDuration.minutes();

  const startTimeFormat = isStartDateBeforeActiveDate
    ? SHORT_MONTH_DAY_HOURS_MINUTES
    : HOUR_MINUTES;
  const duration = `${durationInHours ? `${durationInHours}h ` : ''}${
    durationInMinutes ? `${durationInMinutes} min` : ''
  }`;

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
