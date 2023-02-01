import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithStore } from 'Utils/helpers/tests';
import ChangePasswordForm from './ChangePasswordForm';

const mockChangePassword = jest.fn();

jest.mock('Store/features/users/users.slice', () => ({
  ...jest.requireActual('Store/features/users/users.slice'),
  useChangePasswordMutation() {
    function changePassword() {
      return {
        unwrap() {
          mockChangePassword();
          return Promise.reject({ data: {} });
        },
      };
    }
    return [changePassword, { isLoading: false }];
  },
}));

function setup(props = {}) {
  const renderResult = renderWithStore(<ChangePasswordForm {...props} />);
  return renderResult;
}

afterEach(jest.clearAllMocks);

describe('Profile Form', () => {
  it('should be submitted', async () => {
    setup();

    const currentPasswordInput = screen.getByLabelText('Current password');
    const newPasswordInput = screen.getByLabelText('New password');
    const passwordConfirmInput = screen.getByLabelText('Password Confirm');
    const submitButton = screen.getByRole('button', {
      name: 'Update password',
    });

    await act(async () => {
      await userEvent.clear(currentPasswordInput);
      await userEvent.type(currentPasswordInput, 'curren');
      await userEvent.clear(newPasswordInput);
      await userEvent.type(newPasswordInput, 'new_password');
      await userEvent.clear(passwordConfirmInput);
      await userEvent.type(passwordConfirmInput, 'new_password');
      await userEvent.click(submitButton);
    });

    expect(mockChangePassword).toBeCalledTimes(1);
  });
});
