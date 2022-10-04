import { TimeServiceDate } from 'Services/TimeService';
import { getJointDateAndTime } from 'Utils/helpers/date';

const EVENT_NOTIFICATION_START_TIME_IN_MINUTES = 30;

export function isEventReadyForNotification(
  dateNow: TimeServiceDate,
  startDate?: string,
  startTime?: string,
) {
  if (!startDate || !startTime) {
    return false;
  }

  const startDateISO = getJointDateAndTime(startDate, startTime);

  if (!startDateISO) {
    return false;
  }

  const diffFromNowToStartEvent = Math.abs(
    startDateISO.diff(dateNow, 'minutes'),
  );
  return diffFromNowToStartEvent > EVENT_NOTIFICATION_START_TIME_IN_MINUTES;
}
