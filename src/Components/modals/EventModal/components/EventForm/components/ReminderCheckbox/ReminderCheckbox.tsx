import { Control, UseFormRegister, useWatch } from 'react-hook-form';
import { Checkbox } from 'Components/inputs';
import { useDynamicDateNow } from 'Hooks';
import { EventFormValues } from '../../EventForm';
import { isEventReadyForNotification } from './ReminderCheckbox.utils';

interface ReminderCheckboxProps {
  register: UseFormRegister<EventFormValues>;
  control: Control<EventFormValues>;
}

function ReminderCheckbox({ register, control }: ReminderCheckboxProps) {
  const dateNow = useDynamicDateNow();

  const [startDate, startTime] = useWatch({
    control,
    name: ['startDate', 'startTime'],
  });

  if (!isEventReadyForNotification(dateNow, startDate, startTime)) {
    return null;
  }

  return (
    <Checkbox
      name="hasReminder"
      label="Reminder on event starts?"
      register={register}
    />
  );
}

export default ReminderCheckbox;
