import { useEffect } from 'react';
import styled from 'styled-components/macro';
import { Control, useWatch } from 'react-hook-form';
import { DropdownDatePicker } from 'Components/inputs';
import { TimeService } from 'Services';
import { getValidations } from 'Utils/helpers/validation';
import { EventFormValues, ResetFormField } from '../../EventForm';

interface DateFieldsProps {
  control: Control<EventFormValues>;
  resetFormField: ResetFormField;
}

const requiredValidation = getValidations(['required']);

function DateFields({ control, resetFormField }: DateFieldsProps) {
  const [startDate, endDate] = useWatch({
    control,
    name: ['startDate', 'endDate'],
  });

  useEffect(() => {
    if (startDate && endDate && startDate > endDate) {
      resetFormField('endDate');
    }
  }, [startDate, endDate, resetFormField]);

  const startOfNowDay = TimeService.getStartOfDate().toISOString();

  return (
    <Root>
      <DropdownDatePicker
        name="startDate"
        label="Start Date"
        control={control}
        placeholder="Select start date"
        controlOptions={requiredValidation}
        borderStartDate={startOfNowDay}
      />
      <DropdownDatePicker
        name="endDate"
        label="End Date"
        control={control}
        placeholder="Select end date"
        controlOptions={requiredValidation}
        borderStartDate={startDate || startOfNowDay}
      />
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  align-items: end;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
`;

export default DateFields;
