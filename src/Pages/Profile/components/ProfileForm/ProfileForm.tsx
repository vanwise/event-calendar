import styled from 'styled-components/macro';
import { UseFormReset } from 'react-hook-form';
import { SectionForm } from 'Components/forms';
import { Input } from 'Components/inputs';
import { ToastService } from 'Services';
import {
  UpdatedUser,
  useUpdateUserMutation,
} from 'Store/features/users/users.slice';
import { User } from 'Types/api';
import { getResettingOnBlur } from 'Utils/helpers/form';
import { combineValidations, getValidations } from 'Utils/helpers/validation';

interface ProfileFormProps {
  user: User;
}
type ProfileFormValuesBase = UpdatedUser;
type ProfileFormValues = Partial<ProfileFormValuesBase>;

const requiredValidation = getValidations(['required']);

function ProfileForm({ user }: ProfileFormProps) {
  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();

  const defaultValues = {
    email: user.email,
    lastName: user.lastName,
    firstName: user.firstName,
  };

  function handleFormSumbit(
    values: ProfileFormValues,
    resetForm: UseFormReset<ProfileFormValues>,
  ) {
    return updateUser(values)
      .unwrap()
      .then(newUser => {
        const newDefaultValues = Object.fromEntries(
          Object.keys(defaultValues).map(key => {
            const userKey = key as keyof User;
            return [userKey, newUser[userKey]];
          }),
        );

        ToastService.success('Success updating user');
        resetForm(newDefaultValues);
      });
  }

  return (
    <SectionForm
      title="Change profile"
      onSubmit={handleFormSumbit}
      formProps={{ defaultValues }}
      isLoading={isUpdateUserLoading}
      buttonText="Update profile"
      renderFields={({
        register,
        setValue,
        formState: { errors: formErrors },
      }) => {
        const resettingOnBlur = getResettingOnBlur(setValue, defaultValues);

        return (
          <Wrapper>
            <Input
              name="firstName"
              label="First name"
              errors={formErrors}
              register={register}
              registerOptions={combineValidations(
                requiredValidation,
                resettingOnBlur,
              )}
            />
            <Input
              name="lastName"
              label="Last name"
              errors={formErrors}
              register={register}
            />
            <Input
              name="email"
              label="Email"
              errors={formErrors}
              register={register}
              placeholder="Enter email"
              registerOptions={combineValidations(
                getValidations(['email']),
                resettingOnBlur,
              )}
            />
          </Wrapper>
        );
      }}
    />
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin: 0 0 40px;
`;

export default ProfileForm;
