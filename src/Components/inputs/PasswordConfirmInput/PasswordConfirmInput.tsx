import { Control, FieldPath } from 'react-hook-form';
import WithFieldWatcher from 'Components/HOCs/WithFieldWatcher';
import { getValidations } from 'Utils/helpers/validation';
import Input from '../Input';
import { InputProps } from '../Input/Input.types';

interface PasswordConfirmInputProps<FormValues>
  extends Omit<InputProps<FormValues>, 'registerOptions' | 'type'> {
  control: Control<FormValues>;
  passwordFieldName: FieldPath<FormValues>;
}

function PasswordConfirmInput<FormValues>({
  control,
  passwordFieldName,
  ...restProps
}: PasswordConfirmInputProps<FormValues>) {
  return (
    <WithFieldWatcher name={[passwordFieldName]} control={control}>
      {([password]) => {
        const registerOptions = getValidations([
          'required',
          { match: { value: password, text: 'Passwords not same' } },
        ]);

        return (
          <Input
            type="password"
            placeholder="Confirm password"
            registerOptions={registerOptions}
            {...restProps}
          />
        );
      }}
    </WithFieldWatcher>
  );
}

export default PasswordConfirmInput;
