import { TimeService, ValidationService } from 'Services';
import { Event } from 'Types/api';
import { EventFormValues } from './EventForm';

export type DefaultEventValues = Omit<Event, 'id' | 'createdAt' | 'updatedAt'>;

export const eventFormValidations = ValidationService.object({
  title: ValidationService.string().trimAndRequired(),
  description: ValidationService.string().nullable(),
  tagId: ValidationService.string().required().uuid(),
  startDate: ValidationService.string().required().dateISO(),
  endDate: ValidationService.string().required().dateISO(),
  startTime: ValidationService.string().required(),
  endTime: ValidationService.string().required(),
  hasReminder: ValidationService.boolean(),
});

export function getEventFormDefaultValues(
  defaultEvent?: DefaultEventValues,
): EventFormValues | undefined {
  if (!defaultEvent) return;

  const {
    startDateISO,
    endDateISO,
    notificationId,
    title,
    description,
    tagId,
  } = defaultEvent;

  const startDate = TimeService.getDate(startDateISO);
  const newStartDate = startDate.startOf('date').toISOString();
  const startTime = `${startDate.hour()}:${startDate.minute()}`;

  const endDate = TimeService.getDate(endDateISO);
  const newEndDate = endDate.startOf('date').toISOString();
  const endTime = `${endDate.hour()}:${endDate.minute()}`;

  return {
    title,
    tagId,
    endDate: newEndDate,
    endTime,
    startDate: newStartDate,
    startTime,
    description,
    hasReminder: Boolean(notificationId),
  };
}
