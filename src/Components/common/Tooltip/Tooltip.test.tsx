import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from './Tooltip';

const TOOLTIP_MOCK_TEXT = 'tooltip mock text';

function setup(props = {}) {
  return render(<Tooltip text={TOOLTIP_MOCK_TEXT} {...props} />);
}

describe('Tooltip', () => {
  it('should be visible after hover and show mock text', async () => {
    setup();

    const tooltipText = screen.getByText(TOOLTIP_MOCK_TEXT);
    expect(tooltipText).not.toBeVisible();

    const tooltip = screen.getByRole('tooltip', { name: TOOLTIP_MOCK_TEXT });
    await userEvent.hover(tooltip);
    expect(tooltipText).toMatchSnapshot();
  });
});
