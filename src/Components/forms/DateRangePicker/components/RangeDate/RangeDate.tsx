import { Dayjs } from 'dayjs';
import styled, { keyframes } from 'styled-components/macro';
import { CrossIcon } from 'Components/svg';
import { DATE_FORMAT } from 'Utils/constants/date';

interface RangeDateProps {
  date?: Nullable<Dayjs>;
  isFrom?: boolean;
  onTextClick(): void;
  onDeleteClick(): void;
}

function RangeDate({
  date,
  isFrom,
  onDeleteClick,
  onTextClick,
}: RangeDateProps) {
  if (!date) {
    return null;
  }

  return (
    <Root>
      <TextButton onClick={onTextClick}>
        <TypeText>{isFrom ? 'From' : 'To'}</TypeText>
        {date.format(DATE_FORMAT.DAY_MONTH_YEAR)}
      </TextButton>

      <DeleteButton onClick={onDeleteClick}>
        <CrossIconStylized />
      </DeleteButton>
    </Root>
  );
}

const releasingAnimation = keyframes`
  from {
    filter: blur(5px);
  }
  to {
    filter: blur(0);
  }
`;

const Root = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: var(--violet2);
  border-radius: 10px;
  animation: ${releasingAnimation} 0.2s ease-in-out;
`;

const TextButton = styled.button`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  color: var(--violet);
`;

const TypeText = styled.span`
  font-size: 12px;
  font-weight: 400;
`;

const DeleteButton = styled.button`
  padding: 5px;
  width: 20px;
  height: 20px;
`;

const CrossIconStylized = styled(CrossIcon)`
  fill: var(--violet);
`;

export default RangeDate;
