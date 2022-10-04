import { store } from 'Store/config';
import { notificationsApi } from 'Store/features/notifications/notifications.slice';
import { SW_MESSAGE_TYPE } from 'Types/serviceWorker';

export function handlePushNotification() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.addEventListener('message', ({ data }) => {
    if (data.type === SW_MESSAGE_TYPE.NOTIFICATION_READING) {
      const notificationId = data.notificationId;
      store.dispatch(
        notificationsApi.endpoints.readNotification.initiate(notificationId),
      );
    } else if (data.type === SW_MESSAGE_TYPE.NOTIFICATION_REFETCHING) {
      store.dispatch(
        notificationsApi.endpoints.getNotifications.initiate(undefined, {
          forceRefetch: true,
        }),
      );
    }
  });
}
