import styled, { css } from 'styled-components/macro';
import { ErrorMessage } from '@hookform/error-message';
import { FieldValues } from 'react-hook-form';
import { Tooltip } from 'Components/common';
import { FormInputProps } from 'Types/libs';

interface CheckboxProps<Values> extends FormInputProps<Values>, WithClassName {
  label: string;
  isDisabled?: boolean;
}

const ICON_CSS = css`
  stroke: var(--red2);
`;

function Checkbox<Values extends FieldValues>({
  name,
  label,
  errors,
  register,
  className,
  isDisabled,
  registerOptions,
}: CheckboxProps<Values>) {
  return (
    <Root className={className}>
      <Input
        {...register(name, registerOptions)}
        type="checkbox"
        className="visually-hidden"
      />
      <Text>{label}</Text>
      <ErrorMessage
        name={name as any}
        errors={errors}
        render={({ message }) =>
          !isDisabled &&
          message && <TooltipStylized text={message} iconCSS={ICON_CSS} />
        }
      />
      <Toggler />
    </Root>
  );
}

const Root = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Toggler = styled.span`
  display: flex;
  position: relative;
  width: 50px;
  height: 30px;
  border-radius: 50px;
  border: 2px solid var(--gray2);
  overflow: hidden;
  background: var(--gray2);

  &::before {
    content: '';
    width: 55%;
    height: 100%;
    border-radius: 50%;
    background: white;
    transition: 0.2s ease-out;
  }
`;

const Input = styled.input`
  &:focus-visible ~ ${Toggler} {
    outline: -webkit-focus-ring-color auto 1px;
  }

  &:checked ~ ${Toggler} {
    background: var(--violet);
    border: 2px solid var(--violet);

    &::before {
      transform: translateX(80%);
    }
  }
`;

const TooltipStylized = styled(Tooltip)`
  margin: 0 5px 0 auto;
`;

export default Checkbox;
