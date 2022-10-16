import styled from 'styled-components/macro';
import { ArrowButton } from 'Components/buttons';
import { BlurredLayout } from 'Components/layouts';
import { useAppDispatch, useAppSelector } from 'Hooks';
import TimeService, { TimeServiceDate } from 'Services/TimeService';
import { selectFilterDateRange } from 'Store/features/eventsFilter/eventsFilter.selectors';
import {
  showNextActiveDate,
  showPrevActiveDate,
} from 'Store/features/eventsFilter/eventsFilter.slice';

export interface NavigationButtonsProps {
  activeDate?: TimeServiceDate;
  onNavigationButtonClick(): void;
}

function NavigationButtons({
  onNavigationButtonClick,
  activeDate,
}: NavigationButtonsProps) {
  const dispatch = useAppDispatch();

  const dateRange = useAppSelector(selectFilterDateRange);

  function handlePrevButtonClick() {
    dispatch(showPrevActiveDate());
    onNavigationButtonClick();
  }

  function handleNextButtonClick() {
    dispatch(showNextActiveDate());
    onNavigationButtonClick();
  }

  const isLeftButtonDisabled = Boolean(
    activeDate && TimeService.isDateSame(activeDate, dateRange.from),
  );
  const isRightButtonDisabled = Boolean(
    activeDate && TimeService.isDateSame(activeDate, dateRange.to),
  );

  return (
    <Root>
      <ArrowButtonStylized
        title="Show previous date"
        onClick={handlePrevButtonClick}
        disabled={isLeftButtonDisabled}
        direction="left"
      />
      <ArrowButtonStylized
        title="Show next date"
        onClick={handleNextButtonClick}
        disabled={isRightButtonDisabled}
      />
    </Root>
  );
}

const Root = styled(BlurredLayout)`
  width: 61px;
  gap: 0 3px;
  padding-right: 5px;
  padding-left: 5px;
`;

const ArrowButtonStylized = styled(ArrowButton)`
  width: 24px;
  height: auto;
  background: 0;
  padding: 0;
`;

export default NavigationButtons;
