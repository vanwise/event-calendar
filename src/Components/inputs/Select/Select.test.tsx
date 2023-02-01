import { act, screen } from '@testing-library/react';
import selectEvent from 'react-select-event';
import { renderWithHookForm } from 'Utils/helpers/tests/render';
import Select from './Select';

const onSubmit = jest.fn();
const OPTIONS = [
  { label: 'Test1', value: 'test1' },
  { label: 'Test2', value: 'test2' },
];

function setup(props = {}) {
  const renderResult = renderWithHookForm(
    ({ control }) => (
      <Select
        label="Test"
        name="test"
        options={OPTIONS}
        control={control}
        placeholder="Test placeholder"
        {...props}
      />
    ),
    onSubmit,
  );
  const select = screen.getByLabelText('Test');

  return [select, renderResult] as const;
}

afterEach(jest.clearAllMocks);

describe('Select', () => {
  it('should be select item', async () => {
    const [select] = setup();

    act(() => selectEvent.openMenu(select));
    await act(async () => await selectEvent.select(select, 'Test2'));
    screen.getByText('Test2');
  });

  it('should be disabled', async () => {
    const [select] = setup({ isDisabled: true });
    expect(select).toBeDisabled();
  });
});
