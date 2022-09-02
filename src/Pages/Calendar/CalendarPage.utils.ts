import { SubmittedEventFormValues } from 'Components/modals/EventModal/components/EventForm/EventForm';
import { ToastService } from 'Services';
import {
  useAddEventMutation,
  useUpdateEventMutation,
} from 'Store/features/events/events.slice';
import { Event } from 'Types/api';
import { getJointDateAndTime } from 'Utils/helpers/date';

interface OnEventFormSubmitArgs {
  values: SubmittedEventFormValues;
  addEvent: ReturnType<typeof useAddEventMutation>[0];
  updateEvent: ReturnType<typeof useUpdateEventMutation>[0];
  eventForChanging?: Event;
  onCloseEventModal(): void;
}

export function onEventFormSubmit({
  addEvent,
  updateEvent,
  eventForChanging,
  onCloseEventModal,
  values: { endDate, endTime, startTime, startDate, ...newFields },
}: OnEventFormSubmitArgs) {
  const startDateISO = getJointDateAndTime(startDate, startTime)?.toISOString();
  const endDateISO = getJointDateAndTime(endDate, endTime)?.toISOString();
  const operationType = eventForChanging ? 'changing' : 'adding';

  if (!startDateISO || !endDateISO) return;

  const newEvent = {
    ...newFields,
    startDateISO,
    endDateISO,
  };

  const fetchPromise = eventForChanging
    ? updateEvent({
        id: String(eventForChanging.id),
        updatedFields: newEvent,
      })
    : addEvent(newEvent);

  fetchPromise
    .then(() => {
      onCloseEventModal();
      ToastService.success(`Success ${operationType} event`);
    })
    .catch(() => ToastService.error(`Error ${operationType} event`));
}