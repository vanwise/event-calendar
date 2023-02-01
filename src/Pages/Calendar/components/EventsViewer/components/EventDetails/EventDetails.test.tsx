import { screen } from '@testing-library/react';
import { ModalsContainer } from 'Hooks/modals/useModal/components';
import { TimeService } from 'Services';
import { DATE_FORMAT } from 'Utils/constants/date';
import { renderWithStore, userEventWithAct } from 'Utils/helpers/tests';
import EventDetails from './EventDetails';

const { HOUR_MINUTES, SHORT_WEEK_MONTH_DAY_YEAR } = DATE_FORMAT;
const startOfDateNow = TimeService.getStartOfDate();
const mockStartDate = startOfDateNow.add(1, 'day');
const mockEndDate = mockStartDate.add(1, 'day');

const mockEvent = {
  id: 'test',
  title: 'Test title',
  description: 'Test description',
  tagId: 'test',
  startDateISO: mockStartDate.toISOString(),
  endDateISO: mockEndDate.toISOString(),
  notificationId: 'test',
  createdAt: 'test',
  updatedAt: 'test',
};
const mockTag = { id: 'test', title: 'Test tag' };

jest.mock('Store/features/events/events.selectors', () => ({
  ...jest.requireActual('Store/features/events/events.selectors'),
  selectEventById() {
    return mockEvent;
  },
}));
jest.mock('Store/features/tags/tags.selectors', () => ({
  ...jest.requireActual('Store/features/tags/tags.selectors'),
  selectTagById() {
    return mockTag;
  },
}));
jest.mock('Hooks', () => ({
  ...jest.requireActual('Hooks'),
  useAppDispatch() {
    return jest.fn();
  },
}));

const preloadedState = {
  eventsFilter: {
    activeEventId: 'test',
  },
};

function setup(props = {}) {
  const renderResult = renderWithStore(
    <>
      <EventDetails {...props} />
      <ModalsContainer />
    </>,
    preloadedState,
  );
  return renderResult;
}

describe('Event Details', () => {
  it('should be contain content', () => {
    setup();

    const hoursRangeText = `${mockStartDate.format(
      HOUR_MINUTES,
    )} - ${mockEndDate.format(HOUR_MINUTES)}`;
    const datesRangeText = `${mockStartDate.format(
      SHORT_WEEK_MONTH_DAY_YEAR,
    )} - ${mockEndDate.format(SHORT_WEEK_MONTH_DAY_YEAR)}`;
    const { durationString } = TimeService.getDurations(
      mockStartDate,
      mockEndDate,
    );

    screen.getByText('Sheduled');
    screen.getByRole('heading', { level: 3, name: mockEvent.title });
    screen.getByText(mockTag.title);
    screen.getByText(hoursRangeText);
    screen.getByText(datesRangeText);
    screen.getByText(durationString);
    screen.getByTitle('With notification');
    screen.getByText(mockEvent.description);
  });

  it('should be possible showing to editing modal', async () => {
    setup();

    const editButton = screen.getByRole('button', { name: 'Edit event' });
    await userEventWithAct.click(editButton);
    screen.getByRole('dialog');
  });
});
