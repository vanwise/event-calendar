import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { User } from 'Types/api';
import { renderWithStore } from 'Utils/helpers/tests';
import ProfileForm from './ProfileForm';

const mockUser: User = {
  id: 'test',
  firstName: 'first',
  lastName: 'last',
  email: 'test@gmail.com',
  login: '',
  notificationSubscriptions: ['test'],
  createdAt: '',
  updatedAt: '',
};
const mockUpdateUser = jest.fn();

jest.mock('Store/features/users/users.slice', () => ({
  ...jest.requireActual('Store/features/users/users.slice'),
  useUpdateUserMutation() {
    function updateUser() {
      return {
        unwrap() {
          mockUpdateUser();
          return Promise.reject({ data: {} });
        },
      };
    }
    return [updateUser, { isLoading: false }];
  },
}));

function setup(props = {}) {
  const renderResult = renderWithStore(
    <ProfileForm user={mockUser} {...props} />,
  );
  return renderResult;
}

afterEach(jest.clearAllMocks);

describe('Profile Form', () => {
  it('should be submitted', async () => {
    setup();

    const firstNameInput = screen.getByRole('textbox', { name: 'First name' });
    const lastNameInput = screen.getByRole('textbox', { name: 'Last name' });
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const submitButton = screen.getByRole('button', { name: 'Update profile' });

    await act(async () => {
      await userEvent.clear(firstNameInput);
      await userEvent.type(firstNameInput, 'changed first');
      await userEvent.clear(lastNameInput);
      await userEvent.type(lastNameInput, 'changed last');
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, 'changed@gmail.com');
      await userEvent.click(submitButton);
    });

    expect(mockUpdateUser).toBeCalledTimes(1);
  });
});
