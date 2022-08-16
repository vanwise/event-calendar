import { TimeServiceDate } from 'Services/TimeService';

export type SelectedDate = Nullable<TimeServiceDate>;
export interface SelectedDates {
  from: SelectedDate;
  to: SelectedDate;
}
export type DefaultSelectedDates = {
  [key in SelectedDateType]: Nullable<string>;
};
export type SelectedDateType = keyof SelectedDates;
export interface DateRangePickerProps extends WithClassName {
  defaultSelectedDates: DefaultSelectedDates;
  onSelectedDatesChange(dates: DefaultSelectedDates): void;
}
