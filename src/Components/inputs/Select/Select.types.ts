import { FieldValues } from 'react-hook-form';
import { Props as ReactSelectProps, StylesConfig } from 'react-select';
import { ControlledFormInputProps } from 'Types/libs';

type ExcludedReactSelectProps =
  | 'isDisabled'
  | 'isSearchable'
  | 'placeholder'
  | 'isClearable'
  | 'components'
  | 'isLoading';

export interface SelectProps<
  FormValues extends FieldValues,
  Option extends SelectOption = SelectOption,
> extends ControlledFormInputProps<FormValues>,
    WithClassName,
    Pick<ReactSelectProps<Option, false>, ExcludedReactSelectProps> {
  label?: string;
  options?: Option[];
  customStyles?: StylesConfig<Option>;
}
