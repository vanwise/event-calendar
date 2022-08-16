import styled from 'styled-components/macro';
import { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'Hooks';
import { TimeServiceDate } from 'Services/TimeService';
import { selectEventById } from 'Store/features/events/events.selectors';
import { HOUR_TEXT_WIDTH_IN_PX } from '../../EventsTimeBar.utils';
import { getEventTimeProps } from './EventDetails.utils';

interface EventDetailsProps {
  eventId: EntityId;
  activeDate: TimeServiceDate;
}

function EventDetails({ eventId, activeDate }: EventDetailsProps) {
  const event = useAppSelector(state => selectEventById(state, eventId));

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
      <Wrapper>
        <TimeWrapper>
          <Time>{startTime}</Time>
          <Duration>{duration}</Duration>
        </TimeWrapper>

        <Title>{event.title}</Title>
        <Tag>{event.tag}</Tag>
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
  color: var(--black3);
`;

const Title = styled.p`
  color: var(--gray3);
`;

const Tag = styled.p`
  color: var(--black3);
  font-weight: 500;
`;

export default EventDetails;
