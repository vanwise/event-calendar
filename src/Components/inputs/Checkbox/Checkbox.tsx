import styled from 'styled-components/macro';
import { FormInputProps } from 'Types/libs';

interface CheckboxProps<Values> extends FormInputProps<Values>, WithClassName {
  label: string;
}

function Checkbox<Values>({
  name,
  label,
  register,
  registerOptions,
  className,
}: CheckboxProps<Values>) {
  return (
    <Root className={className}>
      <Input
        {...register(name, registerOptions)}
        type="checkbox"
        className="visually-hidden"
      />
      <Text>{label}</Text>
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
  &:checked ~ ${Toggler} {
    background: var(--violet);
    border: 2px solid var(--violet);

    &::before {
      transform: translateX(80%);
    }
  }
`;

export default Checkbox;
