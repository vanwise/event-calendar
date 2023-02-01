import styled, { CSSProp } from 'styled-components/macro';
import { FieldValues } from 'react-hook-form';
import { InputLayout } from 'Components/layouts';
import { InputProps, RawInputTag } from './Input.types';

function Input<Values extends FieldValues, As extends RawInputTag = 'input'>({
  name,
  label,
  errors,
  inputAs,
  register,
  inputCSS,
  className,
  registerOptions,
  ...restProps
}: InputProps<Values, As>) {
  return (
    <InputLayout
      name={name}
      label={label}
      errors={errors}
      className={className}
      isDisabled={registerOptions?.disabled}
      renderInput={hasError => (
        <InputStylized
          as={inputAs as any}
          $CSS={inputCSS}
          $hasError={hasError}
          {...register(name, registerOptions)}
          {...restProps}
        />
      )}
    />
  );
}

const InputStylized = styled.input<{ $hasError?: boolean; $CSS?: CSSProp }>`
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

export default Input;
