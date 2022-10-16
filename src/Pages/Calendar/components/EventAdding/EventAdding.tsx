import { Button } from 'Components/buttons';
import { useEventModal } from 'Hooks/modals';

function EventAdding() {
  const { openEventModal } = useEventModal();

  return <Button onClick={() => openEventModal()}>Add event</Button>;
}

export default EventAdding;
