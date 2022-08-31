import styled from 'styled-components/macro';
import { Control, useWatch } from 'react-hook-form';
import { Select } from 'Components/inputs';
import { useDynamicDateNow } from 'Hooks';
import { getValidations } from 'Utils/helpers/validation';
import { EventFormValues, ResetFormField } from '../../EventForm';
import {
  useEndTimeReseting,
  useStartTimeResetingByNow,
} from './TimeFields.hooks';
import { getEndTimeOptions, getStartTimeOptions } from './TimeFields.utils';

export interface TimeFieldsProps {
  control: Control<EventFormValues>;
  resetFormField: ResetFormField;
}

const requiredValidation = getValidations(['required']);

function TimeFields({ control, resetFormField }: TimeFieldsProps) {
  const dateNow = useDynamicDateNow();

  const [startDate, endDate, startTime, endTime] = useWatch({
    control,
    name: ['startDate', 'endDate', 'startTime', 'endTime'],
  });

  useEndTimeReseting({
    endDate,
    endTime,
    startDate,
    startTime,
    resetFormField,
  });

  useStartTimeResetingByNow({
    dateNow,
    startDate,
    startTime,
    resetFormField,
  });

  const startTimeOptions = getStartTimeOptions(dateNow, startDate);
  const endTimeOptions = getEndTimeOptions({
    dateNow,
    endDate,
    startTime,
    startDate,
  });

  return (
    <Root>
      <Select
        name="startTime"
        label="Start Time"
        control={control}
        options={startTimeOptions}
        controlOptions={requiredValidation}
      />
      <Line />
      <Select
        name="endTime"
        label="End Time"
        control={control}
        options={endTimeOptions}
        controlOptions={requiredValidation}
      />
    </Root>
  );
}

const Root = styled.div`
  display: grid;
  align-items: end;
  grid-template-columns: 1fr 20px 1fr;
  grid-gap: 10px;
`;

const Line = styled.div`
  margin: 0 0 20px;
  border-bottom: 1px solid var(--gray7);
`;

export default TimeFields;
