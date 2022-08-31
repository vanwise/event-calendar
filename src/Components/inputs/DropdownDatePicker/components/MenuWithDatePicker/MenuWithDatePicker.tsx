import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components/macro';
import { MenuListProps } from 'react-select';
import DatePicker from 'Components/inputs/DatePicker';
import {
  DatePickerProps,
  DefaultSelectedDate,
} from 'Components/inputs/DatePicker/DatePicker.types';
import { getActiveDateOption } from '../../DropdownDatePicker.utils';

export type MenuDatePickerProps = Pick<
  DatePickerProps,
  'borderStartDate' | 'borderEndDate'
>;
interface MenuWithDatePickerProps
  extends MenuListProps<SelectOption>,
    MenuDatePickerProps {
  setOptions: Dispatch<SetStateAction<SelectOption[]>>;
}

function MenuWithDatePicker({
  setValue,
  clearValue,
  setOptions,
  borderEndDate,
  borderStartDate,
  selectProps: { value: selectedDate },
}: MenuWithDatePickerProps) {
  const defaultDate = Array.isArray(selectedDate)
    ? null
    : (selectedDate as SelectOption)?.value;

  function handleDateChange(dateISO: DefaultSelectedDate) {
    if (dateISO) {
      const newOption = getActiveDateOption(dateISO);

      setOptions([newOption]);
      setValue(newOption, 'select-option');
    } else {
      setOptions([]);
      clearValue();
    }
  }

  return (
    <Root>
      <DatePicker
        isSelectedDaysHidden
        defaultDate={defaultDate}
        onDateChange={handleDateChange}
        borderEndDate={borderEndDate}
        borderStartDate={borderStartDate}
      />
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export default MenuWithDatePicker;
