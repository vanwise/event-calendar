import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainDropdown from './MainDropdown';

const onClose = jest.fn();

function setup(props = {}) {
  const renderResult = render(
    <MainDropdown
      onClose={onClose}
      renderDropdown={() => <article title="Hello" />}
      renderTrigger={toggle => <button onClick={toggle}>Trigger</button>}
      {...props}
    />,
  );

  return renderResult;
}

afterEach(jest.clearAllMocks);

describe('Main Dropdown', () => {
  it('should be open by click trigger and close by click outside', async () => {
    const { container } = setup();

    function checkDropdownAbsenceInDocument() {
      expect(
        screen.queryByRole('article', { name: 'Hello' }),
      ).not.toBeInTheDocument();
    }

    checkDropdownAbsenceInDocument();
    const triggerButton = screen.getByRole('button', { name: 'Trigger' });

    await act(async () => await userEvent.click(triggerButton));
    screen.getByRole('article', { name: 'Hello' });

    await act(async () => await userEvent.click(container));
    checkDropdownAbsenceInDocument();
    expect(onClose).toBeCalledTimes(1);
  });
});
