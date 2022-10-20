import styled from 'styled-components/macro';
import { EventGroups, HeaderWithDate, HoursList } from './components';
import { useActiveDate, useInitialTimeBarScroll } from './EventsTimeBar.hooks';

function EventsTimeBar() {
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
        <SlideWrapper ref={sliderRef}>
          <HoursList />
          {activeDate && <EventGroups />}
        </SlideWrapper>
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

const SlideWrapper = styled.div`
  position: relative;

  height: 100%;
  background: white;
  border-radius: 10px;
  overflow: auto;
`;

export default EventsTimeBar;
