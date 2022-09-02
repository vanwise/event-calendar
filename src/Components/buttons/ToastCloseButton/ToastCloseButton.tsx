import styled from 'styled-components/macro';
import { CloseButtonProps } from 'react-toastify/dist/components/CloseButton';
import IconButton from '../IconButton';

type ToastCloseButtonProps = CloseButtonProps;

function ToastCloseButton({ closeToast }: ToastCloseButtonProps) {
  return <Root icon="cross" title="Close toast" onClick={closeToast} />;
}

const Root = styled(IconButton)`
  align-self: flex-start;
  width: 12px;
`;

export default ToastCloseButton;
