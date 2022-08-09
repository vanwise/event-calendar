import styled from 'styled-components/macro';
import { MainDropdown } from 'Components';
import { NotificationIcon } from 'Components/svg';

const NOTIFICATIONS = [{ text: 'Hello' }, { text: 'Hi' }];
const DROPDOWN_CSS = {
  right: 3,
  width: 200,
  maxHeight: 200,
};

function Notifications() {
  return (
    <MainDropdownStylized
      dropdownWrapperCSS={DROPDOWN_CSS}
      renderTrigger={toggleDropdown => (
        <TriggerButton onClick={toggleDropdown}>
          <NotificationIcon />
        </TriggerButton>
      )}
      renderDropdown={() => (
        <NotificationList>
          {NOTIFICATIONS.map(({ text }) => (
            <li key={text}>{text}</li>
          ))}
        </NotificationList>
      )}
    />
  );
}

const MainDropdownStylized = styled(MainDropdown)`
  margin: 0 20px 0 0;
`;

const TriggerButton = styled.button`
  position: relative;
  padding: 5px;
  width: 50px;
  height: 50px;
  transition: 0.3s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 2px solid white;
    background-color: var(--red3);
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const NotificationList = styled.ul`
  display: grid;
  grid-gap: 10px 0;
  padding: 10px;
`;

export default Notifications;
