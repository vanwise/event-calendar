import { FieldPath, FieldValues, useWatch } from 'react-hook-form';
import {
  WatchedFieldValue,
  WithFieldWatcherProps,
} from './WithFieldWatcher.types';

function WithFieldWatcher<
  FormValues extends FieldValues,
  FieldName extends readonly FieldPath<FormValues>[],
>({ children, ...restProps }: WithFieldWatcherProps<FormValues, FieldName>) {
  const fieldValue = useWatch(restProps);

  return children(fieldValue as WatchedFieldValue<FormValues, FieldName>);
}

export default WithFieldWatcher;
