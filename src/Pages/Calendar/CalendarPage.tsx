import styled from 'styled-components/macro';
import { DateRangePicker } from 'Components/forms';
import {
  selectFilterDateRange,
  setDateRange,
} from 'Store/features/eventsFilter/eventsFilterSlice';
import { useAppDispatch, useAppSelector } from 'Hooks/store';

function CalendarPage() {
  const dispatch = useAppDispatch();
  const dateRange = useAppSelector(selectFilterDateRange);

  return (
    <Root>
      <DateRangePicker
        defaultSelectedDates={dateRange}
        onSelectedDatesChange={dates => dispatch(setDateRange(dates))}
      />
    </Root>
  );
}

const Root = styled.div`
  padding: 40px;
`;

export default CalendarPage;
