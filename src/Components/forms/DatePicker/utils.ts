import { Dispatch, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';
import TimeService, { TimeServiceDate } from 'Services/TimeService';
import { DayCell } from './components/Calendar/Calendar';
import {
  SelectedDates,
  SelectedDate,
  SelectedDateType,
  DefaultSelectedDates,
} from './DatePicker';

export function getInitialSelectedDates({ from, to }: DefaultSelectedDates) {
  const dateFrom = from ? TimeService.getDate(from) : null;
  const dateTo = to ? TimeService.getDate(to) : null;

  return {
    from: dateFrom?.isValid() ? dateFrom : null,
    to: dateTo?.isValid() ? dateTo : null,
  };
}

export function getDaysInMonth(date: Dayjs, selectedDates: SelectedDates) {
  const daysInCurrentMonth = date.daysInMonth();
  let days: DayCell[] = [...Array(daysInCurrentMonth)].map((_, index) => ({
    date: date.date(index + 1),
    isActive: true,
  }));

  addMarkOfDatesFromAndToInDays();
  setPrevMonthDays();
  setNextMonthDays();

  function addMarkOfDatesFromAndToInDays() {
    const isMonthSameSelectedDatesMonth = Boolean(
      selectedDates.from?.isSame(date, 'month') ||
        selectedDates.to?.isSame(date, 'month'),
    );

    if (isMonthSameSelectedDatesMonth) {
      days = days.map(day => ({
        ...day,
        isFrom: selectedDates.from?.isSame(day.date, 'date'),
        isTo: selectedDates.to?.isSame(day.date, 'date'),
      }));
    }
  }

  function setPrevMonthDays() {
    const weekDayOfStartOfMonth = date.startOf('month').weekday();
    const prevMonth = date.subtract(1, 'month');
    const daysInPrevMonth = prevMonth.daysInMonth();

    [...Array(weekDayOfStartOfMonth)].forEach((_, index) => {
      days.unshift({
        date: prevMonth.date(daysInPrevMonth - index),
      });
    });
  }

  function setNextMonthDays() {
    const weekDayOfEndOfMonth = date.endOf('month').weekday();
    const nexMonth = date.add(1, 'month');

    [...Array(6 - weekDayOfEndOfMonth)].forEach((_, index) => {
      days.push({
        date: nexMonth.date(index + 1),
      });
    });
  }

  return days;
}

interface HandleCalendarDateClickArgs {
  newDate: TimeServiceDate;
  currentDate: TimeServiceDate;
  selectedDates: SelectedDates;
  setCurrentDate: Dispatch<SetStateAction<TimeServiceDate>>;
  updateSelectedDate(type: SelectedDateType, newDate: SelectedDate): void;
  deleteSelectedDate(type: SelectedDateType): void;
  updateSelectedDates(newDates: SelectedDates): void;
}

export function handleCalendarDateClick({
  newDate,
  currentDate,
  selectedDates,
  setCurrentDate,
  updateSelectedDate,
  deleteSelectedDate,
  updateSelectedDates,
}: HandleCalendarDateClickArgs) {
  if (newDate.isSame(currentDate, 'month')) {
    toggleSelectedDate();
  } else {
    switchToOtherMonth();
  }

  function toggleSelectedDate() {
    if (selectedDates.from?.isSame(newDate, 'date')) {
      deleteSelectedDate('from');
    } else if (selectedDates.to?.isSame(newDate, 'date')) {
      deleteSelectedDate('to');
    } else if (selectedDates.from && selectedDates.to) {
      setCorrectUpdatedDate(selectedDates.from, selectedDates.to);
    } else if (selectedDates.from || selectedDates.to) {
      setCorrectNewDate();
    } else {
      updateSelectedDate('from', newDate);
    }

    function setCorrectUpdatedDate(dateFrom: Dayjs, dateTo: Dayjs) {
      const middleDateBetweenSelectedDates = dateFrom.add(
        dateTo.diff(dateFrom, 'millisecond') / 2,
        'millisecond',
      );
      const isDateBeforeMiddleDate = newDate.isBefore(
        middleDateBetweenSelectedDates,
        'date',
      );

      if (isDateBeforeMiddleDate) {
        updateSelectedDate('from', newDate);
      } else {
        updateSelectedDate('to', newDate);
      }
    }

    function setCorrectNewDate() {
      const isDateAfterDateTo = newDate.isAfter(selectedDates.to, 'date');
      const isDateBeforeDateFrom = newDate.isBefore(selectedDates.from, 'date');

      if (!selectedDates.to && isDateBeforeDateFrom) {
        updateSelectedDates({
          to: selectedDates.from,
          from: newDate,
        });
      } else if (!selectedDates.from && isDateAfterDateTo) {
        updateSelectedDates({
          to: newDate,
          from: selectedDates.to,
        });
      } else if (selectedDates.to) {
        updateSelectedDate('from', newDate);
      } else if (selectedDates.from) {
        updateSelectedDate('to', newDate);
      }
    }
  }

  function switchToOtherMonth() {
    if (newDate.isBefore(currentDate, 'month')) {
      setCurrentDate(currentDate.subtract(1, 'month'));
    } else if (newDate.isAfter(currentDate, 'month')) {
      setCurrentDate(currentDate.add(1, 'month'));
    }
  }
}
