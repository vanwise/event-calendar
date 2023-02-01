import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button, { ButtonTheme } from './Button';
import { BUTTON_THEMES } from './Button.utils';

const onClick = jest.fn();

function setup(props = {}) {
  const renderResult = render(
    <Button onClick={onClick} {...props}>
      Test
    </Button>,
  );
  const button = renderResult.getByRole('button', { name: 'Test' });

  return [button, renderResult] as const;
}

afterEach(jest.clearAllMocks);

describe('Button', () => {
  it('should be clicked', async () => {
    const [button] = setup();

    await userEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
  });

  it('should be disabled and show loader when loading status is active', async () => {
    const [button] = setup({ isLoading: true });

    const loader = await screen.findByTestId('loader');

    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toBeCalled();

    expect(loader).toBeInTheDocument();
  });

  it('should have diferrent themes', () => {
    const [button, { rerender }] = setup();

    for (const theme in BUTTON_THEMES) {
      rerender(<Button theme={theme as ButtonTheme} />);
      expect(button).toMatchSnapshot();
    }
  });
});
