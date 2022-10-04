import { useEffect } from 'react';
import { useCreateNotificationSubscriptionMutation } from 'Store/features/subscriptions/subscriptions.slice';
import { useGetUserQuery } from 'Store/features/users/users.slice';
import { config } from 'Utils/constants/config';

function useNotificationSubscription() {
  const { data: user } = useGetUserQuery();
  const [
    createSubscription,
    { isUninitialized: isCreateSubscriptionUninitialized },
  ] = useCreateNotificationSubscriptionMutation();

  useEffect(() => {
    async function activatePushNotifications() {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: config.PUBLIC_VAPID_KEY,
      });
      const hasUserSubscription = user?.notificationSubscriptions.some(
        endpoint => subscription.endpoint === endpoint,
      );

      if (!hasUserSubscription) {
        createSubscription(subscription);
      }
    }

    if (
      'Notification' in window &&
      !(Notification.permission === 'denied') &&
      'serviceWorker' in navigator &&
      user &&
      isCreateSubscriptionUninitialized
    ) {
      Notification.requestPermission().then(activatePushNotifications);
    }
  }, [createSubscription, user, isCreateSubscriptionUninitialized]);
}

export default useNotificationSubscription;
