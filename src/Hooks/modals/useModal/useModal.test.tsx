import { render, screen } from '@testing-library/react';
import { AnyObject } from 'yup/lib/types';
import { ModalHookProps } from 'Types/libs';
import { userEventWithAct } from 'Utils/helpers/tests';
import { ModalsContainer } from './components';
import useModal from './useModal';

interface ModalProps {
  modalData?: AnyObject;
  modalProps?: AnyObject | ((data: any) => AnyObject);
}

function ModalComponent({ isVisible, onClose }: ModalHookProps) {
  if (!isVisible) null;
  return (
    <div role="dialog">
      <button onClick={onClose}>Close</button>
    </div>
  );
}

function ModalWithHook({ modalProps = {}, modalData = {} }: ModalProps) {
  const { isVisible, data, open, close, toggleVisibility } = useModal(
    ModalComponent,
    modalProps,
  );

  return (
    <>
      {isVisible && <h1>Visible</h1>}
      {data && <p>{JSON.stringify(data)}</p>}

      <button onClick={() => open()}>Open</button>
      <button onClick={() => open(modalData)}>Open with data</button>
      <button onClick={close}>Close</button>
      <button onClick={toggleVisibility}>Toggle</button>
    </>
  );
}

function setup(props: ModalProps = {}) {
  const renderResult = render(
    <>
      <ModalWithHook {...props} />
      <ModalsContainer />
    </>,
  );

  return renderResult;
}

function checkModalOnScreen() {
  screen.getByRole('heading', { level: 1, name: 'Visible' });
  screen.getByRole('dialog');
}

function checkModalHiddenOnScreen() {
  expect(
    screen.queryByRole('heading', { level: 1, name: 'Visible' }),
  ).toBeNull();
  expect(screen.queryByRole('dialog')).toBeNull();
}

describe('Use Modal', () => {
  it('should be toggling visibility', async () => {
    setup();

    const openButton = screen.getByRole('button', { name: 'Open' });
    const closeButton = screen.getByRole('button', { name: 'Close' });
    const toggleButton = screen.getByRole('button', { name: 'Toggle' });

    checkModalHiddenOnScreen();

    await userEventWithAct.click(openButton);
    checkModalOnScreen();

    await userEventWithAct.click(closeButton);
    checkModalHiddenOnScreen();

    await userEventWithAct.click(toggleButton);
    checkModalOnScreen();

    await userEventWithAct.click(toggleButton);
    checkModalHiddenOnScreen();
  });

  it('should be setting extra data on opening and set it on modal props', async () => {
    const modalData = { hasModalData: true };
    setup({ modalData });

    const openWithDataButton = screen.getByRole('button', {
      name: 'Open with data',
    });

    await userEventWithAct.click(openWithDataButton);
    screen.getByText(JSON.stringify(modalData));
  });
});
