import { RightArrowIcon } from 'Components/svg';
import styled, { keyframes } from 'styled-components/macro';

function EmptyBlock() {
  return (
    <Root>
      <ArrowIcon />
      <Text>Select date</Text>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 200px 0 0;
`;

const arrowTransformAnimation = keyframes`
  from {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(180deg) translateX(-10px);
  }
`;

const ArrowIcon = styled(RightArrowIcon)`
  margin: 0 5px 0 0;
  width: 30px;
  fill: var(--violet);
  animation: ${arrowTransformAnimation} 1s infinite alternate ease-out;
`;

const Text = styled.p`
  padding: 2px 0 0;
  font-size: 20px;
  font-style: italic;
`;

export default EmptyBlock;
