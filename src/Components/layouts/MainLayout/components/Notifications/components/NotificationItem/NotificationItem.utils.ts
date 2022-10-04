import { TimeService } from 'Services';

export function getNotificationStartDate(startDateISO: string) {
  const startDate = TimeService.getDate(startDateISO);
  const startOfNow = TimeService.getStartOfDate();

  return startOfNow.isAfter(startDate)
    ? startDate.calendar()
    : startDate.fromNow();
}
