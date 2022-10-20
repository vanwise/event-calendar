import styled from 'styled-components/macro';
import { TimeService } from 'Services';
import { DATE_FORMAT } from 'Utils/constants/date';
import { getDayHours } from 'Utils/helpers/date';

export const HOUR_HEIGHT_IN_PX = 80;
export const HOUR_TEXT_WIDTH_IN_PX = 80;

const dayHours = getDayHours();

function HoursList() {
  return (
    <ul>
      {dayHours.map(hour => {
        const dateTime = TimeService.getDate(
          hour,
          DATE_FORMAT.HOUR_MINUTES,
        ).format('HH:mm');

        return (
          <Item key={hour}>
            <Time dateTime={dateTime}>{hour}</Time>
          </Item>
        );
      })}
    </ul>
  );
}

const Item = styled.li`
  position: relative;
  display: flex;
  height: ${HOUR_HEIGHT_IN_PX}px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: calc(100% - 80px);
    height: 1px;
    background: var(--gray2);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray2);
  }
`;

const Time = styled.time`
  display: flex;
  justify-content: center;
  padding: 15px 0;
  width: ${HOUR_TEXT_WIDTH_IN_PX}px;
  font-weight: 400;
  color: var(--gray4);
  border-right: 1px solid var(--gray2);
`;

export default HoursList;
