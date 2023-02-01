import { toast } from 'react-toastify';
import { ToastOptions } from 'react-toastify/dist/types';
import ToastCloseButton from 'Components/buttons/ToastCloseButton';

const toastOptions: ToastOptions = {
  position: toast.POSITION.BOTTOM_RIGHT,
  closeButton: ToastCloseButton,
  autoClose: 10000,
  style: {
    whiteSpace: 'pre-wrap',
  },
};

const ToastService: ToastServiceType = {
  success(message, options) {
    return toast.success(message, { ...toastOptions, ...options });
  },
  error(message, options) {
    return toast.error(message, { ...toastOptions, ...options });
  },
};

type ToastType = typeof toast;
interface ToastServiceType {
  error: ToastType['error'];
  success: ToastType['success'];
}

export default ToastService;
