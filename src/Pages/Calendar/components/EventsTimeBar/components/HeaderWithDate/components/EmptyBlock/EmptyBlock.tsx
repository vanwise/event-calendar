import styled, { keyframes } from 'styled-components/macro';
import { RightArrowIcon } from 'Components/svg';

function EmptyBlock() {
  return (
    <Root>
      <ArrowIcon />
      <Text>Choose date</Text>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const arrowAnimation = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(180deg) translateX(-10px);
  }
`;

const ArrowIcon = styled(RightArrowIcon)`
  margin: 0 5px 0 0;
  width: 25px;
  fill: var(--violet);
  animation: ${arrowAnimation} 1s infinite alternate ease-out;
  filter: drop-shadow(0 0 1px white);
`;

const Text = styled.p`
  padding: 2px 0 0;
  font-size: 16px;
  font-style: italic;
  color: var(--violet);
  filter: drop-shadow(0 0 1px white);
`;

export default EmptyBlock;
