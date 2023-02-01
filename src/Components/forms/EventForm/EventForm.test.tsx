import { act, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import TimeService, { TimeServiceDate } from 'Services/TimeService';
import { renderWithStore, userEventWithAct } from 'Utils/helpers/tests';
import EventForm from './EventForm';
import { DefaultEventValues } from './EventForm.utils';

const onSubmit = jest.fn();
const testTags = [
  {
    id: 'cac31b48-6ad9-49bc-9bc5-610f631022f5',
    title: 'TestTag',
  },
];

jest.mock('Store/features/tags/tags.selectors', () => ({
  __esModule: true,
  ...jest.requireActual('Store/features/tags/tags.selectors'),
  selectAllTags() {
    return testTags;
  },
}));
jest.mock('Store/features/users/users.slice', () => ({
  __esModule: true,
  ...jest.requireActual('Store/features/users/users.slice'),
  useGetUserQuery() {
    return {
      data: { notificationSubscriptions: [''] },
    };
  },
}));

function setup(props = {}) {
  const renderResult = renderWithStore(
    <EventForm onSubmit={onSubmit} {...props} />,
  );
  const submitButton = screen.getByRole('button', { name: 'Submit' });

  return [submitButton, renderResult] as const;
}

afterEach(jest.clearAllMocks);

describe('Event Form', () => {
  let startDate: TimeServiceDate;
  let endDate: TimeServiceDate;

  beforeEach(() => {
    const startDateNow = TimeService.getStartOfDate();

    startDate = startDateNow.add(1, 'day');
    endDate = startDate.add(1, 'day');
  });

  it('should be submitted after text input', async () => {
    const [submitButton] = setup();

    const titleInput = screen.getByRole('textbox', { name: 'Title' });
    const startDateSelect = screen.getByLabelText('Start Date');
    const endDateSelect = screen.getByLabelText('End Date');
    const tagSelect = screen.getByLabelText('Tag');
    const startTimeSelect = screen.getByLabelText('Start Time');
    const endTimeSelect = screen.getByLabelText('End Time');
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Description',
    });

    await userEventWithAct.type(titleInput, 'Test title');
    await userEventWithAct.type(descriptionInput, 'Test description');

    act(() => selectEvent.openMenu(startDateSelect));
    const startDateButton = screen.getByRole('button', {
      name: String(startDate.date()),
      description: 'Active month button',
    });
    await userEventWithAct.click(startDateButton);

    act(() => selectEvent.openMenu(endDateSelect));
    const endDateButton = screen.getByRole('button', {
      name: String(endDate.date()),
      description: 'Active month button',
    });
    await userEventWithAct.click(endDateButton);

    act(() => selectEvent.openMenu(startTimeSelect));
    const startTimeButton = screen.getByText('12:00 AM');
    await userEventWithAct.click(startTimeButton);

    act(() => selectEvent.openMenu(endTimeSelect));
    const endTimeButton = screen.getByText('12:30 AM');
    await userEventWithAct.click(endTimeButton);

    const reminderCheckbox = screen.getByRole('checkbox', {
      name: 'Reminder on event starts?',
    });
    await userEventWithAct.click(reminderCheckbox);

    act(() => selectEvent.openMenu(tagSelect));
    await act(async () => await selectEvent.select(tagSelect, 'TestTag'));

    const resultFormValues = {
      title: 'Test title',
      description: 'Test description',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      startTime: '0:0',
      endTime: '0:30',
      hasReminder: true,
      tagId: testTags[0].id,
    };

    await userEventWithAct.click(submitButton);
    expect(onSubmit.mock.lastCall[0]).toStrictEqual(resultFormValues);
  });

  it('should be submitted only with changed default event', async () => {
    const commonValues = {
      title: 'Test title',
      description: 'Test description',
      tagId: testTags[0].id,
    };
    const defaultEvent: DefaultEventValues = {
      ...commonValues,
      startDateISO: startDate.toISOString(),
      endDateISO: endDate.toISOString(),
      notificationId: 'test',
    };
    const outputFormValues = {
      ...commonValues,
      startDate: startDate.startOf('date').toISOString(),
      endDate: endDate.startOf('date').toISOString(),
      startTime: `${startDate.hour()}:${startDate.minute()}`,
      endTime: `${endDate.hour()}:${endDate.minute()}`,
      hasReminder: false,
    };

    const [submitButton] = setup({ defaultEvent });

    await userEventWithAct.click(submitButton);
    expect(onSubmit).not.toBeCalled();

    const reminderCheckbox = screen.getByRole('checkbox', {
      name: 'Reminder on event starts?',
    });
    await userEventWithAct.click(reminderCheckbox);

    await userEventWithAct.click(submitButton);
    expect(onSubmit.mock.lastCall[0]).toStrictEqual(outputFormValues);
  });

  it('should be not submitted with loading status', async () => {
    const [submitButton] = setup({ isLoading: true });

    await userEventWithAct.click(submitButton);
    expect(onSubmit).not.toBeCalled();
  });
});
