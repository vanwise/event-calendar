import styled from 'styled-components/macro';
import { UseFormReset } from 'react-hook-form';
import { SectionForm } from 'Components/forms';
import { Input } from 'Components/inputs';
import { StorageService, ToastService, ValidationService } from 'Services';
import { useChangePasswordMutation } from 'Store/features/users/users.slice';
import { omit } from 'Utils/helpers/object';

type ChangePasswordFormValues = ValidationService.InferType<
  typeof changePasswordValidations
>;

const changePasswordValidations = ValidationService.object({
  newPassword: ValidationService.string().password(),
  currentPassword: ValidationService.string().password(),
  passwordConfirm: ValidationService.string().passwordConfirm('newPassword'),
});

function ChangePasswordForm() {
  const [changePassword, { isLoading: isChangePasswordLoading }] =
    useChangePasswordMutation();

  function handleFormSubmit(
    values: ChangePasswordFormValues,
    resetForm: UseFormReset<ChangePasswordFormValues>,
  ) {
    const changePasswordData = omit(values, ['passwordConfirm']);

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
      validationSchema={changePasswordValidations}
      renderFields={({ register, formState: { errors: formErrors } }) => (
        <Wrapper>
          <Input
            name="currentPassword"
            type="password"
            label="Current password"
            errors={formErrors}
            register={register}
            placeholder="Enter current password"
          />
          <Input
            name="newPassword"
            type="password"
            label="New password"
            errors={formErrors}
            register={register}
            placeholder="Enter new password"
          />
          <Input
            type="password"
            name="passwordConfirm"
            label="Password Confirm"
            errors={formErrors}
            register={register}
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
