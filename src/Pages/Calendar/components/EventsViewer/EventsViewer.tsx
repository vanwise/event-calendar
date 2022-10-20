import styled from 'styled-components/macro';
import { HiddenTitle } from 'Components/text';
import { useAppSelector } from 'Hooks';
import { selectActiveEventId } from 'Store/features/eventsFilter/eventsFilter.selectors';
import EventsTimeBar from '../EventsTimeBar';
import { EventDetails } from './components';

function EventsViewer() {
  const activeEventId = useAppSelector(selectActiveEventId);

  return (
    <Root $isActive={Boolean(activeEventId)}>
      <HiddenTitle level={2}>Events viewer</HiddenTitle>
      <EventsTimeBar />

      {activeEventId ? (
        <EventDetails eventId={activeEventId} />
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
