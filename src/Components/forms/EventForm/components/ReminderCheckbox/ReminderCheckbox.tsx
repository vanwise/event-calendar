import { useEffect } from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { Checkbox } from 'Components/inputs';
import { useDynamicDateNow } from 'Hooks';
import { useGetUserQuery } from 'Store/features/users/users.slice';
import { FormInputProps } from 'Types/libs';
import { EventFormValues } from '../../EventForm';
import { isEventReadyForNotification } from './ReminderCheckbox.utils';

interface ReminderCheckboxProps
  extends Pick<FormInputProps<EventFormValues>, 'errors'> {
  control: Control<EventFormValues>;
  setFormValue: UseFormSetValue<EventFormValues>;
}

function ReminderCheckbox({
  control,
  setFormValue,
  ...restProps
}: ReminderCheckboxProps) {
  const dateNow = useDynamicDateNow();
  const { data: user } = useGetUserQuery();

  const [startDate, startTime, hasReminder] = useWatch({
    control,
    name: ['startDate', 'startTime', 'hasReminder'],
  });

  const isEventReady = isEventReadyForNotification(
    dateNow,
    startDate,
    startTime,
  );

  useEffect(() => {
    if (!isEventReady && hasReminder) {
      setFormValue('hasReminder', false);
    }
  }, [isEventReady, hasReminder, setFormValue]);

  if (!isEventReady || !user) {
    return null;
  }

  const availabilityValidation = {
    validate(value?: Nullable<boolean | string>) {
      if (value && !user.notificationSubscriptions.length) {
        return 'User not have any notification subscriptions yet. Allow notifications in browser settings and reload page';
      }
    },
  };

  return (
    <Checkbox
      name="hasReminder"
      label="Reminder on event starts?"
      register={control.register}
      registerOptions={availabilityValidation}
      {...restProps}
    />
  );
}

export default ReminderCheckbox;
