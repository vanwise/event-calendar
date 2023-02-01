import { DayCell } from './Calendar';

type GetCalendarDayButtonTitleArgs = Pick<
  DayCell,
  'isActive' | 'isFrom' | 'isTo'
>;

export function getCalendarDayButtonTitle({
  isTo,
  isFrom,
  isActive,
}: GetCalendarDayButtonTitleArgs) {
  if (isFrom) {
    return 'Button Date From';
  } else if (isTo) {
    return 'Button Date To';
  } else if (isActive) {
    return 'Active month button';
  }
}
