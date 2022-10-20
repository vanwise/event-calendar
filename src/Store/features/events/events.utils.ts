import { HOUR_HEIGHT_IN_PX } from 'Pages/Calendar/components/EventsTimeBar/components/HoursList/HoursList';
import TimeService from 'Services/TimeService';
import { Event } from 'Types/api';
import { DATE_FORMAT, MINUTES_IN_HOUR } from 'Utils/constants/date';

const ONE_MINUTE_IN_PX = HOUR_HEIGHT_IN_PX / MINUTES_IN_HOUR;
const { HOUR_MINUTES, SHORT_MONTH_DAY_HOURS_MINUTES } = DATE_FORMAT;

interface EventGeometry {
  topPosition: number;
  eventHeight: number;
}
export interface EventTimeProps {
  duration: string;
  startTime: string;
  geometryByTime: EventGeometry;
}

export function getEventTimeProps(
  { startDateISO, endDateISO }: Event,
  activeDate: string,
): EventTimeProps {
  const startDate = TimeService.getDate(startDateISO);
  const endDate = TimeService.getDate(endDateISO);

  const isStartDateBeforeActiveDate = startDate.isBefore(activeDate, 'date');
  const startTimeFormat = isStartDateBeforeActiveDate
    ? SHORT_MONTH_DAY_HOURS_MINUTES
    : HOUR_MINUTES;

  const { duration: eventDuration, durationString: duration } =
    TimeService.getDurations(startDate, endDate);

  function getEventGeometry() {
    const startDateDuration = TimeService.getDate.duration({
      hours: startDate.hour(),
      minutes: startDate.minute(),
    });

    function getCorrectDuration() {
      const fullDayDuration = TimeService.getDate.duration({ days: 1 });
      const isEndDateAfterActiveDate = endDate.isAfter(activeDate, 'date');

      if (isStartDateBeforeActiveDate && isEndDateAfterActiveDate) {
        return fullDayDuration;
      } else if (isEndDateAfterActiveDate) {
        return fullDayDuration.subtract(startDateDuration);
      } else if (isStartDateBeforeActiveDate) {
        return TimeService.getDate.duration({
          hours: endDate.hour(),
          minutes: endDate.minute(),
        });
      }

      return eventDuration;
    }

    const topPosition = isStartDateBeforeActiveDate
      ? 0
      : startDateDuration.asMinutes() * ONE_MINUTE_IN_PX;
    const eventHeight = getCorrectDuration().asMinutes() * ONE_MINUTE_IN_PX;

    return { topPosition, eventHeight };
  }

  return {
    duration,
    startTime: startDate.format(startTimeFormat),
    geometryByTime: getEventGeometry(),
  };
}

export interface EventData {
  event: Event;
  timeProps: EventTimeProps;
}
type GroupedEventData = EventData[][];
type GroupedEventAcc = EventData | GroupedEventData;

export function getGroupedEvents(
  events: Event[],
  activeDate: Nullable<string>,
) {
  if (!activeDate) {
    return [];
  }

  function setEventToGroup(
    eventGroup: GroupedEventData,
    event: Event,
    eventData: EventData,
  ) {
    const firstEvent = eventGroup[0]?.[0];
    if (!firstEvent) return;

    const topPositionOfFirstEvent =
      firstEvent.timeProps.geometryByTime.topPosition;
    const currentColumnIndex = eventGroup.findIndex(columnEvents => {
      const lastEventInColumn = columnEvents.at(-1);

      return (
        lastEventInColumn &&
        lastEventInColumn.event.endDateISO <= event.startDateISO
      );
    });

    function setEventToExistColumn() {
      const currentColumnEvents = eventGroup[currentColumnIndex];
      const sizeOfAllEventsInColumn = currentColumnEvents.reduce(
        (acc, { timeProps: { geometryByTime } }) =>
          acc + geometryByTime.topPosition + geometryByTime.eventHeight,
        0,
      );

      eventData.timeProps.geometryByTime.topPosition -=
        topPositionOfFirstEvent + sizeOfAllEventsInColumn;
      currentColumnEvents.push(eventData);
    }

    function setEventToNewColumn() {
      eventData.timeProps.geometryByTime.topPosition -= topPositionOfFirstEvent;
      eventGroup.push([eventData]);
    }

    if (currentColumnIndex >= 0) {
      setEventToExistColumn();
    } else {
      setEventToNewColumn();
    }
  }

  const groupedEvents = events.reduce((acc: GroupedEventAcc[], event) => {
    const lastAccElement = acc.at(-1);
    const eventData = {
      event,
      timeProps: getEventTimeProps(event, activeDate),
    };

    function isEventOverlap({ startDateISO, endDateISO }: Event) {
      return TimeService.isOverlapped(
        { from: startDateISO, to: endDateISO },
        { from: event.startDateISO, to: event.endDateISO },
      );
    }

    if (lastAccElement) {
      if (Array.isArray(lastAccElement)) {
        const isEventsOverlapped = lastAccElement
          .flat()
          .some(({ event: groupedEvent }) => isEventOverlap(groupedEvent));

        if (isEventsOverlapped) {
          setEventToGroup(lastAccElement, event, eventData);
          return acc;
        }
      } else {
        if (isEventOverlap(lastAccElement.event)) {
          eventData.timeProps.geometryByTime.topPosition -=
            lastAccElement.timeProps.geometryByTime.topPosition;
          acc.splice(-1, 1, [[lastAccElement], [eventData]]);

          return acc;
        }
      }
    }

    acc.push(eventData);
    return acc;
  }, []);

  return groupedEvents;
}
