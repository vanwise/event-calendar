export interface Event {
  id: number;
  title: string;
  description: string;
  tagId: string;
  startDateISO: string;
  endDateISO: string;
}

export interface EventTag {
  id: string;
  title: string;
}
