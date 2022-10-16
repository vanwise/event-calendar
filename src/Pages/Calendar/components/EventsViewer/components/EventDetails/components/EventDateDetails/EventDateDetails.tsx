import styled, { css } from 'styled-components/macro';
import {
  CalendarOutlinedIcon,
  ClockOutlinedIcon,
  NotificationOutlinedIcon,
} from 'Components/svg';
import { TimeService } from 'Services';
import { DATE_FORMAT } from 'Utils/constants/date';

interface EventDateDetailsProps {
  endDateISO: string;
  startDateISO: string;
  hasNotification: boolean;
}

const { HOUR_MINUTES, SHORT_WEEK_MONTH_DAY_YEAR } = DATE_FORMAT;

function EventDateDetails({
  endDateISO,
  startDateISO,
  hasNotification,
}: EventDateDetailsProps) {
  const startDate = TimeService.getDate(startDateISO);
  const endDate = TimeService.getDate(endDateISO);

  const { durationString } = TimeService.getDurations(startDate, endDate);

  const isSameEndDate = startDate.isSame(endDate, 'date');
  const endDateString = isSameEndDate
    ? ''
    : ` -\n${endDate.format(SHORT_WEEK_MONTH_DAY_YEAR)}`;

  return (
    <Root>
      <DateWrapper>
        <ClockIcon />

        <TimeText>{`${startDate.format(HOUR_MINUTES)} - ${endDate.format(
          HOUR_MINUTES,
        )}`}</TimeText>

        <CalendarIcon />

        <DateText>{`${startDate.format(
          SHORT_WEEK_MONTH_DAY_YEAR,
        )}${endDateString}`}</DateText>
      </DateWrapper>

      <DurationWrapper>
        <Duration>{durationString}</Duration>
        {hasNotification && <NotificationIcon title="With notification" />}
      </DurationWrapper>
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 5px;
`;

const DateWrapper = styled.div`
  display: grid;
  grid-template-columns: 25px 1fr;
  grid-gap: 10px;
  align-items: center;
`;

const svgCSS = css`
  border-radius: 10px;
  background: var(--red5);
  padding: 3px;
  stroke: var(--red2);
`;

const ClockIcon = styled(ClockOutlinedIcon)`
  ${svgCSS}
`;

const CalendarIcon = styled(CalendarOutlinedIcon)`
  ${svgCSS}
`;

const DateText = styled.time`
  font-size: 14px;
  white-space: pre-line;
`;

const TimeText = styled(DateText)`
  text-transform: lowercase;
`;

const DurationWrapper = styled.div`
  display: grid;
  justify-items: end;
  grid-gap: 10px 0;
`;

const Duration = styled.p`
  color: var(--gray4);
`;

const NotificationIcon = styled(NotificationOutlinedIcon)`
  width: 20px;
  stroke: var(--violet);
`;

export default EventDateDetails;
