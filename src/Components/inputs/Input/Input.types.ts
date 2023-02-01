import { CSSProp } from 'styled-components/macro';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormInputProps } from 'Types/libs';

export type RawInputTag = 'input' | 'textarea';

type RegisterField = keyof UseFormRegisterReturn;

type ElementProps<As extends RawInputTag> = Omit<
  React.ComponentPropsWithoutRef<As>,
  RegisterField
> & {
  inputCSS?: CSSProp;
};

export type InputProps<
  Values,
  As extends RawInputTag = 'input',
> = FormInputProps<Values> &
  ElementProps<As> & {
    label?: string;
    inputAs?: As;
  };
