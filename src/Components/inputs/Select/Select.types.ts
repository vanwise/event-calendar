import { FieldValues } from 'react-hook-form';
import { Props as ReactSelectProps, StylesConfig } from 'react-select';
import { ControlledFormInputProps } from 'Types/libs';

type IncludedReactSelectProps =
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
    Pick<ReactSelectProps<Option, false>, IncludedReactSelectProps> {
  label?: string;
  options?: Option[];
  customStyles?: StylesConfig<Option>;
}
