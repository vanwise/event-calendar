import { TimeServiceDate, TimeServiceRawDate } from 'Services/TimeService';

export type SelectedDate = Nullable<TimeServiceDate>;
export interface SelectedDates {
  from: SelectedDate;
  to: SelectedDate;
}
export type SelectedDateType = keyof SelectedDates;
export type DefaultSelectedDate = Nullable<string>;

export type DefaultSelectedDates = Record<
  SelectedDateType,
  DefaultSelectedDate
>;

export type ConditionalDatePickerProps =
  | {
      isRange: true;
      defaultDate?: never;
      defaultDates?: DefaultSelectedDates;
      onDateChange(dates: DefaultSelectedDates): void;
    }
  | {
      isRange?: false;
      defaultDate?: DefaultSelectedDate;
      defaultDates?: never;
      onDateChange(date: DefaultSelectedDate): void;
    };

export type DatePickerProps = WithClassName &
  ConditionalDatePickerProps & {
    borderEndDate?: string;
    borderStartDate?: string;
    isSelectedDaysHidden?: boolean;
    markedDays?: TimeServiceRawDate[];
  };
