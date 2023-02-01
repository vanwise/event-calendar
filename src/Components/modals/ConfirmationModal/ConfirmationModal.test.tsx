import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import ConfirmationModal from './ConfirmationModal';

const onSuccessClick = jest.fn();
const onCancelClick = jest.fn();
const onClose = jest.fn();

function setup(props = {}) {
  const renderResult = render(
    <ConfirmationModal
      isVisible
      onClose={onClose}
      onSuccessClick={onSuccessClick}
      {...props}
    />,
  );
  return renderResult;
}

function hideModalByCallOnClose(rerender: (ui: ReactElement) => void) {
  if (onClose.mock.calls.length) {
    rerender(
      <ConfirmationModal
        onClose={onClose}
        isVisible={false}
        onSuccessClick={onSuccessClick}
      />,
    );
  }
}

afterEach(jest.clearAllMocks);

describe('Confirmation Modal', () => {
  it('should be contain content', () => {
    setup({ text: 'Test text' });
    screen.getByText('Test text');
  });

  it('should be click on Yes button', async () => {
    setup();

    const yesButton = screen.getByRole('button', { name: 'Yes' });
    await userEvent.click(yesButton);
    expect(onSuccessClick).toBeCalledTimes(1);
  });

  it('should be click on No button with onCancelClick and close without it', async () => {
    const { rerender } = setup({ onCancelClick });

    const noButton = screen.getByRole('button', { name: 'No' });
    await userEvent.click(noButton);
    expect(onCancelClick).toBeCalledTimes(1);

    rerender(
      <ConfirmationModal
        isVisible
        onClose={onClose}
        onSuccessClick={onSuccessClick}
      />,
    );
    await userEvent.click(noButton);
    hideModalByCallOnClose(rerender);
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
