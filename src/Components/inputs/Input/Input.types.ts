import { UseFormRegisterReturn } from 'react-hook-form';
import { FormInputProps } from 'Types/libs';
import { RawInputProps, RawInputTag } from '../RawInput/RawInput.types';

type RegisterField = keyof UseFormRegisterReturn;

type ElementProps<As extends RawInputTag> = Omit<
  RawInputProps<As>,
  'as' | 'hasError' | RegisterField
>;

export type InputProps<
  Values,
  As extends RawInputTag = 'input',
> = FormInputProps<Values> &
  ElementProps<As> & {
    label?: string;
    inputAs?: As;
  };
