import styled from 'styled-components/macro';
import { DatePicker } from 'Components/inputs';
import { useAppDispatch, useAppSelector } from 'Hooks';
import { TimeService } from 'Services';
import { selecteAllEvents } from 'Store/features/events/events.selectors';
import { selectFilterDateRange } from 'Store/features/eventsFilter/eventsFilter.selectors';
import { changeDateRange } from 'Store/features/eventsFilter/eventsFilter.slice';

function EventsCalendar() {
  const dispatch = useAppDispatch();

  const dateRange = useAppSelector(selectFilterDateRange);
  const allEvents = useAppSelector(selecteAllEvents);

  const daysWithEvents = allEvents.reduce(
    (acc: string[], { startDateISO, endDateISO }) => {
      const startDate = TimeService.getStartOfDate(startDateISO).toISOString();
      const endDate = TimeService.getStartOfDate(endDateISO).toISOString();

      if (!acc.includes(startDate)) {
        acc.push(startDate);
      }
      if (!acc.includes(endDate)) {
        acc.push(endDate);
      }

      return acc;
    },
    [],
  );

  return (
    <DatePickerStylized
      isRange
      markedDays={daysWithEvents}
      defaultDates={dateRange}
      onDateChange={dates => dispatch(changeDateRange(dates))}
    />
  );
}

const DatePickerStylized = styled(DatePicker)`
  padding: 15px 0 0;
`;

export default EventsCalendar;
