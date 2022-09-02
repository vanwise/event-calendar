import { toast } from 'react-toastify';
import { ToastOptions } from 'react-toastify/dist/types';
import { ToastCloseButton } from 'Components/buttons';

type ToastType = typeof toast;
interface ToastServiceType {
  error: ToastType['error'];
  success: ToastType['success'];
}

const toastOptions: ToastOptions = {
  position: toast.POSITION.BOTTOM_RIGHT,
  closeButton: ToastCloseButton,
};

const ToastService: ToastServiceType = {
  success(message, options) {
    return toast.success(message, { ...toastOptions, ...options });
  },
  error(message, options) {
    return toast.error(message, { ...toastOptions, ...options });
  },
};

export default ToastService;
