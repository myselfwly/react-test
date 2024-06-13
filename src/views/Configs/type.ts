export type ConfigItemType = {
  id: string;
  name: string;
  timeLong: number;
  events: EventType[];
};
export type EventType = {
  id: string;
  timeCurrent: number;
  audio: string;
};
