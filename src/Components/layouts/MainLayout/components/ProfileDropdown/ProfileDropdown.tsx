import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { Loader, MainDropdown } from 'Components/common';
import { AvatarIcon } from 'Components/svg';
import { HiddenTitle, TextWithLineClamp } from 'Components/text';
import { useGetUserQuery } from 'Store/features/users/users.slice';
import { ROOT_ROUTES } from 'Utils/constants/routes';
import { logOut } from 'Utils/helpers/auth';

function ProfileDropdown() {
  const navigate = useNavigate();
  const { data: user, isLoading: isUserLoading } = useGetUserQuery();

  if (isUserLoading) {
    return <Loader />;
  } else if (!user) {
    return null;
  }

  function closeDropdownAndCallCallback(
    closeDropdown: () => void,
    callCallback?: () => void,
  ) {
    closeDropdown();
    callCallback?.();
  }

  const buttons = [
    { text: 'Profile', onClick: () => navigate(ROOT_ROUTES.PROFILE) },
    { text: 'Logout', onClick: logOut },
  ];

  const { firstName, lastName = '' } = user;

  return (
    <Root>
      <HiddenTitle level={2}>Profile control dropdown</HiddenTitle>

      <AvatarWrapper>
        <AvatarIconStylized />
      </AvatarWrapper>

      <MainDropdown
        renderTrigger={toggleDropdown => (
          <TriggerButton onClick={toggleDropdown}>
            <TextWithLineClamp>{`${firstName} ${lastName}`}</TextWithLineClamp>
          </TriggerButton>
        )}
        renderDropdown={closeDropdown => (
          <Dropdown>
            {buttons.map(({ text, onClick }) => (
              <TextButton
                key={text}
                onClick={() =>
                  closeDropdownAndCallCallback(closeDropdown, onClick)
                }>
                {text}
              </TextButton>
            ))}
          </Dropdown>
        )}
      />
    </Root>
  );
}

const Root = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 250px;
`;

const AvatarWrapper = styled.div`
  flex-shrink: 0;
  margin: 0 10px 0 0;
  padding: 2px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid var(--red4);
  overflow: hidden;
`;

const AvatarIconStylized = styled(AvatarIcon)`
  fill: var(--gray7);
`;

const TriggerButton = styled.button`
  position: relative;
  padding: 0 20px 0 0;
  font-weight: 500;
  color: var(--gray7);

  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 6px);
    right: 3px;
    border: solid var(--gray7);
    border-width: 0 3px 3px 0;
    padding: 3px;
    transform: rotate(45deg);
  }
`;

const Dropdown = styled.menu`
  display: grid;
  grid-gap: 10px 0;
  padding: 10px;
`;

const TextButton = styled.button`
  font-weight: 500;
`;

export default ProfileDropdown;
