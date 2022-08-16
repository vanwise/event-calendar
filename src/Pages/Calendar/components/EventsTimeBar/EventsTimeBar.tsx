import styled from 'styled-components/macro';
import { useAppSelector } from 'Hooks';
import { TimeService } from 'Services';
import { selectEventsIdsByActiveDate } from 'Store/features/events/events.selectors';
import { selectFilterActiveDate } from 'Store/features/eventsFilter/eventsFilter.selectors';
import { EmptyBlock, EventDetails, HeaderWithDate } from './components';
import {
  getDayHours,
  HOUR_HEIGHT_IN_PX,
  HOUR_TEXT_WIDTH_IN_PX,
} from './EventsTimeBar.utils';

const dayHours = getDayHours();

function EventsTimeBar() {
  const filterActiveDate = useAppSelector(selectFilterActiveDate);
  const filteredEventsIds = useAppSelector(selectEventsIdsByActiveDate);

  if (!filterActiveDate) {
    return <EmptyBlock />;
  }

  const activeDate = TimeService.getDate(filterActiveDate);

  return (
    <Root>
      <HeaderWithDate activeDate={activeDate} />

      <Wrapper>
        <Inner>
          <SlideWrapper>
            <ul>
              {dayHours.map(hour => (
                <HourItem key={hour}>
                  <HourText>{hour}</HourText>
                </HourItem>
              ))}
            </ul>

            <ul>
              {filteredEventsIds.map(eventId => (
                <EventDetails
                  key={eventId}
                  eventId={eventId}
                  activeDate={activeDate}
                />
              ))}
            </ul>
          </SlideWrapper>
        </Inner>
      </Wrapper>
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
`;

const Wrapper = styled.div`
  flex-grow: 1;
  padding: 15px;
  background: linear-gradient(135deg, var(--gray5), var(--gray6));
  overflow: hidden;
`;

const Inner = styled.div`
  height: 100%;
  background: white;
  border-radius: 10px;
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  position: relative;
  overflow: auto;
  height: 100%;
`;

const HourItem = styled.li`
  position: relative;
  display: flex;
  height: ${HOUR_HEIGHT_IN_PX}px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: calc(100% - 80px);
    height: 1px;
    background: var(--gray2);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray2);
  }
`;

const HourText = styled.p`
  display: flex;
  justify-content: center;
  padding: 15px 0;
  width: ${HOUR_TEXT_WIDTH_IN_PX}px;
  font-weight: 400;
  color: var(--gray4);
  border-right: 1px solid var(--gray2);
`;

export default EventsTimeBar;
