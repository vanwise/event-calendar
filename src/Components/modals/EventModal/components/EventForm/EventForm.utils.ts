import { TimeService, ValidationService } from 'Services';
import { Event } from 'Types/api';
import { omit } from 'Utils/helpers/object';
import { EventFormValues } from './EventForm';

export const eventFormValidations = ValidationService.object({
  title: ValidationService.string().trimAndRequired(),
  description: ValidationService.string(),
  tagId: ValidationService.string().required().uuid(),
  startDate: ValidationService.string().required().dateISO(),
  endDate: ValidationService.string().required().dateISO(),
  startTime: ValidationService.string().required().dateISO(),
  endTime: ValidationService.string().required().dateISO(),
  hasReminder: ValidationService.boolean(),
});

export function getEventFormDefaultValues(
  defaultEvent?: Event,
): EventFormValues | undefined {
  if (defaultEvent) {
    const {
      startDateISO,
      endDateISO,
      notificationId,
      title,
      description,
      tagId,
    } = omit(defaultEvent, ['id']);

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
}
