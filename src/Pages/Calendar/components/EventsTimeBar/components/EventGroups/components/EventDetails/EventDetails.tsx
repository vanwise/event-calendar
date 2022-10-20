import styled, { css } from 'styled-components/macro';
import { TextWithLineClamp } from 'Components/text';
import { useAppSelector } from 'Hooks';
import { EventData } from 'Store/features/events/events.utils';
import { selectTagById } from 'Store/features/tags/tags.selectors';
import { useSmallEventTitle } from './EventDetails.hooks';

interface EventDetailsProps {
  eventData: EventData;
  onClick(): void;
  isActive: boolean;
  groupedIndex?: number;
}
interface RootProps {
  $topPosition: number;
  $eventHeight: number;
  $isActive: boolean;
  $groupedIndex?: number;
}

function EventDetails({
  onClick,
  isActive,
  groupedIndex,
  eventData: {
    event,
    timeProps: {
      startTime,
      duration,
      geometryByTime: { topPosition, eventHeight },
    },
  },
}: EventDetailsProps) {
  const eventTag = useAppSelector(store => selectTagById(store, event.tagId));

  const { isTitleVisible, measuredTitleRef } = useSmallEventTitle();

  return (
    <Root
      $isActive={isActive}
      $topPosition={topPosition}
      $eventHeight={eventHeight}
      $groupedIndex={groupedIndex}>
      <Wrapper onClick={onClick} title={event.title} $isActive={isActive}>
        <TimeWrapper>
          <Time>{startTime}</Time>
          {!isTitleVisible && (
            <Title $isSmall>
              <TextWithLineClamp>{event.title}</TextWithLineClamp>
            </Title>
          )}
          <Duration>{duration}</Duration>
        </TimeWrapper>

        <Title ref={measuredTitleRef}>{event?.title}</Title>
        <Description lineCount={2} title={event.description}>
          {event.description}
        </Description>
        <Tag>{eventTag?.title}</Tag>
      </Wrapper>
    </Root>
  );
}

const activeRootCSS = css`
  border: 2px solid var(--violet);
  background-color: var(--violet2);
`;

const groupedRootCSS = css<RootProps>`
  position: static;
  top: auto;
  left: auto;
  flex-shrink: 0;
  margin: ${({ $groupedIndex = 0, $topPosition }) =>
      $groupedIndex > 0 ? $topPosition : 0}px
    0 0;
  width: 100%;
`;

const Root = styled.section<RootProps>`
  position: absolute;
  top: ${({ $topPosition }) => $topPosition}px;
  left: calc(${({ $groupedIndex = 0 }) => `50% * ${$groupedIndex} + 10px`});
  display: flex;
  padding: 5px;
  width: calc(
    100% / ${({ $groupedIndex }) => (Number.isInteger($groupedIndex) ? 2 : 1)} -
      20px
  );
  height: ${({ $eventHeight }) => $eventHeight}px;
  background: var(--violet2);
  border-radius: 15px;
  border: 1px solid var(--gray6);
  transition: 0.3s ease-out;
  user-select: none;

  ${({ $groupedIndex }) => Number.isInteger($groupedIndex) && groupedRootCSS}
  ${({ $isActive }) => $isActive && activeRootCSS}
`;

const Wrapper = styled.div<{ $isActive: boolean }>`
  position: relative;
  flex-grow: 1;
  border-radius: 10px;
  padding: 5px 5px 5px 15px;
  overflow: hidden;
  background: var(
    ${({ $isActive }) => ($isActive ? '--transparent' : '--white')}
  );
  font-weight: 400;
  cursor: pointer;
  transition: 0.3s ease-out;

  &:hover {
    background-color: var(--violet2);
  }

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
  margin: 0 0 2px;
`;

const Time = styled.p`
  flex-shrink: 0;
  margin: 0 5px 0 0;
  font-size: 13px;
  font-style: italic;
  color: var(--black2);
`;

const Duration = styled.p`
  flex-shrink: 0;
  font-size: 13px;
  color: var(--gray7);
`;

const Title = styled.h3<{ $isSmall?: boolean }>`
  font-size: ${({ $isSmall }) => ($isSmall ? 13 : 18)}px;
  color: var(--gray3);
  overflow: hidden;

  ${({ $isSmall }) => $isSmall && 'margin: 0 auto 0 0;'}
`;

const Description = styled(TextWithLineClamp)`
  color: var(--gray4);
`;

const Tag = styled.p`
  color: var(--gray7);
  font-weight: 500;
`;

export default EventDetails;
