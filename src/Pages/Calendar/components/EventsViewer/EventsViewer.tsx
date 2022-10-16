import styled from 'styled-components/macro';
import { EntityId } from '@reduxjs/toolkit';
import { HiddenTitle } from 'Components/text';
import { useAppDispatch, useAppSelector } from 'Hooks';
import { selectActiveEventId } from 'Store/features/eventsFilter/eventsFilter.selectors';
import { changeActiveEventId } from 'Store/features/eventsFilter/eventsFilter.slice';
import EventsTimeBar from '../EventsTimeBar';
import { EventDetails } from './components';

function EventsViewer() {
  const dispatch = useAppDispatch();
  const activeEventId = useAppSelector(selectActiveEventId);

  function setActiveEventId(eventId: Nullable<EntityId>) {
    dispatch(changeActiveEventId(eventId));
  }

  function handleEventClick(eventId: EntityId) {
    setActiveEventId(activeEventId === eventId ? null : eventId);
  }

  return (
    <Root $isActive={Boolean(activeEventId)}>
      <HiddenTitle level={2}>Events viewer</HiddenTitle>
      <EventsTimeBar
        onEventClick={handleEventClick}
        activeEventId={activeEventId}
      />

      {activeEventId ? (
        <EventDetails
          eventId={activeEventId}
          onCloseClick={() => setActiveEventId(null)}
        />
      ) : (
        <EmptyText>Select event</EmptyText>
      )}
    </Root>
  );
}

const Root = styled.article<{ $isActive: boolean }>`
  display: grid;
  grid-template-columns: 1fr minmax(auto, 300px);
  grid-gap: 0 25px;
  overflow: hidden;
`;

const EmptyText = styled.p`
  max-width: 200px;
  margin: 0 auto;
  padding: 188px 0 0;
  font-size: 20px;
  font-style: italic;
`;

export default EventsViewer;
