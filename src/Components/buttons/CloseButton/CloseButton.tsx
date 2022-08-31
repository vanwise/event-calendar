import styled, { CSSProp } from 'styled-components/macro';
import { CrossIcon } from 'Components/svg';

interface CloseButtonProps extends Omit<ButtonPropsWithoutRef, 'children'> {
  iconCSS?: CSSProp;
}

function CloseButton({ iconCSS, ...restProps }: CloseButtonProps) {
  return (
    <Root {...restProps}>
      <CrossIconStylized $CSS={iconCSS} />
    </Root>
  );
}

const Root = styled.button`
  width: 20px;
  transition: 0.3s ease-out;

  &:hover {
    opacity: 0.7;
  }
`;

const CrossIconStylized = styled(CrossIcon)<{ $CSS?: CSSProp }>`
  fill: var(--red2);

  ${({ $CSS }) => $CSS}
`;

export default CloseButton;
