import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import yup from 'Services/ValidationService';
import { userEventWithAct } from 'Utils/helpers/tests';
import SectionForm from './SectionForm';

const onSubmit = jest.fn();

function setup(props = {}) {
  const renderResult = render(
    <SectionForm
      title="test"
      onSubmit={onSubmit}
      buttonText="Submit"
      renderFields={({ register }) => (
        <input title="test" {...register('test')} />
      )}
      {...props}
    />,
  );
  const submitButton = screen.getByRole('button', { name: 'Submit' });
  const form = screen.getByRole('form');

  return [submitButton, form, renderResult] as const;
}

describe('Section Form', () => {
  afterEach(jest.resetAllMocks);

  it('should been submitted after text input', async () => {
    const [submitButton, form] = setup();

    const input = screen.getByRole('textbox', { name: 'test' });
    await userEventWithAct.type(input, 'test');

    expect(form).toHaveFormValues({ test: 'test' });
    await userEvent.click(submitButton);
    expect(onSubmit.mock.lastCall[0]).toStrictEqual({ test: 'test' });
  });

  it('should been not submitted with empty required field', async () => {
    const validationSchema = yup.object({
      test: yup.string().required(),
    });
    const [submitButton] = setup({ validationSchema });

    await userEvent.click(submitButton);
    expect(onSubmit).not.toBeCalled();
  });

  it('should been not submitted with loading status', async () => {
    const [submitButton] = setup();

    expect(submitButton).toBeDisabled();
    await userEvent.click(submitButton);
    expect(onSubmit).not.toBeCalled();
  });
});
