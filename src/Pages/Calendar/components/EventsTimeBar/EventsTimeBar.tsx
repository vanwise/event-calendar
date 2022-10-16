import styled from 'styled-components/macro';
import { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'Hooks';
import { selectEventsIdsByActiveDate } from 'Store/features/events/events.selectors';
import { EventDetails, HeaderWithDate, HoursList } from './components';
import { useActiveDate, useInitialTimeBarScroll } from './EventsTimeBar.hooks';

interface EventsTimeBarProps {
  activeEventId: Nullable<EntityId>;
  onEventClick(eventId: EntityId): void;
}

function EventsTimeBar({ onEventClick, activeEventId }: EventsTimeBarProps) {
  const filteredEventsIds = useAppSelector(selectEventsIdsByActiveDate);

  const activeDate = useActiveDate();
  const { sliderRef } = useInitialTimeBarScroll();

  function scrollToTopOfSlider() {
    sliderRef.current?.scroll({ top: 0, behavior: 'smooth' });
  }

  return (
    <Root>
      <HeaderWithDate
        activeDate={activeDate}
        onNavigationButtonClick={scrollToTopOfSlider}
      />

      <Wrapper>
        <Inner>
          <SlideWrapper ref={sliderRef}>
            <HoursList />

            {activeDate && (
              <ul>
                {filteredEventsIds.map(eventId => (
                  <EventDetails
                    key={eventId}
                    eventId={eventId}
                    onClick={() => onEventClick(eventId)}
                    isActive={eventId === activeEventId}
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
