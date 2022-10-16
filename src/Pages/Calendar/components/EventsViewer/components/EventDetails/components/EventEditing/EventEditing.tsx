import styled from 'styled-components/macro';
import { Button } from 'Components/buttons';
import { useEventModal } from 'Hooks/modals';
import { Event } from 'Types/api';

interface EventEditingProps {
  event: Event;
}

function EventEditing({ event }: EventEditingProps) {
  const { openEventModal } = useEventModal();

  return (
    <EditButton theme="light" onClick={() => openEventModal(event)}>
      Edit event
    </EditButton>
  );
}

const EditButton = styled(Button)`
  margin: 15px 0 0;
  width: 100%;
`;

export default EventEditing;
