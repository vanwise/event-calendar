import { FocusEvent } from 'react';
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseFormSetValue,
} from 'react-hook-form';

export function getResettingOnBlur<FormValues extends FieldValues>(
  setValue: UseFormSetValue<Partial<FormValues>>,
  defaultValues: Partial<FormValues>,
) {
  return {
    onBlur(e: FocusEvent<HTMLInputElement>) {
      if (!e.target.value) {
        const fieldName = e.target.name as FieldPath<Partial<FormValues>>;
        const defaultValue = (defaultValues[fieldName] || '') as FieldPathValue<
          Partial<FormValues>,
          FieldPath<Partial<FormValues>>
        >;

        setValue(fieldName, defaultValue, { shouldValidate: true });
      }
    },
  };
}
