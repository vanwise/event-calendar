import { FocusEvent } from 'react';
import { isPlainObject } from '@reduxjs/toolkit';
import {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormSetValue,
} from 'react-hook-form';

export function getResettingOnBlur<FormValues extends FieldValues>(
  setValue: UseFormSetValue<FormValues>,
  defaultValues: Partial<FormValues>,
) {
  return {
    onBlur(e: FocusEvent<HTMLInputElement>) {
      if (!e.target.value) {
        const fieldName = e.target.name as FieldPath<FormValues>;
        const defaultValue = defaultValues[fieldName] as PathValue<
          FormValues,
          Path<FormValues>
        >;

        setValue(fieldName, defaultValue, { shouldValidate: true });
      }
    },
  };
}

export function combineOptions(
  source: Partial<RegisterOptions>,
  target: Partial<RegisterOptions>,
) {
  return Object.keys(target).reduce(
    (acc: Partial<RegisterOptions>, key) => {
      const optionsField = key as keyof RegisterOptions;
      const rule = target[optionsField];

      if (isPlainObject(rule)) {
        acc[optionsField] = {
          ...(source[optionsField] || null),
          ...rule,
        };
      } else {
        acc[optionsField] = rule;
      }

      return acc;
    },
    { ...source },
  );
}
