import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { userEventWithAct } from 'Utils/helpers/tests';
import Modal from './Modal';

const onClose = jest.fn();

function setup(props = {}) {
  const renderResult = render(
    <Modal title="Test title" isVisible onClose={onClose} {...props} />,
  );
  return renderResult;
}

function hideModalByCallOnClose(rerender: (ui: ReactElement) => void) {
  if (onClose.mock.calls.length) {
    rerender(<Modal title="Test" isVisible={false} onClose={onClose} />);
  }
}

afterEach(jest.clearAllMocks);

describe('Modal', () => {
  it('should be contain content', () => {
    setup({
      children: <button>Test button</button>,
      headerButtonsContent: <button>Header button</button>,
    });

    screen.getByRole('heading', { level: 2, name: 'Test title' });
    screen.getByRole('button', { name: 'Test button' });
    screen.getByRole('button', { name: 'Header button' });
  });

  it('should be visibile by change isVisible', () => {
    const { rerender } = setup({ isVisible: false });

    expect(screen.queryByRole('dialog')).toBeNull();
    rerender(<Modal title="Test" isVisible onClose={onClose} />);
    screen.getByRole('dialog');
  });

  it('should be visible after click of it content', async () => {
    const { rerender } = setup({ children: <button>Test button</button> });

    const contentButton = screen.getByRole('button', { name: 'Test button' });
    await userEvent.click(contentButton, { delay: 300 });
    hideModalByCallOnClose(rerender);
    screen.getByRole('dialog');
  });

  it('should be hidden by click of it', async () => {
    const { rerender } = setup();

    const modal = screen.getByRole('dialog');
    await userEventWithAct.click(modal, { delay: 300 });

    hideModalByCallOnClose(rerender);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should be hidden by press Esc key', async () => {
    const { rerender } = setup();

    screen.getByRole('dialog');
    await userEventWithAct.keyboard('{Escape}', { delay: 300 });
    hideModalByCallOnClose(rerender);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should not be hidden by press Esc key', async () => {
    setup({ withoutClosingOnEsc: true });

    await userEventWithAct.keyboard('{Escape}', { delay: 300 });
    screen.getByRole('dialog');
  });

  it('should be with hidden close button', () => {
    const { rerender } = setup();

    screen.getByRole('button', { name: 'Close modal' });
    rerender(
      <Modal title="Test" isVisible isCloseButtonHidden onClose={onClose} />,
    );
    expect(screen.queryByRole('button', { name: 'Close modal' })).toBeNull();
  });

  it('should not to be closable when loading status active', async () => {
    const { rerender } = setup({ isLoading: true });

    const modal = screen.getByRole('dialog');
    await userEventWithAct.click(modal, { delay: 300 });
    await userEventWithAct.keyboard('{Escape}', { delay: 300 });
    hideModalByCallOnClose(rerender);
    expect(modal).toBeInTheDocument();
  });
});
