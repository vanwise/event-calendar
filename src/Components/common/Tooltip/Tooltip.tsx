import styled, { CSSProp, keyframes } from 'styled-components/macro';
import { AlertIcon } from 'Components/svg';

interface TooltipProps extends WithClassName {
  text: string;
  iconCSS?: CSSProp;
}

function Tooltip({ text, iconCSS, className }: TooltipProps) {
  return (
    <Root className={className}>
      <Icon $CSS={iconCSS} />
      <Text>{text}</Text>
    </Root>
  );
}

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translate(-50%, -10px);
  }
`;

const Text = styled.span`
  position: absolute;
  z-index: 10;
  bottom: calc(100% + 5px);
  left: 50%;
  display: none;
  padding: 10px 15px;
  width: max-content;
  max-width: 300px;
  transform: translateX(-50%);
  border: 1px solid var(--violet);
  border-radius: 20px;
  background: white;
  box-shadow: 0 5px 20px 5px var(--gray-opacity);
  animation: ${fadeInAnimation} 0.3s forwards;
  hyphens: auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -19px;
    transform: translateX(-50%);
    border-top: 12px solid var(--violet);
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid transparent;
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -19px;
    transform: translateX(-50%);
    border-top: 10px solid white;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 9px solid transparent;
  }
`;

const Root = styled.span`
  position: relative;

  &:hover {
    ${Text} {
      display: block;
    }
  }
`;

const Icon = styled(AlertIcon)<{ $CSS?: CSSProp }>`
  ${({ $CSS }) => $CSS}
`;

export default Tooltip;
