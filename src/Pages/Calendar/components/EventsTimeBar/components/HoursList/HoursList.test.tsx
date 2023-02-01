import { render, screen } from '@testing-library/react';
import { TimeService } from 'Services';
import { DATE_FORMAT } from 'Utils/constants/date';
import HoursList from './HoursList';

function setup(props = {}) {
  const renderResult = render(<HoursList {...props} />);
  return renderResult;
}

describe('Hours List', () => {
  it('should be showing all hours in day', () => {
    setup();

    const dateNow = TimeService.getStartOfDate();
    const hours = screen.getAllByRole('listitem');

    hours.forEach((hour, index) => {
      const formattedCurrentTime = dateNow
        .hour(index)
        .format(DATE_FORMAT.HOUR_MINUTES);

      expect(hour).toHaveTextContent(formattedCurrentTime);
    });
  });
});
