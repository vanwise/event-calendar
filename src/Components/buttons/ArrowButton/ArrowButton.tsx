import styled from 'styled-components/macro';
import { RightArrowIcon } from 'Components/svg';

interface ArrowButtonProps extends WithClassName {
  onClick(): void;
  direction?: ArrowDirection;
}

const directionRotateValue = {
  bottom: 90,
  left: 180,
  top: 270,
};

type ArrowDirection = keyof typeof directionRotateValue;

function ArrowButton({ onClick, className, direction }: ArrowButtonProps) {
  return (
    <Root className={className} onClick={onClick} $direction={direction}>
      <RightArrowIcon className={className} />
    </Root>
  );
}

const Root = styled.button<{ $direction?: ArrowDirection }>`
  width: 32px;
  height: 32px;
  transition: 0.3s ease-out;

  ${({ $direction }) =>
    $direction && `transform: rotate(${directionRotateValue[$direction]}deg);`}

  &:hover {
    opacity: 0.7;
  }
`;

export default ArrowButton;
