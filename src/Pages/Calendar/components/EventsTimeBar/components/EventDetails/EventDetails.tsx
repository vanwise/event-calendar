import styled from 'styled-components/macro';
import { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'Hooks';
import { TimeServiceDate } from 'Services/TimeService';
import { selectEventById } from 'Store/features/events/events.selectors';
import { selectTagById } from 'Store/features/tags/tags.selectors';
import { Event } from 'Types/api';
import { HOUR_TEXT_WIDTH_IN_PX } from '../HoursList/HoursList';
import { getEventTimeProps } from './EventDetails.utils';

interface EventDetailsProps {
  eventId: EntityId;
  onClick(event: Event): void;
  activeDate: TimeServiceDate;
}

function EventDetails({ eventId, onClick, activeDate }: EventDetailsProps) {
  const event = useAppSelector(store => selectEventById(store, eventId));
  const eventTag = useAppSelector(store =>
    selectTagById(store, event?.tagId || ''),
  );

  if (!event) {
    return null;
  }

  const {
    startTime,
    duration,
    geometryByTime: { topPosition, eventHeight },
  } = getEventTimeProps(event, activeDate);

  return (
    <Root $topPosition={topPosition} $eventHeight={eventHeight}>
      <Wrapper onClick={() => onClick(event)}>
        <TimeWrapper>
          <Time>{startTime}</Time>
          <Duration>{duration}</Duration>
        </TimeWrapper>

        <Title>{event.title}</Title>
        <Tag>{eventTag?.title}</Tag>
      </Wrapper>
    </Root>
  );
}

const Root = styled.li<{ $topPosition: number; $eventHeight: number }>`
  position: absolute;
  top: ${({ $topPosition }) => $topPosition}px;
  right: 10px;
  display: flex;
  padding: 5px;
  width: calc(100% - ${HOUR_TEXT_WIDTH_IN_PX + 20}px);
  height: ${({ $eventHeight }) => $eventHeight}px;
  background: var(--violet2);
  border-radius: 15px;
  border: 1px solid var(--gray6);
`;

const Wrapper = styled.div`
  position: relative;
  flex-grow: 1;
  border-radius: 10px;
  padding: 5px 5px 5px 15px;
  overflow: hidden;
  background: white;
  font-weight: 400;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 0;
    width: 5px;
    height: calc(100% + 10px);
    background: var(--violet);
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Time = styled.p`
  color: var(--black2);
`;

const Duration = styled.p`
  color: var(--gray7);
`;

const Title = styled.p`
  color: var(--gray3);
`;

const Tag = styled.p`
  color: var(--gray7);
  font-weight: 500;
`;

export default EventDetails;
