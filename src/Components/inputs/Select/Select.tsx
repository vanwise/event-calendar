import { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import ReactSelect, { mergeStyles, OnChangeValue } from 'react-select';
import { InputLayout } from 'Components/layouts';
import { ClearButton, OptionItem } from './components';
import { SelectProps } from './Select.types';
import { getSelectStyles } from './Select.utils';

function Select<FormValues extends FieldValues, Option extends SelectOption>({
  name,
  label,
  options,
  control,
  components,
  isDisabled,
  customStyles,
  controlOptions,
  ...restProps
}: SelectProps<FormValues, Option>) {
  const [isFocused, setIsFocused] = useState(false);

  const { field, formState } = useController({
    name,
    rules: controlOptions,
    control,
  });

  function handleChange(newValue: OnChangeValue<SelectOption, false>) {
    field.onChange(newValue?.value);
  }

  function renderSelect(hasError: boolean) {
    const styles = getSelectStyles<Option>({ isFocused, hasError });
    const selectedValue = options?.find(({ value }) => value === field.value);

    return (
      <ReactSelect
        value={selectedValue || null}
        styles={mergeStyles(styles, customStyles)}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        options={options}
        onChange={handleChange}
        isDisabled={isDisabled}
        components={{
          ClearIndicator: ClearButton,
          Option: OptionItem,
          ...components,
        }}
        {...restProps}
      />
    );
  }

  return (
    <InputLayout
      isWrapperAsDiv
      name={name}
      label={label}
      errors={formState.errors}
      isDisabled={isDisabled}
      renderInput={renderSelect}
    />
  );
}

export default Select;
