import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton, { ICON_BUTTON_ICONS, IconButtonIcon } from './IconButton';

const onClick = jest.fn();

function setup(props = {}) {
  const renderResult = render(
    <IconButton icon="cross" onClick={onClick} {...props} />,
  );
  const iconButton = renderResult.getByRole('button');

  return [iconButton, renderResult] as const;
}

afterEach(jest.clearAllMocks);

describe('Icon Button', () => {
  it('should be clicked', async () => {
    const [iconButton] = setup();

    await userEvent.click(iconButton);
    expect(onClick).toBeCalledTimes(1);
  });

  it('should have different icons', () => {
    const [iconButton, { rerender }] = setup();

    for (const icon in ICON_BUTTON_ICONS) {
      rerender(<IconButton icon={icon as IconButtonIcon} />);
      expect(iconButton).toMatchSnapshot();
    }
  });
});
