import styled from 'styled-components/macro';
import { DatePicker } from 'Components/forms';

function CalendarPage() {
  return (
    <Root>
      <DatePicker
        defaultSelectedDates={{}}
        onSelectedDatesChange={console.log}
      />
    </Root>
  );
}

const Root = styled.div`
  padding: 40px;
`;

export default CalendarPage;
