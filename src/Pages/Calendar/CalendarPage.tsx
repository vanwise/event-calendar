import styled from 'styled-components/macro';
import { DateRangePicker } from 'Components/forms';
import { changeDateRange } from 'Store/features/eventsFilter/eventsFilter.slice';
import { selectFilterDateRange } from 'Store/features/eventsFilter/eventsFilter.selectors';
import { useAppDispatch, useAppSelector } from 'Hooks';
import { EventsTimeBar, NearesEvents } from './components';
import { useGetEventsQuery } from 'Store/features/events/events.slice';
import { Loader } from 'Components';

function CalendarPage() {
  const { isLoading: isEventsLoading } = useGetEventsQuery();

  const dispatch = useAppDispatch();
  const dateRange = useAppSelector(selectFilterDateRange);

  if (isEventsLoading) {
    return <Loader hasFillWholeBlock />;
  }

  return (
    <Root>
      <DatePicker
        defaultSelectedDates={dateRange}
        onSelectedDatesChange={dates => dispatch(changeDateRange(dates))}
      />
      <EventsTimeBar />
      <NearesEvents />
    </Root>
  );
}

const DatePicker = styled(DateRangePicker)`
  padding: 15px 0 0;
`;

const Root = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 300px) 1fr minmax(auto, 300px);
  grid-gap: 0 25px;
  padding: 40px;
  height: 100%;
`;

export default CalendarPage;
