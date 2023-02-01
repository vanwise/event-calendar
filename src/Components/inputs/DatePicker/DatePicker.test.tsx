import { render, screen } from '@testing-library/react';
import { TimeService } from 'Services';
import { TimeServiceDate } from 'Services/TimeService';
import { DATE_FORMAT } from 'Utils/constants/date';
import { userEventWithAct } from 'Utils/helpers/tests';
import DatePicker from './DatePicker';

const { DAY_MONTH_YEAR, FULL_MONTH_YEAR } = DATE_FORMAT;
const onDateChange = jest.fn();

function setup(props = {}) {
  const renderResult = render(
    <DatePicker isRange onDateChange={onDateChange} {...props} />,
  );
  return renderResult;
}

afterEach(jest.clearAllMocks);

describe('Date Picker', () => {
  let dateNow: TimeServiceDate;

  beforeEach(() => (dateNow = TimeService.getDate()));

  it('should be possible select start and end dates and show selected range buttons', async () => {
    setup();

    const firstDayButton = screen.getByRole('button', {
      name: '1',
      description: 'Active month button',
    });
    const secondDayButton = screen.getByRole('button', {
      name: '2',
      description: 'Active month button',
    });

    await userEventWithAct.click(firstDayButton);
    expect(onDateChange).toBeCalledTimes(1);

    const firstDayInNowMonth = dateNow.date(1).format(DAY_MONTH_YEAR);
    screen.getByRole('button', { name: `From ${firstDayInNowMonth}` });
    screen.getByRole('button', {
      name: '1',
      description: 'Button Date From',
    });

    await userEventWithAct.click(secondDayButton);
    expect(onDateChange).toBeCalledTimes(2);

    const secondDayInNowMonth = dateNow.date(2).format(DAY_MONTH_YEAR);
    screen.getByRole('button', { name: `To ${secondDayInNowMonth}` });
    screen.getByRole('button', {
      name: '2',
      description: 'Button Date To',
    });
  });

  it('should be possible navigate to next and previous months', async () => {
    setup();

    const prevMonthButton = screen.getByRole('button', {
      name: 'Show previous date',
    });
    const nextMonthButton = screen.getByRole('button', {
      name: 'Show next date',
    });

    await userEventWithAct.click(prevMonthButton);
    const prevMonthDate = dateNow.subtract(1, 'month').format(FULL_MONTH_YEAR);
    screen.getByText(prevMonthDate);

    await userEventWithAct.click(nextMonthButton);
    const currentMonthDate = dateNow.format(FULL_MONTH_YEAR);
    screen.getByText(currentMonthDate);

    await userEventWithAct.click(nextMonthButton);
    const nextMonthDate = dateNow.add(1, 'month').format(FULL_MONTH_YEAR);
    screen.getByText(nextMonthDate);
  });

  it('should take default dates and change months by click of them', async () => {
    const dateFrom = dateNow.subtract(1, 'month');
    const dateTo = dateFrom.add(1, 'month');

    const defaultDates = {
      from: dateFrom.toISOString(),
      to: dateTo.toISOString(),
    };

    setup({ defaultDates });

    const formattedDateFrom = dateFrom.format(DAY_MONTH_YEAR);
    const buttonDateFrom = screen.getByRole('button', {
      name: `From ${formattedDateFrom}`,
    });

    await userEventWithAct.click(buttonDateFrom);
    const monthOfDateFrom = dateFrom.format(FULL_MONTH_YEAR);
    screen.getByText(monthOfDateFrom);
    screen.getByRole('button', {
      name: String(dateFrom.date()),
      description: 'Button Date From',
    });

    const formattedDateTo = dateTo.format(DAY_MONTH_YEAR);
    const buttonDateTo = screen.getByRole('button', {
      name: `To ${formattedDateTo}`,
    });

    await userEventWithAct.click(buttonDateTo);
    const monthOfDateTo = dateTo.format(FULL_MONTH_YEAR);
    screen.getByText(monthOfDateTo);
    screen.getByRole('button', {
      name: String(dateTo.date()),
      description: 'Button Date To',
    });
  });

  it('should be constrained months by border dates', async () => {
    const borderStartDate = dateNow.subtract(1, 'month');
    const borderEndDate = dateNow.add(2, 'month');

    setup({
      borderStartDate: borderStartDate.toISOString(),
      borderEndDate: borderEndDate.toISOString(),
    });

    const prevMonthButton = screen.getByRole('button', {
      name: 'Show previous date',
    });
    const nextMonthButton = screen.getByRole('button', {
      name: 'Show next date',
    });

    await userEventWithAct.dblClick(prevMonthButton);
    const prevMonthDate = borderStartDate.format(FULL_MONTH_YEAR);
    screen.getByText(prevMonthDate);

    for (let i = 0; i < 3; i++) {
      await userEventWithAct.tripleClick(nextMonthButton);
    }

    const nextMonthDate = borderEndDate.format(FULL_MONTH_YEAR);
    screen.getByText(nextMonthDate);
  });

  it('should be with hidden calendar range dates title', async () => {
    const titleSelectorProps = [
      'heading',
      { level: 3, name: 'Calendar Range Dates' },
    ] as const;
    const defaultDate = dateNow.toISOString();
    const { rerender } = setup({ isRange: false, defaultDate });

    expect(await screen.findByRole(...titleSelectorProps)).toBeInTheDocument();
    rerender(
      <DatePicker
        isSelectedDaysHidden
        defaultDate={defaultDate}
        onDateChange={onDateChange}
      />,
    );
    expect(screen.queryByRole(...titleSelectorProps)).toBeNull();
  });

  it('should be contain marked days', () => {
    const markedDays = [dateNow];
    const { rerender } = setup();

    expect(screen.queryByTestId('markedDay')).toBeNull();
    rerender(
      <DatePicker markedDays={markedDays} onDateChange={onDateChange} />,
    );
    screen.getByTestId('markedDay');
  });
});
