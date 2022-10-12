import { Dispatch, SetStateAction } from 'react';
import { compose } from '@reduxjs/toolkit';
import TimeService, {
  TimeServiceDate,
  TimeServiceRawDate,
} from 'Services/TimeService';
import { DayCell } from './components/Calendar/Calendar';
import {
  ConditionalDatePickerProps,
  DatePickerProps,
  SelectedDate,
  SelectedDates,
  SelectedDateType,
} from './DatePicker.types';

type ConditionalDates = Pick<
  ConditionalDatePickerProps,
  'isRange' | 'defaultDate' | 'defaultDates'
>;

type GetInitialCurrentDateArgs = ConditionalDates &
  Pick<DatePickerProps, 'borderEndDate' | 'borderStartDate'>;

export function getInitialCurrentDate({
  isRange,
  defaultDate,
  defaultDates,
  borderEndDate,
  borderStartDate,
}: GetInitialCurrentDateArgs) {
  return compose(handleBorderDates, getCurrentDate)();

  function getCurrentDate() {
    function getCurrentDateString() {
      if (isRange && defaultDates) {
        return defaultDates.from || defaultDates.to;
      } else if (defaultDate) {
        return defaultDate;
      }
    }

    const currentDateString = getCurrentDateString() || undefined;
    return TimeService.getStartOfDate(currentDateString);
  }

  function handleBorderDates(currentDate: TimeServiceDate) {
    const isDateOutsideBorderDates = Boolean(
      borderStartDate &&
        borderEndDate &&
        !currentDate.isBetween(borderStartDate, borderEndDate),
    );

    if (
      isDateOutsideBorderDates ||
      (borderStartDate && currentDate.isBefore(borderStartDate))
    ) {
      return TimeService.getStartOfDate(borderStartDate);
    } else if (borderEndDate && currentDate.isAfter(borderEndDate)) {
      return TimeService.getStartOfDate(borderEndDate);
    }

    return currentDate;
  }
}

export function getInitialSelectedDates({
  isRange,
  defaultDate,
  defaultDates,
}: ConditionalDates): SelectedDates {
  const DEFAULT_SELECTED_DAYS = { from: null, to: null };
  const getNewDates = isRange ? getRangeDates : getPlainDate;

  return getNewDates() || DEFAULT_SELECTED_DAYS;

  function getRangeDates() {
    if (!defaultDates) return;

    const dateFrom = TimeService.getDate(defaultDates.from);
    const dateTo = TimeService.getDate(defaultDates.to);

    return {
      from: dateFrom.isValid() ? dateFrom : null,
      to: dateTo.isValid() ? dateTo : null,
    };
  }

  function getPlainDate() {
    if (!defaultDate) return;

    const dateFrom = TimeService.getDate(defaultDate);

    return {
      from: dateFrom.isValid() ? dateFrom : null,
      to: null,
    };
  }
}

interface GetDaysInMonthArgs {
  date: TimeServiceDate;
  markedDays?: TimeServiceRawDate[];
  selectedDates: SelectedDates;
  borderEndDate?: string;
  borderStartDate?: string;
}

export function getDaysInMonth({
  date,
  markedDays,
  selectedDates,
  borderEndDate,
  borderStartDate,
}: GetDaysInMonthArgs): DayCell[] {
  const initialDays = getInitialDays();

  return compose(
    setMarkedDays,
    setNextMonthDays,
    setPrevMonthDays,
    addMarkOfSpecificDays,
  )(initialDays);

  function getInitialDays() {
    const daysInCurrentMonth = date.daysInMonth();
    const initialDays = [...Array(daysInCurrentMonth)].map((_, index) => ({
      date: date.date(index + 1),
      isActive: true,
    }));

    return initialDays;
  }

  function addMarkOfSpecificDays(days: DayCell[]): DayCell[] {
    return days.map(day => {
      const isNow = TimeService.isDateSame(TimeService.getDate(), day.date);
      const isDisabled = Boolean(
        (borderStartDate && day.date.isBefore(borderStartDate, 'days')) ||
          (borderEndDate && day.date.isAfter(borderEndDate, 'days')),
      );

      return {
        ...day,
        isNow,
        isDisabled,
        ...getMarkOfFromAndTo(day),
      };
    });

    function getMarkOfFromAndTo(day: DayCell) {
      const isMonthSameSelectedDatesMonth = Boolean(
        selectedDates.from?.isSame(date, 'month') ||
          selectedDates.to?.isSame(date, 'month'),
      );

      if (!isMonthSameSelectedDatesMonth) return null;

      return {
        isFrom: selectedDates.from?.isSame(day.date, 'date'),
        isTo: selectedDates.to?.isSame(day.date, 'date'),
      };
    }
  }

  function setPrevMonthDays(days: DayCell[]): DayCell[] {
    const weekDayOfStartOfMonth = date.startOf('month').weekday();
    const prevMonth = date.subtract(1, 'month');
    const daysInPrevMonth = prevMonth.daysInMonth();

    const prevMonthDays = [...Array(weekDayOfStartOfMonth)].map((_, index) => ({
      date: prevMonth.date(daysInPrevMonth - index),
    }));

    return prevMonthDays.concat(days);
  }

  function setNextMonthDays(days: DayCell[]): DayCell[] {
    const weekDayOfEndOfMonth = date.endOf('month').weekday();
    const nexMonth = date.add(1, 'month');

    const nextMonthDays = [...Array(6 - weekDayOfEndOfMonth)].map(
      (_, index) => ({
        date: nexMonth.date(index + 1),
      }),
    );

    return days.concat(nextMonthDays);
  }

  function setMarkedDays(days: DayCell[]): DayCell[] {
    return days.map(day => {
      const isMarked =
        markedDays?.some(markedDay =>
          TimeService.isDateSame(day.date, markedDay),
        ) || false;

      return { ...day, isMarked };
    });
  }
}

interface HandleCalendarDateClickArgs {
  newDate: TimeServiceDate;
  isRange?: boolean;
  currentDate: TimeServiceDate;
  selectedDates: SelectedDates;
  setCurrentDate: Dispatch<SetStateAction<TimeServiceDate>>;
  updateSelectedDate(type: SelectedDateType, newDate: SelectedDate): void;
  deleteSelectedDate(type: SelectedDateType): void;
  updateSelectedDates(newDates: SelectedDates): void;
}

export function handleCalendarDateClick({
  newDate,
  isRange,
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
    const typeOfDateSimilarToNewDate = Object.keys(selectedDates).find(key => {
      const dateType = key as SelectedDateType;
      const iterableDate = selectedDates[dateType];

      return iterableDate?.isSame(newDate, 'date');
    }) as SelectedDateType | undefined;

    if (typeOfDateSimilarToNewDate) {
      deleteSelectedDate(typeOfDateSimilarToNewDate);
    } else if (isRange) {
      handleDateRange();
    } else {
      updateDateFromToNewDate();
    }

    function handleDateRange() {
      if (selectedDates.from && selectedDates.to) {
        setUpdatedDateRange(selectedDates.from, selectedDates.to);
      } else if (selectedDates.from || selectedDates.to) {
        setDateRangeBorder();
      } else {
        updateDateFromToNewDate();
      }

      function setUpdatedDateRange(
        dateFrom: TimeServiceDate,
        dateTo: TimeServiceDate,
      ) {
        const middleDateBetweenSelectedDates = dateFrom.add(
          dateTo.diff(dateFrom, 'millisecond') / 2,
          'millisecond',
        );
        const isDateBeforeMiddleDate = newDate.isBefore(
          middleDateBetweenSelectedDates,
          'date',
        );

        if (isDateBeforeMiddleDate) {
          updateDateFromToNewDate();
        } else {
          updateSelectedDate('to', newDate);
        }
      }

      function setDateRangeBorder() {
        const isDateAfterDateTo = newDate.isAfter(selectedDates.to, 'date');
        const isDateBeforeDateFrom = newDate.isBefore(
          selectedDates.from,
          'date',
        );

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
          updateDateFromToNewDate();
        } else if (selectedDates.from) {
          updateSelectedDate('to', newDate);
        }
      }
    }

    function updateDateFromToNewDate() {
      updateSelectedDate('from', newDate);
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
