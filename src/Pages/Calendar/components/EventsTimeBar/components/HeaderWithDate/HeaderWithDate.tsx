import styled from 'styled-components/macro';
import { ArrowButton } from 'Components/buttons';
import { SimpleCalendarIcon } from 'Components/svg';
import { HiddenTitle } from 'Components/text';
import { useAppDispatch, useAppSelector } from 'Hooks';
import TimeService, { TimeServiceDate } from 'Services/TimeService';
import {
  selectFilterDateRange,
  selectHasBothDateRange,
} from 'Store/features/eventsFilter/eventsFilter.selectors';
import {
  showNextActiveDate,
  showPrevActiveDate,
} from 'Store/features/eventsFilter/eventsFilter.slice';
import { DATE_FORMAT } from 'Utils/constants/date';
import { EmptyBlock } from './components';

interface HeaderWithDateProps {
  activeDate?: TimeServiceDate;
}

const { SHORT_MONTH_DAY_YEAR, YEAR_MONTH_DAY } = DATE_FORMAT;

function HeaderWithDate({ activeDate }: HeaderWithDateProps) {
  const dispatch = useAppDispatch();

  const dateRange = useAppSelector(selectFilterDateRange);
  const hasBothDateRange = useAppSelector(selectHasBothDateRange);

  const isLeftButtonDisabled = Boolean(
    activeDate && TimeService.isDateSame(activeDate, dateRange.from),
  );
  const isRightButtonDisabled = Boolean(
    activeDate && TimeService.isDateSame(activeDate, dateRange.to),
  );

  return (
    <Root $hasBothDateRange={hasBothDateRange}>
      <HiddenTitle level={2}>Events Time Bar</HiddenTitle>

      {activeDate ? (
        <DateWrapper>
          <CalendarIcon />
          <DateText dateTime={activeDate.format(YEAR_MONTH_DAY)}>
            {activeDate.format(SHORT_MONTH_DAY_YEAR)}
          </DateText>
        </DateWrapper>
      ) : (
        <EmptyWrapper>
          <EmptyBlock />
        </EmptyWrapper>
      )}

      {hasBothDateRange && (
        <ContolButtonsWrapper>
          <ArrowButtonStylized
            title="Show previous date"
            onClick={() => dispatch(showPrevActiveDate())}
            disabled={isLeftButtonDisabled}
            direction="left"
          />
          <ArrowButtonStylized
            title="Show next date"
            onClick={() => dispatch(showNextActiveDate())}
            disabled={isRightButtonDisabled}
          />
        </ContolButtonsWrapper>
      )}
    </Root>
  );
}

const Root = styled.header<{ $hasBothDateRange: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  min-height: 60px;
  background: var(--violet);

  ${({ $hasBothDateRange }) =>
    $hasBothDateRange &&
    `
  &::before {
    content: '';
    width: 61px;
  }
  `}
`;

const TransparentWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 3px 10px;
  min-height: 30px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.22);
`;

const DateWrapper = styled(TransparentWrapper)`
  margin: 0 auto;
`;

const CalendarIcon = styled(SimpleCalendarIcon)`
  margin: 0 6px 0 0;
  width: 18px;
  fill: white;
`;

const DateText = styled.time`
  font-weight: 400;
  font-size: 16px;
  color: white;
`;

const EmptyWrapper = styled(TransparentWrapper)`
  margin: 0 auto;
  padding: 3px 10px 3px 0;
`;

const ContolButtonsWrapper = styled(TransparentWrapper)`
  width: 61px;
  gap: 0 3px;
  padding-right: 5px;
  padding-left: 5px;
`;

const ArrowButtonStylized = styled(ArrowButton)`
  width: 24px;
  height: auto;
  background: 0;
  padding: 0;
`;

export default HeaderWithDate;
