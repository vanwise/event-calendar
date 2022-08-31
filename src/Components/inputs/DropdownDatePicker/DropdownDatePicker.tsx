import { useCallback, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { MenuListProps, StylesConfig } from 'react-select';
import Select from '../Select';
import { SelectProps } from '../Select/Select.types';
import { MenuWithDatePicker } from './components';
import { MenuDatePickerProps } from './components/MenuWithDatePicker/MenuWithDatePicker';
import { getInitialOptions } from './DropdownDatePicker.utils';

type DropdownDatePickerProps<FormValues extends FieldValues> = Omit<
  SelectProps<FormValues>,
  'isSearchable' | 'options'
> &
  MenuDatePickerProps;

const customStyles: StylesConfig<SelectOption> = {
  menu(provided) {
    return {
      ...provided,
      right: 0,
      width: 'auto',
    };
  },
};

function DropdownDatePicker<FormValues extends FieldValues>({
  name,
  control,
  borderEndDate,
  borderStartDate,
  ...restProps
}: DropdownDatePickerProps<FormValues>) {
  const [options, setOptions] = useState<SelectOption[]>(
    getInitialOptions(control, name),
  );

  const MenuList = useCallback(
    (props: MenuListProps<SelectOption>) => (
      <MenuWithDatePicker
        setOptions={setOptions}
        borderEndDate={borderEndDate}
        borderStartDate={borderStartDate}
        {...props}
      />
    ),
    [borderEndDate, borderStartDate],
  );

  return (
    <Select
      name={name}
      control={control}
      options={options}
      components={{ MenuList }}
      isSearchable={false}
      customStyles={customStyles}
      {...restProps}
    />
  );
}

export default DropdownDatePicker;
