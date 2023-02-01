import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ArrowButton, {
  ArrowButtonDirection,
  arrowButtonRotateValue,
} from './ArrowButton';

const onClick = jest.fn();

function setup(props = {}) {
  const renderResult = render(<ArrowButton onClick={onClick} {...props} />);
  const arrowButton = renderResult.getByRole('button');

  return [arrowButton, renderResult] as const;
}

afterEach(jest.clearAllMocks);

describe('Arrow Button', () => {
  it('should be clicked', async () => {
    const [arrowButton] = setup();

    await userEvent.click(arrowButton);
    expect(onClick).toBeCalledTimes(1);
  });

  it('should take right direction', () => {
    const [arrowButton, { rerender }] = setup();

    for (const direction in arrowButtonRotateValue) {
      rerender(<ArrowButton direction={direction as ArrowButtonDirection} />);
      expect(arrowButton).toMatchSnapshot();
    }
  });
});
