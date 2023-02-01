import { render, screen } from '@testing-library/react';
import { useOutsideClick } from 'Hooks';
import { userEventWithAct } from 'Utils/helpers/tests';

const onClick = jest.fn();

function CompnentWithHook() {
  const ref = useOutsideClick<HTMLDivElement>(onClick);

  return (
    <div role="wrapper">
      <div ref={ref} />
    </div>
  );
}

function setup() {
  const renderResult = render(<CompnentWithHook />);
  return renderResult;
}

afterEach(jest.clearAllMocks);

describe('Use Outside Click', () => {
  it('should be call callback on click window', async () => {
    setup();

    const wrapper = screen.getByRole('wrapper');
    await userEventWithAct.click(wrapper);
    expect(onClick).toBeCalledTimes(1);
  });
});
