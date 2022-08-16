import styled from 'styled-components/macro';
import TimeService, { TimeServiceDate } from 'Services/TimeService';
import { DATE_FORMAT } from 'Utils/constants/date';

export interface DayCell {
  date: TimeServiceDate;
  isActive?: boolean;
  isFrom?: boolean;
  isTo?: boolean;
}
interface CalendarProps {
  onDateClick(date: TimeServiceDate): void;
  daysInMonth: DayCell[];
}
interface DayButtonProps {
  $isActive?: boolean;
  $isFrom?: boolean;
  $isTo?: boolean;
}

const weekdayNames = TimeService.shortWeekdayNames;

function Calendar({ onDateClick, daysInMonth }: CalendarProps) {
  return (
    <Root>
      <HeaderTable>
        {weekdayNames.map(weekDay => (
          <HeaderCell key={weekDay}>{weekDay}</HeaderCell>
        ))}
      </HeaderTable>

      <Table>
        {daysInMonth.map(({ date, isActive, isFrom, isTo }, index) => (
          <Cell key={index}>
            <DayButton
              $isTo={isTo}
              $isFrom={isFrom}
              onClick={() => onDateClick(date)}
              $isActive={isActive}>
              {date.format(DATE_FORMAT.SHORT_DAY)}
            </DayButton>
          </Cell>
        ))}
      </Table>
    </Root>
  );
}

const Root = styled.section`
  padding: 20px 15px;
  background: var(--red5);
  border-radius: 10px;
  user-select: none;
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
    ${({ $isActive, $isTo, $isFrom }) => {
      if ($isFrom || $isTo) {
        return '--white';
      } else if ($isActive) {
        return '--black2';
      } else {
        return '--gray4';
      }
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
    }}
  );
  transition: 0.2s ease;
`;

export default Calendar;
