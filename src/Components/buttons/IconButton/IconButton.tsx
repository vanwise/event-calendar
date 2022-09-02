import styled, { css, CSSProp } from 'styled-components/macro';
import { CrossIcon, TrashIcon } from 'Components/svg';

type Icon = keyof typeof ICONS;
export interface IconButtonProps
  extends Omit<ButtonPropsWithoutRef, 'children'> {
  icon: Icon;
  iconCSS?: CSSProp;
}

const customCSS = css<{ $CSS?: CSSProp }>`
  ${({ $CSS }) => $CSS}
`;

const ICONS = {
  cross: styled(CrossIcon)`
    fill: var(--red2);
    ${customCSS}
  `,
  trash: styled(TrashIcon)`
    fill: var(--violet);
    ${customCSS}
  `,
};

function IconButton({ icon, iconCSS, ...restProps }: IconButtonProps) {
  const Icon = ICONS[icon];

  return (
    <Root type="button" {...restProps}>
      <Icon $CSS={iconCSS} />
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

export default IconButton;
