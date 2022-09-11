import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import { MainDropdown } from 'Components';
import { BatmanIcon } from 'Components/svg';
import { HiddenTitle, TextWithLineClamp } from 'Components/text';
import { ROOT_ROUTES } from 'Utils/constants/routes';
import { logOut } from 'Utils/helpers/auth';

function ProfileDropdown() {
  const navigate = useNavigate();

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

  return (
    <Root>
      <HiddenTitle level={2}>Profile control dropdown</HiddenTitle>

      <AvatarWrapper>
        <BatmanIcon />
      </AvatarWrapper>

      <MainDropdown
        renderTrigger={toggleDropdown => (
          <TriggerButton onClick={toggleDropdown}>
            <TextWithLineClamp>Bruce Wayne</TextWithLineClamp>
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
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 180px;
`;

const AvatarWrapper = styled.div`
  flex-shrink: 0;
  margin: 0 10px 0 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid var(--red4);
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
    display: inline-block;
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
