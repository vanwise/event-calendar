import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { TimeService } from 'Services';
import { EventData } from 'Store/features/events/events.utils';
import { sleep } from 'Utils/helpers/common';
import { renderWithStore, userEventWithAct } from 'Utils/helpers/tests';
import EventDetails from './EventDetails';

jest.mock('Store/features/tags/tags.selectors', () => ({
  __esModule: true,
  ...jest.requireActual('Store/features/tags/tags.selectors'),
  selectTagById() {
    return { id: 'test', title: 'Test tag' };
  },
}));

const startOfDateNow = TimeService.getStartOfDate();
const eventData: EventData = {
  event: {
    id: 'test',
    title: 'Test title',
    description: 'Test description',
    tagId: 'test',
    startDateISO: startOfDateNow.toISOString(),
    endDateISO: startOfDateNow.add(1, 'hour').toISOString(),
    notificationId: null,
    createdAt: 'test',
    updatedAt: 'test',
  },
  timeProps: {
    duration: '1 h',
    startTime: 'Test start time',
    geometryByTime: {
      topPosition: 0,
      eventHeight: 300,
    },
  },
};
const onClick = jest.fn();

function setup(props = {}) {
  const renderResult = renderWithStore(
    <EventDetails
      onClick={onClick}
      isActive={false}
      eventData={eventData}
      {...props}
    />,
  );
  return renderResult;
}

afterEach(jest.clearAllMocks);

describe('Event Groups', () => {
  it('should be contain content', () => {
    setup();

    screen.getByRole('heading', { level: 3, name: 'Test title' });
    screen.getByText('1 h');
    screen.getByText('Test start time');
    screen.getByText('Test description');
    screen.getByText('Test tag');
  });

  it('should be clickable', async () => {
    setup();

    const wrapper = screen.getByRole('section');
    await userEventWithAct.click(wrapper);
    expect(onClick).toBeCalledTimes(1);
  });

  it('should be showing small title instead normal if event time duration less then 30 min or equal', async () => {
    const [{ rerender }] = setup();

    expect(screen.queryByTestId('small-title')).toBeNull();
    screen.getByRole('heading', { level: 3, name: 'Test title' });

    const title = screen.getByTestId('title');
    const titleWrapper = title.parentElement;

    if (titleWrapper) {
      jest
        .spyOn(titleWrapper, 'getBoundingClientRect')
        .mockImplementation(() => {
          return { top: 20, height: 10 } as DOMRect;
        });
    }

    const newEventData = {
      event: {
        ...eventData.event,
        endDateISO: startOfDateNow.add(30, 'minutes').toISOString(),
      },
      timeProps: {
        ...eventData.timeProps,
        duration: '30 min',
      },
    };
    rerender(
      <EventDetails
        onClick={onClick}
        isActive={false}
        eventData={newEventData}
      />,
    );
    await act(async () => await sleep(200));

    screen.getByTestId('small-title');
    expect(screen.queryByTestId('title')).toBeNull();
  });
});
