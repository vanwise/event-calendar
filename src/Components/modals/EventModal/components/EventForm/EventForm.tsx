import { useCallback } from 'react';
import styled from 'styled-components/macro';
import { FieldPath } from 'react-hook-form';
import { Button } from 'Components/buttons';
import { Input, Select, TextArea } from 'Components/inputs';
import { useAppSelector, useHookForm } from 'Hooks';
import { selectAllTags } from 'Store/features/tags/tags.selectors';
import { Event } from 'Types/api';
import { FormSubmit } from 'Types/libs';
import { getValidations } from 'Utils/helpers/validation';
import { DateFields, ReminderCheckbox, TimeFields } from './components';
import { getEventFormDefaultValues } from './EventForm.utils';

export type ResetFormField = (name: FieldPath<EventFormValues>) => void;
interface EventFormValuesBase
  extends Omit<Event, 'id' | 'startDateISO' | 'endDateISO'> {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  hasReminder: boolean;
}
export type EventFormValues = Partial<EventFormValuesBase>;
export type SubmittedEventFormValues = PartialBy<
  EventFormValuesBase,
  'description'
>;
interface EventFormProps {
  onSubmit: FormSubmit<EventFormValues>;
  isLoading?: boolean;
  defaultEvent?: Event;
}

const requiredValidation = getValidations(['required']);

function EventForm({ onSubmit, isLoading, defaultEvent }: EventFormProps) {
  const eventTags = useAppSelector(selectAllTags);

  const {
    control,
    register,
    resetField,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
  } = useHookForm<EventFormValues>({
    defaultValues: getEventFormDefaultValues(defaultEvent),
  });

  const resetFormField: ResetFormField = useCallback(
    name => resetField(name, { defaultValue: '' }),
    [resetField],
  );

  const tagsOptions = eventTags.map(tag => ({
    value: tag.id,
    label: tag.title,
  }));

  return (
    <Root onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <Input
          name="title"
          label="Title"
          errors={formErrors}
          register={register}
          placeholder="Enter title"
          registerOptions={requiredValidation}
        />

        <DateFields control={control} resetFormField={resetFormField} />

        <Select
          name="tagId"
          label="Tag"
          control={control}
          options={tagsOptions}
          placeholder="Select tag"
          controlOptions={requiredValidation}
        />

        <TimeFields control={control} resetFormField={resetFormField} />

        <TextArea
          name="description"
          label="Description"
          errors={formErrors}
          register={register}
          placeholder="Enter description"
        />

        <ReminderCheckbox register={register} control={control} />
      </Wrapper>

      <SubmitButton
        type="submit"
        theme="light"
        disabled={!isDirty}
        isLoading={isLoading}>
        Submit
      </SubmitButton>
    </Root>
  );
}

const Root = styled.form`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  margin: 0 0 30px;
  align-items: start;
`;

const SubmitButton = styled(Button)`
  align-self: center;
  width: 50%;
`;

export default EventForm;
