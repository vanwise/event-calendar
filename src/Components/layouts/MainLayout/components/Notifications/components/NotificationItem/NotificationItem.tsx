import styled from 'styled-components/macro';
import { EntityId } from '@reduxjs/toolkit';
import { useAppSelector } from 'Hooks';
import { selectNotificationById } from 'Store/features/notifications/notifications.selectors';
import { getNotificationStartDate } from './NotificationItem.utils';

interface NotificationItemProps {
  id: EntityId;
}

function NotificationItem({ id }: NotificationItemProps) {
  const notification = useAppSelector(state =>
    selectNotificationById(state, id),
  );

  if (!notification) {
    return null;
  }

  const { title, body, isRead, startDateISO } = notification;

  return (
    <Root $isRead={isRead}>
      <h3>{title}</h3>
      <p>{body}</p>
      <StartDate>{getNotificationStartDate(startDateISO)}</StartDate>
    </Root>
  );
}

const Root = styled.li<{ $isRead: boolean }>`
  position: relative;
  padding: 5px 10px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--gray6);
  }

  ${({ $isRead }) => !$isRead && 'background: var(--violet2);'}
`;

const StartDate = styled.time`
  color: var(--gray4);
  text-transform: capitalize;
`;

export default NotificationItem;
