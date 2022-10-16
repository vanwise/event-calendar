import { useEffect, useLayoutEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'Hooks';
import { TimeService } from 'Services';
import {
  selectEventsLastScrollValue,
  selectFilterActiveDate,
} from 'Store/features/eventsFilter/eventsFilter.selectors';
import { changeEventsLastScrollValue } from 'Store/features/eventsFilter/eventsFilter.slice';

export function useInitialTimeBarScroll() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const eventsLastScrollValue = useAppSelector(selectEventsLastScrollValue);

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider && eventsLastScrollValue) {
      slider.scrollTo({ top: eventsLastScrollValue });
    }
  }, [eventsLastScrollValue]);

  useLayoutEffect(() => {
    return () => {
      const newScrollValue = sliderRef.current?.scrollTop || null;

      if (eventsLastScrollValue !== newScrollValue) {
        dispatch(changeEventsLastScrollValue(newScrollValue));
      }
    };
  }, [dispatch, eventsLastScrollValue]);

  return { sliderRef };
}

export function useActiveDate() {
  const filterActiveDate = useAppSelector(selectFilterActiveDate);

  const activeDate = filterActiveDate
    ? TimeService.getDate(filterActiveDate)
    : undefined;

  return activeDate;
}
