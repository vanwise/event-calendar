import { Event } from 'Types/api';
import Modal, { ModalProps } from '../Modal/Modal';
import EventForm, { EventFormValues } from './components/EventForm/EventForm';

interface EventModalProps extends Omit<ModalProps, 'children' | 'title'> {
  onSubmit(values: EventFormValues): void;
  eventForChanging?: Event;
}

function EventModal({
  onSubmit,
  isLoading,
  eventForChanging,
  ...restProps
}: EventModalProps) {
  const title = `${eventForChanging ? 'Change' : 'Create new'} event`;

  return (
    <Modal title={title} isLoading={isLoading} {...restProps}>
      <EventForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        defaultEvent={eventForChanging}
      />
    </Modal>
  );
}

export default EventModal;
