import userEvent from '@testing-library/user-event';
import yup from 'Services/ValidationService';
import { renderWithRouter } from 'Utils/helpers/tests/render';
import AuthForm from './AuthForm';

const onSubmit = jest.fn();

const ROUTE_DATA = {
  url: '/',
  text: 'text',
  title: 'Title',
  linkText: 'link text',
};

function setup(props = {}) {
  const renderResult = renderWithRouter(
    <AuthForm
      onSubmit={onSubmit}
      routeData={ROUTE_DATA}
      renderInputs={({ register }) => (
        <input title="test" {...register('test')} />
      )}
      {...props}
    />,
  );
  const submitButton = renderResult.getByRole('button');

  return [submitButton, renderResult] as const;
}

afterEach(jest.clearAllMocks);

describe('Auth Form', () => {
  it('should been submitted after text input', async () => {
    const [submitButton, { getByRole }] = setup();

    const input = getByRole('textbox', { name: 'test' });
    await userEvent.type(input, 'test');

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
    const [submitButton] = setup({ isLoading: true });

    expect(submitButton).toBeDisabled();
    await userEvent.click(submitButton);
    expect(onSubmit).not.toBeCalled();
  });
});
