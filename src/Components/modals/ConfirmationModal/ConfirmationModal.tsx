import styled, { css } from 'styled-components/macro';
import { Button } from 'Components/buttons';
import Modal, { ModalProps } from '../Modal/Modal';

interface ConfirmationModalProps
  extends Omit<ModalProps, 'children' | 'title'> {
  text?: string;
  onCancelClick?(): void;
  onSuccessClick(): void;
}

const WRAPPER_CSS = css`
  max-width: 500px;
`;
const TITLE_CSS = css`
  margin: 0 auto;
`;

function ConfirmationModal({
  text,
  onClose,
  onCancelClick,
  onSuccessClick,
  ...restProps
}: ConfirmationModalProps) {
  return (
    <Modal
      isCloseButtonHidden
      title="Are you sure?"
      onClose={onClose}
      titleCSS={TITLE_CSS}
      wrapperCSS={WRAPPER_CSS}
      {...restProps}>
      {text && <Text>{text}</Text>}

      <ButtonsWrapper>
        <Button onClick={onSuccessClick}>Yes</Button>
        <Button theme="light" onClick={onCancelClick || onClose}>
          No
        </Button>
      </ButtonsWrapper>
    </Modal>
  );
}

const Text = styled.p`
  margin: 0 0 20px;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
`;

const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0 20px;
  margin: 0 auto;
  width: 80%;
`;

export default ConfirmationModal;
