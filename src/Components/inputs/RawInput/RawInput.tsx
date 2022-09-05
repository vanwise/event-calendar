import { forwardRef } from 'react';
import styled, { CSSProp } from 'styled-components/macro';
import { RawInputProps, RawInputRef, RawInputTag } from './RawInput.types';

function RawInput<As extends RawInputTag = 'input'>(
  { inputCSS, hasError, ...restProps }: RawInputProps<As>,
  ref: RawInputRef<As>,
) {
  return <Root ref={ref} $CSS={inputCSS} $hasError={hasError} {...restProps} />;
}

const Root = styled.input<{ $hasError?: boolean; $CSS?: CSSProp }>`
  padding: 8px 10px;
  min-height: 38px;
  border-radius: 5px;
  color: var(--gray7);
  border: 1px solid;
  border-color: var(${({ $hasError }) => ($hasError ? '--red2' : '--gray6')});
  background: white;
  transition: 0.3s;

  &::placeholder {
    color: var(--gray8);
  }

  &:disabled {
    border-color: var(--gray);

    &::placeholder {
      color: var(--gray);
    }
  }

  &:focus {
    border-color: var(
      ${({ $hasError }) => ($hasError ? '--red2' : '--transparent')}
    );
    box-shadow: 0 0 5px 0
      var(${({ $hasError }) => ($hasError ? '--red2' : '--violet')});
    transform: scale(1.001);
  }

  ${({ $CSS }) => $CSS}
`;

const RawInputForwarded = forwardRef(RawInput) as typeof RawInput;

export default RawInputForwarded;
