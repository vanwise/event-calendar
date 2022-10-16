import {
  EventFormValues,
  SubmittedEventFormValues,
} from 'Components/modals/EventModal/components/EventForm/EventForm';
import EventModal, {
  EventModalProps,
} from 'Components/modals/EventModal/EventModal';
import { useModal } from 'Hooks/modals';
import { ToastService } from 'Services';
import {
  useAddEventMutation,
  useDeleteEventMutation,
  useUpdateEventMutation,
} from 'Store/features/events/events.slice';
import { Event } from 'Types/api';
import { onEventFormSubmit } from './useEventModal.utils';

function useEventModal() {
  const [addEvent, { isLoading: isLoadingAddingEvent }] = useAddEventMutation();
  const [updateEvent, { isLoading: isLoadingUpdatingEvent }] =
    useUpdateEventMutation();
  const [deleteEvent, { isLoading: isLoadingDeletingEvent }] =
    useDeleteEventMutation();

  const isLoading =
    isLoadingAddingEvent || isLoadingUpdatingEvent || isLoadingDeletingEvent;

  const {
    data: eventForChanging,
    open: openEventModal,
    close: closeEventModal,
  } = useModal<Event, EventModalProps>(EventModal, eventForChanging => ({
    isLoading,
    eventForChanging,
    onSubmit: handleEventFormSubmit,
    onDeleteEventClick: handleDeleteEventClick,
  }));

  function handleEventFormSubmit(values: EventFormValues) {
    return onEventFormSubmit({
      values: values as SubmittedEventFormValues,
      addEvent,
      updateEvent,
      eventForChanging,
      onCloseEventModal: closeEventModal,
    });
  }

  function handleDeleteEventClick() {
    if (!eventForChanging) return;

    deleteEvent(String(eventForChanging.id))
      .unwrap()
      .then(() => {
        closeEventModal();
        ToastService.success('Success deleting event');
      });
  }

  return { openEventModal, closeEventModal };
}

export default useEventModal;
