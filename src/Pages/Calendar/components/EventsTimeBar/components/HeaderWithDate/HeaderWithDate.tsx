import styled from 'styled-components/macro';
import { BlurredLayout } from 'Components/layouts';
import { SimpleCalendarIcon } from 'Components/svg';
import { HiddenTitle } from 'Components/text';
import { useAppSelector } from 'Hooks';
import { selectHasBothDateRange } from 'Store/features/eventsFilter/eventsFilter.selectors';
import { DATE_FORMAT } from 'Utils/constants/date';
import { EmptyBlock } from './components';
import NavigationButtons, {
  NavigationButtonsProps,
} from './components/NavigationButtons/NavigationButtons';

type HeaderWithDateProps = NavigationButtonsProps;

const { SHORT_MONTH_DAY_YEAR, YEAR_MONTH_DAY } = DATE_FORMAT;

function HeaderWithDate({
  activeDate,
  onNavigationButtonClick,
}: HeaderWithDateProps) {
  const hasBothDateRange = useAppSelector(selectHasBothDateRange);

  return (
    <Root $hasBothDateRange={hasBothDateRange}>
      <HiddenTitle level={3}>Events Time Bar</HiddenTitle>

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
        <NavigationButtons
          activeDate={activeDate}
          onNavigationButtonClick={onNavigationButtonClick}
        />
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

const DateWrapper = styled(BlurredLayout)`
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

const EmptyWrapper = styled(BlurredLayout)`
  margin: 0 auto;
  padding: 3px 10px 3px 0;
`;

export default HeaderWithDate;
