import styled from 'styled-components/macro';
import { UseFormReset } from 'react-hook-form';
import { SectionForm } from 'Components/forms';
import { Input, PasswordConfirmInput } from 'Components/inputs';
import { StorageService, ToastService } from 'Services';
import {
  ChangePasswordData,
  useChangePasswordMutation,
} from 'Store/features/users/users.slice';
import { omit } from 'Utils/helpers/object';
import { getValidations } from 'Utils/helpers/validation';

interface ChangePasswordFormValuesBase extends ChangePasswordData {
  passwordConfirm: string;
}
type ChangePasswordFormValues = Partial<ChangePasswordFormValuesBase>;
type SubmittedChangePasswordFormValues = ChangePasswordFormValuesBase;

const passwordValidations = getValidations([
  'required',
  {
    minLength: { value: 4 },
    maxLength: { value: 16 },
  },
]);

function ChangePasswordForm() {
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();

  function handleFormSubmit(
    values: ChangePasswordFormValues,
    resetForm: UseFormReset<ChangePasswordFormValues>,
  ) {
    const changePasswordData = omit(values, [
      'passwordConfirm',
    ]) as SubmittedChangePasswordFormValues;

    return changePassword(changePasswordData)
      .unwrap()
      .then(accessToken => {
        resetForm();
        ToastService.success('Success changing password');
        StorageService.set('access-token', accessToken);
      });
  }

  return (
    <SectionForm
      title="Change password"
      onSubmit={handleFormSubmit}
      isLoading={isChangePasswordLoading}
      buttonText="Update password"
      renderFields={({
        control,
        register,
        formState: { errors: formErrors },
      }) => (
        <Wrapper>
          <Input
            name="currentPassword"
            type="password"
            label="Current password"
            errors={formErrors}
            register={register}
            placeholder="Enter current password"
            registerOptions={passwordValidations}
          />
          <Input
            name="newPassword"
            type="password"
            label="New password"
            errors={formErrors}
            register={register}
            placeholder="Enter new password"
            registerOptions={passwordValidations}
          />
          <PasswordConfirmInput
            name="passwordConfirm"
            label="Password Confirm"
            errors={formErrors}
            control={control}
            register={register}
            passwordFieldName="newPassword"
            placeholder="Confirm new password"
          />
        </Wrapper>
      )}
    />
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px 0;
  margin: 0 0 40px;
`;

export default ChangePasswordForm;
