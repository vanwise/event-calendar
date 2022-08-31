import { DefaultTheme, StyledComponentBase } from 'styled-components/macro';
import { Action, ThunkAction } from '@reduxjs/toolkit';
import {
  Control,
  FieldErrors,
  FieldPath,
  FieldValues,
  RegisterOptions,
  UseControllerProps,
  UseFormRegister,
} from 'react-hook-form';
import { store } from 'Store/config';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type StyledComponentsAsProp = Parameters<
  StyledComponentBase<any, DefaultTheme>
>[0]['as'];

export interface FormInputProps<
  FormValues extends FieldValues,
  FieldName extends FieldPath<FormValues> = FieldPath<FormValues>,
> {
  name: FieldName;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  registerOptions?: RegisterOptions<FormValues>;
}

export interface ControlledFormInputProps<
  FormValues extends FieldValues,
  FieldName extends FieldPath<FormValues> = FieldPath<FormValues>,
> {
  name: FieldName;
  control: Control<FormValues>;
  controlOptions: UseControllerProps<FormValues, FieldName>['rules'];
}
