import styled from 'styled-components/macro';
import { useAppSelector } from 'Hooks';
import { TimeService } from 'Services';
import { selectEventsIdsByActiveDate } from 'Store/features/events/events.selectors';
import { selectFilterActiveDate } from 'Store/features/eventsFilter/eventsFilter.selectors';
import { Event } from 'Types/api';
import { EventDetails, HeaderWithDate, HoursList } from './components';

interface EventsTimeBarProps {
  onEventClick(event: Event): void;
}

function EventsTimeBar({ onEventClick }: EventsTimeBarProps) {
  const filterActiveDate = useAppSelector(selectFilterActiveDate);
  const filteredEventsIds = useAppSelector(selectEventsIdsByActiveDate);

  const activeDate = filterActiveDate
    ? TimeService.getDate(filterActiveDate)
    : undefined;

  return (
    <Root>
      <HeaderWithDate activeDate={activeDate} />

      <Wrapper>
        <Inner>
          <SlideWrapper>
            <HoursList />

            {activeDate && (
              <ul>
                {filteredEventsIds.map(eventId => (
                  <EventDetails
                    key={eventId}
                    eventId={eventId}
                    onClick={onEventClick}
                    activeDate={activeDate}
                  />
                ))}
              </ul>
            )}
          </SlideWrapper>
        </Inner>
      </Wrapper>
    </Root>
  );
}

const Root = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
`;

const Wrapper = styled.section`
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

export default EventsTimeBar;
