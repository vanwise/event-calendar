import styled from 'styled-components/macro';
import { Loader } from 'Components';
import { DateRangePicker } from 'Components/forms';
import { useAppDispatch, useAppSelector } from 'Hooks';
import { useGetEventsQuery } from 'Store/features/events/events.slice';
import { selectFilterDateRange } from 'Store/features/eventsFilter/eventsFilter.selectors';
import { changeDateRange } from 'Store/features/eventsFilter/eventsFilter.slice';
import { EventsTimeBar, NearesEvents } from './components';

function CalendarPage() {
  const { isLoading: isEventsLoading } = useGetEventsQuery();

  const dispatch = useAppDispatch();
  const dateRange = useAppSelector(selectFilterDateRange);

  if (isEventsLoading) {
    return <Loader hasFillWholeBlock />;
  }

  return (
    <Root>
      <PageTitle>Availability</PageTitle>
      <Wrapper>
        <DatePicker
          defaultSelectedDates={dateRange}
          onSelectedDatesChange={dates => dispatch(changeDateRange(dates))}
        />
        <EventsTimeBar />
        <NearesEvents />
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

const PageTitle = styled.h1`
  margin: 0 0 10px;
  font-size: 50px;
  font-weight: 700;
  line-height: 60px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 300px) 1fr minmax(auto, 300px);
  grid-gap: 0 25px;
  overflow: hidden;
`;

const DatePicker = styled(DateRangePicker)`
  padding: 15px 0 0;
`;

export default CalendarPage;
