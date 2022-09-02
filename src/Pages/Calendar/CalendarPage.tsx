import { useCallback, useState } from 'react';
import styled from 'styled-components/macro';
import { Loader } from 'Components';
import { Button } from 'Components/buttons';
import { DatePicker } from 'Components/inputs';
import { EventModal } from 'Components/modals';
import {
  EventFormValues,
  SubmittedEventFormValues,
} from 'Components/modals/EventModal/components/EventForm/EventForm';
import { useAppDispatch, useAppSelector } from 'Hooks';
import { ToastService } from 'Services';
import {
  useAddEventMutation,
  useDeleteEventMutation,
  useGetEventsQuery,
  useUpdateEventMutation,
} from 'Store/features/events/events.slice';
import { selectFilterDateRange } from 'Store/features/eventsFilter/eventsFilter.selectors';
import { changeDateRange } from 'Store/features/eventsFilter/eventsFilter.slice';
import { useGetTagsQuery } from 'Store/features/tags/tags.slice';
import { Event } from 'Types/api';
import { onEventFormSubmit } from './CalendarPage.utils';
import { EventsTimeBar, NearesEvents } from './components';

function CalendarPage() {
  const dispatch = useAppDispatch();

  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [eventForChanging, setEventForChanging] = useState<Event>();

  const { isLoading: isEventsLoading } = useGetEventsQuery();
  const { isLoading: isTagsLoading } = useGetTagsQuery();

  const [addEvent, { isLoading: isLoadingAddingEvent }] = useAddEventMutation();
  const [updateEvent, { isLoading: isLoadingUpdatingEvent }] =
    useUpdateEventMutation();
  const [deleteEvent, { isLoading: isLoadingDeletingEvent }] =
    useDeleteEventMutation();

  const dateRange = useAppSelector(selectFilterDateRange);

  const handleCloseEventModal = useCallback(() => {
    setEventForChanging(undefined);
    setIsEventModalVisible(false);
  }, []);

  if (isEventsLoading || isTagsLoading) {
    return <Loader hasFillWholeBlock />;
  }

  function openEventModal() {
    setIsEventModalVisible(true);
  }

  function handleEventClick(event: Event) {
    setEventForChanging(event);
    openEventModal();
  }

  function handleEventFormSubmit(values: EventFormValues) {
    onEventFormSubmit({
      values: values as SubmittedEventFormValues,
      addEvent,
      updateEvent,
      eventForChanging,
      onCloseEventModal: handleCloseEventModal,
    });
  }

  function handleEventDeleteClick() {
    if (eventForChanging) {
      deleteEvent(String(eventForChanging.id))
        .then(() => {
          handleCloseEventModal();
          ToastService.success('Success deleting event');
        })
        .catch(() => ToastService.error('Error deleting event'));
    }
  }

  const isFetching =
    isLoadingAddingEvent || isLoadingUpdatingEvent || isLoadingDeletingEvent;

  return (
    <Root>
      <PageHeader>
        <PageTitle>Availability</PageTitle>
        <Button onClick={openEventModal}>Add event</Button>
      </PageHeader>

      <Wrapper>
        <DatePickerStylized
          isRange
          defaultDates={dateRange}
          onDateChange={dates => dispatch(changeDateRange(dates))}
        />
        <EventsTimeBar onEventClick={handleEventClick} />
        <NearesEvents />
      </Wrapper>

      <EventModal
        onClose={handleCloseEventModal}
        onSubmit={handleEventFormSubmit}
        isVisible={isEventModalVisible}
        isLoading={isFetching}
        eventForChanging={eventForChanging}
        onDeleteEventClick={handleEventDeleteClick}
      />
    </Root>
  );
}

const Root = styled.article`
  display: flex;
  flex-direction: column;
  padding: 40px;
  height: 100%;
`;

const PageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 10px;
`;

const PageTitle = styled.h1`
  font-size: 50px;
  font-weight: 700;
  line-height: 60px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 300px) 1fr minmax(auto, 300px);
  grid-gap: 0 25px;
  overflow: hidden;
`;

const DatePickerStylized = styled(DatePicker)`
  padding: 15px 0 0;
`;

export default CalendarPage;
