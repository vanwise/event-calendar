import { useMemo, useState } from 'react';
import { Dayjs } from 'dayjs';
import styled from 'styled-components/macro';
import { ArrowButton } from 'Components/buttons';
import { TimeService } from 'Services';
import { DATE_FORMAT } from 'Utils/constants/date';
import { Calendar, RangeDate } from './components';
import {
  getDaysInMonth,
  getInitialSelectedDates,
  handleCalendarDateClick,
} from './utils';

export type SelectedDate = Nullable<Dayjs>;
export type SelectedDates = Partial<{
  from: SelectedDate;
  to: SelectedDate;
}>;
export type SelectedDateType = keyof SelectedDates;
export type DefaultSelectedDates = Partial<{
  [key in SelectedDateType]: Nullable<string>;
}>;
interface DatePickerProps {
  defaultSelectedDates: DefaultSelectedDates;
  onSelectedDatesChange(dates: DefaultSelectedDates): void;
}

function DatePicker({
  defaultSelectedDates,
  onSelectedDatesChange,
}: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState(TimeService.getDate);
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

  function updateSelectedDates(newDates: SelectedDates) {
    setSelectedDates(newDates);
    onSelectedDatesChange({
      from: newDates.from?.toISOString(),
      to: newDates.to?.toISOString(),
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

  function handleDateClick(newDate: Dayjs) {
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
    <Root>
      <Header>
        <FullDate className="text-line-clamp-1">
          {currentDate.format(DATE_FORMAT.FULL_MONTH_YEAR)}
        </FullDate>
        <MonthControl>
          <ArrowButton onClick={decreaseCurrentMonth} direction="left" />
          <ArrowButton onClick={increaseCurrentMonth} />
        </MonthControl>
      </Header>

      <Wrapper>
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
      </Wrapper>
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
`;

const Wrapper = styled.div``;

const RangeDatesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 0 0 10px;
`;

export default DatePicker;
