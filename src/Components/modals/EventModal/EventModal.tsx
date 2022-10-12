import { useState } from 'react';
import { css } from 'styled-components/macro';
import { IconButton } from 'Components/buttons';
import { Event } from 'Types/api';
import { FormSubmit } from 'Types/libs';
import ConfirmationModal from '../ConfirmationModal';
import Modal, { ModalProps } from '../Modal/Modal';
import EventForm, { EventFormValues } from './components/EventForm/EventForm';

interface EventModalProps extends Omit<ModalProps, 'children' | 'title'> {
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
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  function closeConfirmationModal() {
    setIsConfirmationVisible(false);
  }

  function handleConfirmationSuccessClick() {
    onDeleteEventClick();
    closeConfirmationModal();
  }

  const title = `${eventForChanging ? 'Change' : 'Create new'} event`;
  const confirmationModalText = `You want to delete "${eventForChanging?.title}" event`;

  const headerButtonsContent = eventForChanging && (
    <IconButton
      icon="trash"
      title="Delete event"
      onClick={() => setIsConfirmationVisible(true)}
    />
  );

  return (
    <>
      <Modal
        title={title}
        isLoading={isLoading}
        headerButtonsCSS={HEADER_BUTTONS_CSS}
        withoutClosingOnEsc={isConfirmationVisible}
        headerButtonsContent={headerButtonsContent}
        {...restProps}>
        <EventForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          defaultEvent={eventForChanging}
        />
      </Modal>
      <ConfirmationModal
        text={confirmationModalText}
        onClose={closeConfirmationModal}
        isVisible={isConfirmationVisible}
        onSuccessClick={handleConfirmationSuccessClick}
      />
    </>
  );
}

export default EventModal;
