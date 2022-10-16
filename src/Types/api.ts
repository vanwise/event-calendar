export interface Event {
  id: string;
  title: string;
  description?: string;
  tagId: string;
  startDateISO: string;
  endDateISO: string;
  notificationId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface EventTag {
  id: string;
  title: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  login: string;
  notificationSubscriptions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserNotification {
  id: string;
  startDateISO: string;
  title: string;
  body: string;
  data: any;
  isRead: boolean;
}
