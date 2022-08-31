import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { TimeService } from 'Services';
import { DATE_FORMAT } from 'Utils/constants/date';

export function getActiveDateOption(dateISO: string) {
  const date = TimeService.getDate(dateISO);
  return {
    value: dateISO,
    label: date.format(DATE_FORMAT.SHORT_MONTH_DAY_YEAR),
  };
}

export function getInitialOptions<FormValues extends FieldValues>(
  control: Control<FormValues>,
  name: FieldPath<FormValues>,
) {
  const defaultValue = control._defaultValues[name];
  return defaultValue ? [getActiveDateOption(defaultValue as string)] : [];
}
