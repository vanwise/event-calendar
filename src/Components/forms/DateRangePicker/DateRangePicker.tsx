import { useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { ArrowButton } from 'Components/buttons';
import { DATE_FORMAT } from 'Utils/constants/date';
import { Calendar, RangeDate } from './components';
import {
  getDaysInMonth,
  getInitialSelectedDates,
  handleCalendarDateClick,
} from './DateRangePicker.utils';
import TimeService, { TimeServiceDate } from 'Services/TimeService';
import {
  DateRangePickerProps,
  SelectedDate,
  SelectedDates,
  SelectedDateType,
} from './DateRangePicker.types';

function DateRangePicker({
  className,
  defaultSelectedDates,
  onSelectedDatesChange,
}: DateRangePickerProps) {
  const [currentDate, setCurrentDate] = useState(TimeService.getStartOfNow);
  const [selectedDates, setSelectedDates] = useState<SelectedDates>(() =>
    getInitialSelectedDates(defaultSelectedDates),
  );

  const daysInMonth = useMemo(
    () => getDaysInMonth(currentDate, selectedDates),
    [currentDate, selectedDates],
  );

  function increaseCurrentMonth() {
    setCurrentDate(currentDate.add(1, 'month'));
  }

  function decreaseCurrentMonth() {
    setCurrentDate(currentDate.subtract(1, 'month'));
  }

  function updateSelectedDates(incomingDates: SelectedDates) {
    const newDates = {
      from: incomingDates.from,
      to: incomingDates.to?.endOf('date') || null,
    };

    setSelectedDates(newDates);
    onSelectedDatesChange({
      from: newDates.from?.toISOString() || null,
      to: newDates.to?.toISOString() || null,
    });
  }

  function updateSelectedDate(type: SelectedDateType, newDate: SelectedDate) {
    const newDates = { ...selectedDates, [type]: newDate };
    updateSelectedDates(newDates);
  }

  function deleteSelectedDate(type: SelectedDateType) {
    updateSelectedDate(type, null);
  }

  function handleDateFromTextClick() {
    if (selectedDates.from) {
      setCurrentDate(selectedDates.from);
    }
  }

  function handleDateToTextClick() {
    if (selectedDates.to) {
      setCurrentDate(selectedDates.to);
    }
  }

  function handleDateClick(newDate: TimeServiceDate) {
    handleCalendarDateClick({
      newDate,
      currentDate,
      selectedDates,
      setCurrentDate,
      updateSelectedDate,
      deleteSelectedDate,
      updateSelectedDates,
    });
  }

  return (
    <Root className={className}>
      <Header>
        <FullDate className="text-line-clamp-1">
          {currentDate.format(DATE_FORMAT.FULL_MONTH_YEAR)}
        </FullDate>
        <MonthControl>
          <ArrowButton onClick={decreaseCurrentMonth} direction="left" />
          <ArrowButton onClick={increaseCurrentMonth} />
        </MonthControl>
      </Header>

      <div>
        {(selectedDates.from || selectedDates.to) && (
          <RangeDatesWrapper>
            <RangeDate
              isFrom
              date={selectedDates.from}
              onTextClick={handleDateFromTextClick}
              onDeleteClick={() => deleteSelectedDate('from')}
            />
            <RangeDate
              date={selectedDates.to}
              onTextClick={handleDateToTextClick}
              onDeleteClick={() => deleteSelectedDate('to')}
            />
          </RangeDatesWrapper>
        )}

        <Calendar daysInMonth={daysInMonth} onDateClick={handleDateClick} />
      </div>
    </Root>
  );
}

const Root = styled.section`
  max-width: 300px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 5px;
  margin: 0 0 30px;
`;

const FullDate = styled.p`
  font-size: 20px;
  font-weight: 500;
`;

const MonthControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RangeDatesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 0 0 10px;
`;

export default DateRangePicker;
