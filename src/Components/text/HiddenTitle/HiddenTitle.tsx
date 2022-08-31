import styled from 'styled-components/macro';
import { StyledComponentsAsProp } from 'Types/libs';
import { concatStringsBySpace } from 'Utils/helpers/string';

type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6;
interface HiddenTitleProps extends H1PropsWithoutRef {
  level: TitleLevel;
}

function HiddenTitle({ level, className, ...props }: HiddenTitleProps) {
  return (
    <Root
      as={`h${level}` as StyledComponentsAsProp}
      className={concatStringsBySpace('visually-hidden', className)}
      {...props}
    />
  );
}

const Root = styled.h1``;

export default HiddenTitle;
