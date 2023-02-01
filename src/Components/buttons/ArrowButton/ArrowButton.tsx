import styled from 'styled-components/macro';
import { RightArrowIcon } from 'Components/svg';

interface ArrowButtonProps extends ButtonPropsWithoutRef {
  direction?: ArrowButtonDirection;
}

export const arrowButtonRotateValue = {
  bottom: 90,
  left: 180,
  top: 270,
};

export type ArrowButtonDirection = keyof typeof arrowButtonRotateValue;

function ArrowButton({ direction, ...props }: ArrowButtonProps) {
  return (
    <Root $direction={direction} type="button" {...props}>
      <Icon />
    </Root>
  );
}

const Root = styled.button<{ $direction?: ArrowButtonDirection }>`
  width: 32px;
  height: 32px;
  padding: 2px;
  transition: 0.3s ease-out;
  background: var(--violet);
  border-radius: 12px;

  ${({ $direction }) =>
    $direction &&
    `transform: rotate(${arrowButtonRotateValue[$direction]}deg);`}

  &:hover:not([disabled]) {
    border-radius: 50%;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const Icon = styled(RightArrowIcon)`
  fill: white;
`;

export default ArrowButton;
