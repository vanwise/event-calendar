import styled from 'styled-components/macro';
import { Loader } from 'Components/common';
import { PageInnerLayout } from 'Components/layouts';
import { useGetEventsQuery } from 'Store/features/events/events.slice';
import { useGetTagsQuery } from 'Store/features/tags/tags.slice';
import { EventAdding, EventsCalendar, EventsViewer } from './components';

function CalendarPage() {
  const { isLoading: isEventsLoading } = useGetEventsQuery();
  const { isLoading: isTagsLoading } = useGetTagsQuery();

  if (isEventsLoading || isTagsLoading) {
    return <Loader hasFillWholeBlock />;
  }

  return (
    <PageInnerLayout title="Availability" headerRightElement={<EventAdding />}>
      <Wrapper>
        <EventsCalendar />
        <EventsViewer />
      </Wrapper>
    </PageInnerLayout>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 300px) 1fr;
  grid-gap: 0 25px;
  overflow: hidden;
`;

export default CalendarPage;
