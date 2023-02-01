import { ReactNode } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { FieldValues } from 'react-hook-form';
import { FormInputProps } from 'Types/libs';

interface FormErrorMessageProps<FormValues extends FieldValues = FieldValues> {
  isDisabled?: boolean;
  renderMessage(message: string): ReactNode;
  name: FormInputProps<FormValues>['name'];
  errors: Exclude<FormInputProps<FormValues>['errors'], undefined>;
}

function FormErrorMessage({
  name,
  errors,
  isDisabled,
  renderMessage,
}: FormErrorMessageProps) {
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => !isDisabled && message && renderMessage(message)}
    />
  );
}

export default FormErrorMessage;
