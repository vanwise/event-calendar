import { useCallback } from 'react';
import styled from 'styled-components/macro';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldPath } from 'react-hook-form';
import { Button } from 'Components/buttons';
import { Input, Select, TextArea } from 'Components/inputs';
import { useAppSelector, useHookForm } from 'Hooks';
import { ValidationService } from 'Services';
import { selectAllTags } from 'Store/features/tags/tags.selectors';
import { Event } from 'Types/api';
import { FormSubmit } from 'Types/libs';
import { DateFields, ReminderCheckbox, TimeFields } from './components';
import {
  eventFormValidations,
  getEventFormDefaultValues,
} from './EventForm.utils';

export type ResetFormField = (name: FieldPath<EventFormValues>) => void;
export type EventFormValues = ValidationService.InferType<
  typeof eventFormValidations
>;
interface EventFormProps {
  onSubmit: FormSubmit<EventFormValues>;
  isLoading?: boolean;
  defaultEvent?: Event;
}

function EventForm({ onSubmit, isLoading, defaultEvent }: EventFormProps) {
  const eventTags = useAppSelector(selectAllTags);

  const {
    control,
    register,
    setValue,
    resetField,
    handleSubmit,
    formState: { errors: formErrors, isDirty },
  } = useHookForm<EventFormValues>({
    resolver: yupResolver(eventFormValidations),
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
        />

        <DateFields control={control} resetFormField={resetFormField} />

        <Select
          name="tagId"
          label="Tag"
          control={control}
          options={tagsOptions}
          placeholder="Select tag"
        />

        <TimeFields control={control} resetFormField={resetFormField} />

        <TextArea
          name="description"
          label="Description"
          errors={formErrors}
          register={register}
          placeholder="Enter description"
        />

        <ReminderCheckbox
          errors={formErrors}
          control={control}
          setFormValue={setValue}
        />
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
