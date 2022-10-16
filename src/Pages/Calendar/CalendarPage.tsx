import styled from 'styled-components/macro';
import { Loader } from 'Components/common';
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
    <Root>
      <PageHeader>
        <PageTitle>Availability</PageTitle>
        <EventAdding />
      </PageHeader>

      <Wrapper>
        <EventsCalendar />
        <EventsViewer />
      </Wrapper>
    </Root>
  );
}

const Root = styled.article`
  display: flex;
  flex-direction: column;
  padding: 40px;
  height: 100%;
`;

const PageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 30px;
`;

const PageTitle = styled.h1`
  font-size: 50px;
  font-weight: 700;
  line-height: 60px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 300px) 1fr;
  grid-gap: 0 25px;
  overflow: hidden;
`;

export default CalendarPage;
