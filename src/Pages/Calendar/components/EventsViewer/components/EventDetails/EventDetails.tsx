import styled, { css } from 'styled-components/macro';
import { EntityId } from '@reduxjs/toolkit';
import { IconButton } from 'Components/buttons';
import { HiddenTitle } from 'Components/text';
import { useAppSelector, useDynamicDateNow } from 'Hooks';
import { selectEventById } from 'Store/features/events/events.selectors';
import { selectTagById } from 'Store/features/tags/tags.selectors';
import { EventDateDetails, EventEditing } from './components';

interface EventDetailsProps {
  eventId: EntityId;
  onCloseClick(): void;
}

const CLOSE_ICON_CSS = css`
  fill: var(--gray3);
`;

function EventDetails({ eventId, onCloseClick }: EventDetailsProps) {
  const dateNow = useDynamicDateNow();
  const event = useAppSelector(state => selectEventById(state, eventId));
  const tag = useAppSelector(state => selectTagById(state, event?.tagId || ''));

  if (!event || !tag) {
    return null;
  }

  const { title, description, startDateISO, endDateISO, notificationId } =
    event;

  const isSheduled = dateNow.isBefore(startDateISO);
  const hasNotification = isSheduled && Boolean(notificationId);

  return (
    <Root>
      <HiddenTitle level={2}>Selected event details</HiddenTitle>
      <CloseButton
        icon="cross"
        title={`Close "${title}" event details`}
        iconCSS={CLOSE_ICON_CSS}
        onClick={onCloseClick}
      />

      <Wrapper>
        <SheduledStatus $isSheduled={isSheduled}>
          {isSheduled ? 'Sheduled' : 'Past'}
        </SheduledStatus>

        <Title>{title}</Title>
        <Text>{tag.title}</Text>

        {isSheduled && <EventEditing event={event} />}
      </Wrapper>

      <Wrapper>
        <HiddenTitle level={3}>Event dates</HiddenTitle>
        <EventDateDetails
          endDateISO={endDateISO}
          startDateISO={startDateISO}
          hasNotification={hasNotification}
        />
      </Wrapper>

      {description && (
        <Wrapper>
          <Title>Description</Title>
          <Text>{description}</Text>
        </Wrapper>
      )}
    </Root>
  );
}

const Root = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  align-content: start;
  grid-gap: 10px 0;
`;

const Wrapper = styled.section`
  padding: 15px;
  border-radius: 20px;
  border: 1px solid var(--gray);
`;

const SheduledStatus = styled.p<{ $isSheduled: boolean }>`
  display: inline-block;
  margin: 0 0 10px;
  padding: 2px 8px;
  color: white;
  border-radius: 20px;
  background: var(${({ $isSheduled }) => ($isSheduled ? '--green' : '--red2')});
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 7px;
  width: 24px;
  height: 24px;
  border-radius: 10px;
  background: var(--gray);
`;

export default EventDetails;
