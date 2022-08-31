import { TimeService } from 'Services';
import { Event } from 'Types/api';
import { omit } from 'Utils/helpers/object';
import { EventFormValues } from './EventForm';

export function getEventFormDefaultValues(
  defaultEvent?: Event,
): EventFormValues | undefined {
  if (defaultEvent) {
    const { startDateISO, endDateISO, ...newDefaultEvent } = omit(
      defaultEvent,
      ['id'],
    );

    const startDate = TimeService.getDate(startDateISO);
    const newStartDate = startDate.startOf('date').toISOString();
    const startTime = `${startDate.hour()}:${startDate.minute()}`;

    const endDate = TimeService.getDate(endDateISO);
    const newEndDate = endDate.startOf('date').toISOString();
    const endTime = `${endDate.hour()}:${endDate.minute()}`;

    return {
      startTime,
      endTime,
      startDate: newStartDate,
      endDate: newEndDate,
      ...newDefaultEvent,
    };
  }
}
