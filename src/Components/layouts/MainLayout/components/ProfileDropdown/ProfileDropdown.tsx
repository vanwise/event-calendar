import styled from 'styled-components/macro';
import { useNavigate } from 'react-router-dom';
import MainDropdown from 'Components/MainDropdown';
import { BatmanIcon } from 'Components/svg';
import { ROUTES } from 'Utils/constants/routes';

function ProfileDropdown() {
  const navigate = useNavigate();

  function onProfileClick(closeDropdown: () => void) {
    navigate(ROUTES.PROFILE_PATH);
    closeDropdown();
  }

  return (
    <Root>
      <AvatarWrapper>
        <BatmanIcon />
      </AvatarWrapper>
      <MainDropdown
        renderTrigger={toggleDropdown => (
          <TriggerButton className="text-line-clamp-1" onClick={toggleDropdown}>
            Bruce Wayne
          </TriggerButton>
        )}
        renderDropdown={closeDropdown => (
          <Dropdown>
            <TextButton onClick={() => onProfileClick(closeDropdown)}>
              Profile
            </TextButton>
            <TextButton>Logout</TextButton>
          </Dropdown>
        )}
      />
    </Root>
  );
}

const Root = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 180px;
`;

const AvatarWrapper = styled.div`
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
  color: var(--black3);

  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 6px);
    right: 3px;
    border: solid var(--black3);
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(45deg);
  }
`;

const Dropdown = styled.div`
  display: grid;
  grid-gap: 10px 0;
  padding: 10px;
`;

const TextButton = styled.button`
  font-weight: 500;
`;

export default ProfileDropdown;
