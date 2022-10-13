import styled, { css } from 'styled-components/macro';
import { MainDropdown } from 'Components';
import { Loader } from 'Components';
import { NotificationIcon } from 'Components/svg';
import { HiddenTitle } from 'Components/text';
import { useAppSelector } from 'Hooks';
import { hasUnreadedNotifications } from 'Store/features/notifications/notifications.selectors';
import {
  useGetNotificationsQuery,
  useReadAllNotificationsMutation,
} from 'Store/features/notifications/notifications.slice';
import { NotificationItem } from './components';

const DROPDOWN_CSS = {
  right: 3,
  width: 300,
};

function Notifications() {
  const { data: notificationsState, isLoading: isNotificationsLoading } =
    useGetNotificationsQuery();
  const [readAllNotifications] = useReadAllNotificationsMutation();

  const hasUnreaded = useAppSelector(hasUnreadedNotifications);

  function readNotifications() {
    if (hasUnreaded) {
      readAllNotifications();
    }
  }

  const notificationIds = notificationsState?.ids || [];
  const revertedNotificationsIds = notificationIds.slice().reverse();
  const isDisabledTriggerButton = !notificationIds.length;

  return (
    <Root>
      <HiddenTitle level={2}>Notifications</HiddenTitle>

      {isNotificationsLoading ? (
        <Loader />
      ) : (
        <MainDropdown
          dropdownWrapperCSS={DROPDOWN_CSS}
          onClose={readNotifications}
          renderTrigger={toggleDropdown => (
            <TriggerButton
              onClick={toggleDropdown}
              disabled={isDisabledTriggerButton}
              $hasUnreaded={hasUnreaded}>
              <NotificationIcon />
            </TriggerButton>
          )}
          renderDropdown={() => (
            <ul>
              {revertedNotificationsIds.map(id => (
                <NotificationItem key={id} id={id} />
              ))}
            </ul>
          )}
        />
      )}
    </Root>
  );
}

const Root = styled.article`
  margin: 0 15px 0 0;
`;

const unreadedMark = css`
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
`;

const TriggerButton = styled.button<{ $hasUnreaded: boolean }>`
  position: relative;
  padding: 5px;
  width: 50px;
  height: 50px;
  transition: 0.3s ease-out;

  &:hover[disabled='false'] {
    transform: scale(1.1);
  }

  ${({ $hasUnreaded }) => $hasUnreaded && unreadedMark}
`;

export default Notifications;
