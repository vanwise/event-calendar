/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { SW_MESSAGE_TYPE } from 'Types/serviceWorker';

declare const self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

function sendMessageToClient(
  type: SW_MESSAGE_TYPE,
  message: Record<string, any> | null = null,
) {
  self.clients.matchAll().then(clients => {
    if (clients && clients.length) {
      clients[0].postMessage({ ...message, type });
    }
  });
}

self.addEventListener('push', e => {
  try {
    const parsedData = e.data?.json();
    if (parsedData) {
      self.registration.showNotification(parsedData.title, {
        body: parsedData.body,
        icon: parsedData.icon,
        data: parsedData.data,
      });

      sendMessageToClient(SW_MESSAGE_TYPE.NOTIFICATION_REFETCHING);
    }
  } catch (e) {
    throw new Error(e as string);
  }
});

self.addEventListener('notificationclick', e => {
  const notificationId = e.notification.data?.notificationId;

  if (notificationId) {
    sendMessageToClient(SW_MESSAGE_TYPE.NOTIFICATION_READING, {
      notificationId,
    });
  }
});
