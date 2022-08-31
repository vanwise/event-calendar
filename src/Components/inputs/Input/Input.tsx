import { FieldValues } from 'react-hook-form';
import { InputLayout } from 'Components/layouts';
import RawInput from '../RawInput';
import { RawInputTag } from '../RawInput/RawInput.types';
import { InputProps } from './Input.types';

function Input<Values extends FieldValues, As extends RawInputTag>({
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
        <RawInput
          as={inputAs as any}
          inputCSS={inputCSS}
          hasError={hasError}
          {...restProps}
          {...register(name, registerOptions)}
        />
      )}
    />
  );
}

export default Input;
