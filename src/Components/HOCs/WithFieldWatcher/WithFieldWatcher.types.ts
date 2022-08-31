import {
  Control,
  DeepPartialSkipArrayKey,
  FieldPath,
  FieldPathValues,
  FieldValues,
} from 'react-hook-form';

export type WatchedFieldValue<
  FormValues extends FieldValues,
  FieldName extends readonly FieldPath<FormValues>[],
> = FieldName extends readonly FieldPath<FormValues>[]
  ? FieldPathValues<FormValues, FieldName>
  : DeepPartialSkipArrayKey<FormValues>;

export type WithFieldWatcherProps<
  FormValues extends FieldValues,
  FieldName extends readonly FieldPath<FormValues>[],
> = {
  name?: [...FieldName];
  exact?: boolean;
  control: Control<FormValues>;
  disabled?: boolean;
  children(fieldValue: WatchedFieldValue<FormValues, FieldName>): JSX.Element;
};
