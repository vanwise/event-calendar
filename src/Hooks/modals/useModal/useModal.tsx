import { FC, useCallback, useEffect, useId, useState } from 'react';
import { ModalHookProps } from 'Types/libs';
import { setModalsInContainer } from './components/ModalsContainer/ModalsContainer';

type ModalProps<P> = P & ModalHookProps;
type CommonModalProps<P> = Omit<P, keyof ModalHookProps>;

function useModal<D, P>(
  ModalComponent: FC<ModalProps<P>>,
  modalProps: ((data?: D) => CommonModalProps<P>) | CommonModalProps<P>,
) {
  const id = useId();

  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<D>();

  const open = useCallback((data?: D) => {
    if (data) {
      setData(data);
    }
    setIsVisible(true);
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);
    if (data) {
      setData(undefined);
    }
  }, [data]);

  const toggleVisibility = useCallback(
    () => setIsVisible(prevValue => !prevValue),
    [],
  );

  useEffect(() => {
    if (isVisible) {
      const commonProps =
        typeof modalProps === 'function' ? modalProps(data) : modalProps;
      const props = {
        ...commonProps,
        onClose: close,
        isVisible,
      };

      setModalsInContainer?.(prevValue => ({
        ...prevValue,
        [id]: <ModalComponent {...(props as any)} />,
      }));
    } else {
      setModalsInContainer?.(prevValue => {
        const { [id]: modalId, ...newValue } = prevValue;
        return newValue;
      });
    }
  }, [ModalComponent, modalProps, data, close, id, isVisible]);

  return {
    data,
    open,
    close,
    setData,
    isVisible,
    toggleVisibility,
  };
}

export default useModal;
