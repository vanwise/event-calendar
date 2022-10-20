import styled from 'styled-components/macro';
import { EntityId } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'Hooks';
import { selectGroupedEventsByActiveDate } from 'Store/features/events/events.selectors';
import { EventData } from 'Store/features/events/events.utils';
import { selectActiveEventId } from 'Store/features/eventsFilter/eventsFilter.selectors';
import { changeActiveEventId } from 'Store/features/eventsFilter/eventsFilter.slice';
import { HOUR_TEXT_WIDTH_IN_PX } from '../HoursList/HoursList';
import { EventDetails } from './components';

function EventGroups() {
  const dispatch = useAppDispatch();

  const activeEventId = useAppSelector(selectActiveEventId);
  const groupedEvents = useAppSelector(selectGroupedEventsByActiveDate);

  function handleEventClick(eventId: EntityId) {
    const newActiveEventID = activeEventId === eventId ? null : eventId;
    dispatch(changeActiveEventId(newActiveEventID));
  }

  function renderEvent(eventData: EventData, groupedIndex?: number) {
    const eventId = eventData.event.id;

    return (
      <EventDetails
        key={eventId}
        eventData={eventData}
        onClick={() => handleEventClick(eventId)}
        isActive={eventId === activeEventId}
        groupedIndex={groupedIndex}
      />
    );
  }

  return (
    <Root>
      {groupedEvents.map((eventData, index) => {
        if (!Array.isArray(eventData)) {
          return renderEvent(eventData);
        }

        const groupTopPosition =
          eventData[0]?.[0]?.timeProps.geometryByTime.topPosition ?? 0;

        return (
          <EventsGroup
            key={index}
            $columnCount={eventData.length}
            $topPosition={groupTopPosition}>
            {eventData.map((groupedEventData, groupedIndex) => (
              <li key={groupedIndex}>
                {groupedEventData.map(event =>
                  renderEvent(event, groupedIndex),
                )}
              </li>
            ))}
          </EventsGroup>
        );
      })}
    </Root>
  );
}

const Root = styled.div`
  position: absolute;
  top: 0;
  left: ${HOUR_TEXT_WIDTH_IN_PX}px;
  width: calc(100% - ${HOUR_TEXT_WIDTH_IN_PX}px);
  height: 100%;
`;

const EventsGroup = styled.ul<{ $topPosition: number; $columnCount: number }>`
  position: absolute;
  top: ${({ $topPosition }) => $topPosition}px;
  display: grid;
  grid-template-columns: repeat(
    ${({ $columnCount }) => $columnCount},
    calc(50% - 5px - ${({ $columnCount }) => ($columnCount > 2 ? 20 : 0)}px)
  );
  grid-gap: 0 10px;
  align-items: start;
  padding: 0 10px;
  width: 100%;
  overflow: overlay;
`;

export default EventGroups;
