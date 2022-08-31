import styled from 'styled-components/macro';
import { HiddenTitle } from 'Components/text';
import TimeService, { TimeServiceDate } from 'Services/TimeService';
import { DATE_FORMAT } from 'Utils/constants/date';

export interface DayCell {
  date: TimeServiceDate;
  isTo?: boolean;
  isNow?: boolean;
  isFrom?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
}
interface CalendarProps {
  onDateClick(date: TimeServiceDate): void;
  daysInMonth: DayCell[];
}
type DayButtonProps = StyledProps<Omit<DayCell, 'date'>>;

const { SHORT_DAY, YEAR_MONTH_DAY } = DATE_FORMAT;
const weekdayNames = TimeService.shortWeekdayNames;

function Calendar({ onDateClick, daysInMonth }: CalendarProps) {
  return (
    <Root>
      <HiddenTitle level={3}>Calendar</HiddenTitle>

      <HeaderTable>
        {weekdayNames.map(weekDay => (
          <HeaderCell key={weekDay}>{weekDay}</HeaderCell>
        ))}
      </HeaderTable>

      <Table as="menu">
        {daysInMonth.map(
          ({ date, isActive, isFrom, isTo, isDisabled, isNow }, index) => (
            <Cell key={index}>
              <DayButton
                type="button"
                $isTo={isTo}
                $isNow={isNow}
                $isFrom={isFrom}
                onClick={() => onDateClick(date)}
                disabled={isDisabled}
                $isActive={isActive}
                $isDisabled={isDisabled}>
                <time dateTime={date.format(YEAR_MONTH_DAY)}>
                  {date.format(SHORT_DAY)}
                </time>
              </DayButton>
            </Cell>
          ),
        )}
      </Table>
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 15px;
  background: var(--red5);
  border-radius: 10px;
  user-select: none;
  overflow: auto;
`;

const Table = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
  justify-content: center;
  grid-gap: 15px 10px;
`;

const HeaderTable = styled(Table)`
  margin: 0 0 10px;
`;

const Cell = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
`;

const HeaderCell = styled(Cell)`
  font-size: 12px;
  color: var(--gray4);
  text-transform: uppercase;
`;

const DayButton = styled.button<DayButtonProps>`
  width: 100%;
  height: 100%;
  color: var(
    ${({ $isActive, $isTo, $isFrom, $isDisabled }) => {
      if ($isDisabled) {
        return '--gray6';
      } else if ($isFrom || $isTo) {
        return '--white';
      } else if ($isActive) {
        return '--black2';
      } else {
        return '--gray4';
      }
    }}
  );
  border: 1px solid
    var(
      ${({ $isNow, $isTo, $isFrom, $isActive }) => {
        if ($isNow && $isActive && !$isTo && !$isFrom) {
          return '--red2';
        }
        return '--transparent';
      }}
    );
  border-radius: 50%;
  background: var(
    ${({ $isFrom, $isTo }) => {
      if ($isFrom) {
        return '--red3';
      } else if ($isTo) {
        return '--violet';
      }

      return '--transparent';
    }}
  );
  transition: 0.2s ease;

  &:hover {
    ${({ $isFrom, $isTo, $isDisabled }) =>
      !$isFrom &&
      !$isTo &&
      !$isDisabled &&
      `
      background: var(--violet2);
      border-color: var(--violet);
      `}
  }
`;

export default Calendar;
