import { useCallback } from 'react';
import styled, { css } from 'styled-components/macro';
import { Loader, MainDropdown } from 'Components/common';
import { NotificationIcon } from 'Components/svg';
import { HiddenTitle } from 'Components/text';
import { useAppSelector } from 'Hooks';
import { hasUnreadedNotifications } from 'Store/features/notifications/notifications.selectors';
import {
  useGetNotificationsQuery,
  useReadAllNotificationsMutation,
} from 'Store/features/notifications/notifications.slice';
import { NotificationItem } from './components';

type NotificationsProps = WithClassName;

const DROPDOWN_CSS = {
  right: 3,
  width: 300,
};

function Notifications({ className }: NotificationsProps) {
  const { data: notificationsState, isLoading: isNotificationsLoading } =
    useGetNotificationsQuery();
  const [readAllNotifications] = useReadAllNotificationsMutation();

  const hasUnreaded = useAppSelector(hasUnreadedNotifications);

  const readNotifications = useCallback(() => {
    if (hasUnreaded) {
      readAllNotifications();
    }
  }, [hasUnreaded, readAllNotifications]);

  const notificationIds = notificationsState?.ids || [];
  const revertedNotificationsIds = notificationIds.slice().reverse();
  const isDisabledTriggerButton = !notificationIds.length;

  return (
    <article className={className}>
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
              title="Show notifications"
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
    </article>
  );
}

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
