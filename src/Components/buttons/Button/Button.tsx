import styled from 'styled-components/macro';
import { Loader } from 'Components/common';
import { BUTTON_LOADER_COLOR, BUTTON_THEMES } from './Button.utils';

type Theme = keyof typeof BUTTON_THEMES;
interface ButtonProps extends ButtonPropsWithoutRef {
  theme?: Theme;
  isLoading?: boolean;
}

function Button({
  theme = 'violet',
  children,
  disabled,
  isLoading,
  ...props
}: ButtonProps) {
  const loaderColor = BUTTON_LOADER_COLOR[theme];

  return (
    <Root
      type="button"
      $theme={theme}
      disabled={isLoading || disabled}
      $isLoading={isLoading}
      {...props}>
      {children}
      {isLoading && (
        <LoaderStylized color={loaderColor} width={4} height={20} />
      )}
    </Root>
  );
}

const Root = styled.button<{ $theme: Theme; $isLoading?: boolean }>`
  position: relative;
  z-index: 0;
  padding: 15px;
  min-height: 55px;
  transition: 0.3s ease-out;
  border-radius: 10px;
  font-size: 18px;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transition: 0.3s ease-out;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    transition: 0.3s ease-out;
  }

  &:hover:not([disabled]) {
    transform: translate(-3px, -3px);

    &::after {
      transform: translate(5px, 5px);
    }
  }

  &:disabled {
    color: var(
      ${({ $isLoading }) => ($isLoading ? '--transparent' : '--gray8')}
    );

    &::before {
      ${({ $isLoading }) => !$isLoading && 'background: var(--gray);'}
    }
  }

  ${({ $theme }) => BUTTON_THEMES[$theme]}
`;

const LoaderStylized = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Button;
