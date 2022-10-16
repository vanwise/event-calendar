import { ConfirmationModal } from 'Components/modals';
import useModal from './useModal';

function useConfirmationModal(text: string, onSuccessClick: () => void) {
  const {
    open: openConfirmationModal,
    close: closeConfirmationModal,
    isVisible: isConfirmationModalVisible,
  } = useModal(ConfirmationModal, {
    text,
    onSuccessClick: handleSuccessClick,
  });

  function handleSuccessClick() {
    onSuccessClick();
    closeConfirmationModal();
  }

  return { isConfirmationModalVisible, openConfirmationModal };
}

export default useConfirmationModal;
