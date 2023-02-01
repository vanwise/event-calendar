import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithHookForm } from 'Utils/helpers/tests/render';
import Input from './Input';

const onSubmit = jest.fn();

function setup(props = {}) {
  const renderResult = renderWithHookForm(
    ({ register, formState: { errors } }) => (
      <Input
        name="test"
        label="Test"
        errors={errors}
        register={register}
        {...props}
      />
    ),
    onSubmit,
  );
  const input = screen.getByRole('textbox', { name: 'Test' });

  return [input, renderResult] as const;
}

afterEach(jest.clearAllMocks);

describe('Input', () => {
  it('should be possible to type', async () => {
    const [input] = setup();

    await userEvent.type(input, 'Test text');
    screen.getByDisplayValue('Test text');
  });

  it('should be disabled', async () => {
    const [input] = setup({ registerOptions: { disabled: true } });

    expect(input).toBeDisabled();
    await userEvent.type(input, 'Test text');
    expect(screen.queryByDisplayValue('Test text')).toBeNull();
  });
});
