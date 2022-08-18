import { TimeService } from 'Services';
import { DATE_FORMAT } from 'Utils/constants/date';

export const HOUR_HEIGHT_IN_PX = 80;
export const HOUR_TEXT_WIDTH_IN_PX = 80;

export function getDayHours() {
  const startNowDay = TimeService.getStartOfNow();
  return [...Array(24)].map((_, index) =>
    startNowDay.hour(index).format(DATE_FORMAT.HOUR_MINUTES),
  );
}
