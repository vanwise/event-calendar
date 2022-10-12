import { useMemo, useState } from 'react';
import styled from 'styled-components/macro';
import { ArrowButton } from 'Components/buttons';
import { HiddenTitle } from 'Components/text';
import { TimeServiceDate } from 'Services/TimeService';
import { DATE_FORMAT } from 'Utils/constants/date';
import { Calendar, RangeDate } from './components';
import {
  DatePickerProps,
  SelectedDate,
  SelectedDates,
  SelectedDateType,
} from './DatePicker.types';
import {
  getDaysInMonth,
  getInitialCurrentDate,
  getInitialSelectedDates,
  handleCalendarDateClick,
} from './DatePicker.utils';

const { YEAR_MONTH_DAY, FULL_MONTH_YEAR } = DATE_FORMAT;

function DatePicker({
  isRange,
  className,
  markedDays,
  defaultDate,
  defaultDates,
  onDateChange,
  borderEndDate,
  borderStartDate,
  isSelectedDaysHidden,
}: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState(() =>
    getInitialCurrentDate({
      isRange,
      defaultDate,
      defaultDates,
      borderEndDate,
      borderStartDate,
    }),
  );
  const [selectedDates, setSelectedDates] = useState<SelectedDates>(() =>
    getInitialSelectedDates({
      isRange,
      defaultDate,
      defaultDates,
    }),
  );

  const daysInMonth = useMemo(
    () =>
      getDaysInMonth({
        date: currentDate,
        markedDays,
        selectedDates,
        borderEndDate,
        borderStartDate,
      }),
    [currentDate, markedDays, selectedDates, borderEndDate, borderStartDate],
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
    const dateFrom = newDates.from?.toISOString() || null;

    setSelectedDates(newDates);

    if (isRange) {
      onDateChange({
        from: dateFrom,
        to: newDates.to?.toISOString() || null,
      });
    } else {
      onDateChange(dateFrom);
    }
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
      isRange,
      currentDate,
      selectedDates,
      setCurrentDate,
      updateSelectedDate,
      deleteSelectedDate,
      updateSelectedDates,
    });
  }

  function isPrevDateButtonDisabled() {
    if (!borderStartDate) return false;
    return currentDate.subtract(1, 'month').isBefore(borderStartDate, 'month');
  }

  function isNextDateButtonDisabled() {
    if (!borderEndDate) return false;
    return currentDate.add(1, 'month').isAfter(borderEndDate, 'month');
  }

  const isSelectedDaysVisible =
    !isSelectedDaysHidden && (selectedDates.from || selectedDates.to);

  return (
    <Root className={className}>
      <Header>
        <HiddenTitle level={2}>Date Picker</HiddenTitle>
        <FullDate dateTime={currentDate.format(YEAR_MONTH_DAY)}>
          {currentDate.format(FULL_MONTH_YEAR)}
        </FullDate>

        <MonthControl>
          <ArrowButton
            title="Show previous date"
            onClick={decreaseCurrentMonth}
            disabled={isPrevDateButtonDisabled()}
            direction="left"
          />
          <ArrowButton
            title="Show next date"
            onClick={increaseCurrentMonth}
            disabled={isNextDateButtonDisabled()}
          />
        </MonthControl>
      </Header>

      <div>
        {isSelectedDaysVisible && (
          <RangeDatesWrapper>
            <HiddenTitle level={3}>Calendar Range Dates</HiddenTitle>
            <RangeDate
              isFrom
              date={selectedDates.from}
              isRange={isRange}
              onTextClick={handleDateFromTextClick}
              onDeleteClick={() => deleteSelectedDate('from')}
            />
            <RangeDate
              date={selectedDates.to}
              isRange={isRange}
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

const Root = styled.article`
  max-width: 300px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 5px;
  margin: 0 0 30px;
`;

const FullDate = styled.time`
  font-size: 20px;
  font-weight: 500;
`;

const MonthControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RangeDatesWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 0 0 10px;
`;

export default DatePicker;
