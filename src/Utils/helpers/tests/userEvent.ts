import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

type UserEvent = typeof userEvent;

function getEvent(key: string) {
  const eventKey = key as keyof UserEvent;
  const callEvent = userEvent[eventKey];

  async function callEventWithAct(...args: Parameters<typeof callEvent>) {
    await act(async () => {
      // eslint-disable-next-line
      // @ts-ignore
      await callEvent(...args);
    });
  }

  return [eventKey, callEventWithAct];
}

export const userEventWithAct = Object.fromEntries(
  Object.keys(userEvent).map(getEvent),
) as UserEvent;
