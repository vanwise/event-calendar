import { screen } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { TimeService } from 'Services';
import { TimeServiceDate } from 'Services/TimeService';
import { changeDateRange } from 'Store/features/eventsFilter/eventsFilter.slice';
import { DATE_FORMAT } from 'Utils/constants/date';
import { renderWithStore, userEventWithAct } from 'Utils/helpers/tests';
import HeaderWithDate from './HeaderWithDate';

const onNavigationButtonClick = jest.fn();
const { SHORT_MONTH_DAY_YEAR } = DATE_FORMAT;

function setup(props = {}) {
  const preloadedState = {
    eventsFilter: {
      dateRange: { from: null, to: null },
    },
  };
  const renderResult = renderWithStore(
    <HeaderWithDate
      onNavigationButtonClick={onNavigationButtonClick}
      {...props}
    />,
    preloadedState,
  );

  return renderResult;
}

interface SetDateRangeToStoreArgs {
  store: Store;
  dateTo: TimeServiceDate;
  dateFrom: TimeServiceDate;
}

function setDateRangeToStore({
  store,
  dateTo,
  dateFrom,
}: SetDateRangeToStoreArgs) {
  const dateRange = {
    from: dateFrom.toISOString(),
    to: dateTo.toISOString(),
  };

  act(() => {
    store.dispatch(changeDateRange(dateRange));
  });
}

afterEach(jest.clearAllMocks);

describe('Header With Date', () => {
  let dateNow: TimeServiceDate;
  let dateFrom: TimeServiceDate;
  let dateTo: TimeServiceDate;

  beforeEach(() => {
    dateNow = TimeService.getDate();
    dateFrom = dateNow.subtract(1, 'day');
    dateTo = dateNow.add(1, 'day');
  });

  it('should be showing active date or empty block', () => {
    const [{ rerender }] = setup();

    expect(screen.queryByText(dateNow.format(SHORT_MONTH_DAY_YEAR))).toBeNull();
    screen.getByText('Choose date');

    rerender(
      <HeaderWithDate
        activeDate={dateNow}
        onNavigationButtonClick={onNavigationButtonClick}
      />,
    );
    screen.getByText(dateNow.format(SHORT_MONTH_DAY_YEAR));
    expect(screen.queryByText('Choose date')).toBeNull();
  });

  it('should be showing and possible for navigation buttons clicking', async () => {
    const [, store] = setup();

    expect(
      screen.queryByRole('button', { name: 'Show previous date' }),
    ).toBeNull();
    expect(screen.queryByRole('button', { name: 'Show next date' })).toBeNull();

    setDateRangeToStore({ store, dateTo, dateFrom });

    const prevDateButton = screen.getByRole('button', {
      name: 'Show previous date',
    });
    const nextDateButton = screen.getByRole('button', {
      name: 'Show next date',
    });

    await userEventWithAct.click(prevDateButton);
    expect(onNavigationButtonClick).toBeCalledTimes(1);

    await userEventWithAct.click(nextDateButton);
    expect(onNavigationButtonClick).toBeCalledTimes(2);
  });

  it('should be disabled navigation buttons if active date is border date', () => {
    const [{ rerender }, store] = setup({ activeDate: dateFrom });

    setDateRangeToStore({ store, dateTo, dateFrom });

    const prevDateButton = screen.getByRole('button', {
      name: 'Show previous date',
    });
    const nextDateButton = screen.getByRole('button', {
      name: 'Show next date',
    });

    expect(prevDateButton).toBeDisabled();
    expect(nextDateButton).not.toBeDisabled();

    rerender(
      <HeaderWithDate
        activeDate={dateTo}
        onNavigationButtonClick={onNavigationButtonClick}
      />,
    );

    expect(prevDateButton).not.toBeDisabled();
    expect(nextDateButton).toBeDisabled();
  });
});
