import styled from 'styled-components/macro';
import { Loader } from 'Components/common';
import { PageInnerLayout } from 'Components/layouts';
import { useGetUserQuery } from 'Store/features/users/users.slice';
import { ChangePasswordForm, ProfileForm } from './components';

function ProfilePage() {
  const { data: user, isLoading: isUserLoading } = useGetUserQuery();

  if (isUserLoading) {
    return <Loader hasFillWholeBlock />;
  } else if (!user) {
    return null;
  }

  return (
    <PageInnerLayout title="Profile">
      <Wrapper>
        <ProfileForm user={user} />
        <ChangePasswordForm />
      </Wrapper>
    </PageInnerLayout>
  );
}

const Wrapper = styled.article`
  display: grid;
  grid-template-columns: repeat(2, minmax(auto, 500px));
  grid-gap: 0 50px;
`;

export default ProfilePage;
