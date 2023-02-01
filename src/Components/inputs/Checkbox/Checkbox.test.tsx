import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithHookForm } from 'Utils/helpers/tests/render';
import Checkbox from './Checkbox';

const onFormSubmit = jest.fn();

function setup(props = {}) {
  const renderResult = renderWithHookForm(
    ({ register, formState: { errors } }) => (
      <Checkbox
        name="test"
        label="Test"
        errors={errors}
        register={register}
        {...props}
      />
    ),
    onFormSubmit,
  );
  const checkbox = screen.getByRole<HTMLInputElement>('checkbox', {
    name: 'Test',
  });

  return [checkbox, renderResult] as const;
}

afterEach(jest.clearAllMocks);

describe('Checkbox', () => {
  it('should be toggled', async () => {
    const [checkbox] = setup();

    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('should be disabled', async () => {
    const [checkbox] = setup({ registerOptions: { disabled: true } });

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
