import { css } from 'styled-components/macro';
import { IconButton } from 'Components/buttons';
import EventForm, {
  EventFormValues,
} from 'Components/forms/EventForm/EventForm';
import { useConfirmationModal } from 'Hooks/modals';
import { Event } from 'Types/api';
import { FormSubmit } from 'Types/libs';
import Modal, { ModalProps } from '../Modal/Modal';

export interface EventModalProps
  extends Omit<ModalProps, 'children' | 'title'> {
  onSubmit: FormSubmit<EventFormValues>;
  onDeleteEventClick(): void;
  eventForChanging?: Event;
}

const HEADER_BUTTONS_CSS = css`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0 10px;
`;

function EventModal({
  onSubmit,
  isLoading,
  onDeleteEventClick,
  eventForChanging,
  ...restProps
}: EventModalProps) {
  const confirmationModalText = `You want to delete "${eventForChanging?.title}" event`;
  const title = `${eventForChanging ? 'Change' : 'Create new'} event`;

  const { isConfirmationModalVisible, openConfirmationModal } =
    useConfirmationModal(confirmationModalText, onDeleteEventClick);

  const headerButtonsContent = eventForChanging && (
    <IconButton
      icon="trash"
      title="Delete event"
      onClick={openConfirmationModal}
    />
  );

  return (
    <>
      <Modal
        title={title}
        isLoading={isLoading}
        headerButtonsCSS={HEADER_BUTTONS_CSS}
        withoutClosingOnEsc={isConfirmationModalVisible}
        headerButtonsContent={headerButtonsContent}
        {...restProps}>
        <EventForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          defaultEvent={eventForChanging}
        />
      </Modal>
    </>
  );
}

export default EventModal;
