export type EventListEntry = {
  banner: string;
  contents: string;
  createdAt: Date;
  endAt: Date;
  eventNum: 0;
  image: string;
  startAt: Date;
  title: string;
  userId: string;
  views: 0;
};

export type EventDetail = {
  banner: string;
  contents: string;
  createdAt: Date;
  endAt: Date;
  eventNum: 0;
  image: string;
  startAt: Date;
  title: string;
  userId: string;
  views: 0;
};

export type EventCreation = {
  banner: string;
  contents: string;
  endAt: Date;
  image: string;
  startAt: Date;
  title: string;
};

export type EventUpdating = {
  banner?: string;
  contents?: string;
  endAt?: Date;
  eventNum?: 0;
  image?: string;
  startAt?: Date;
  title?: string;
  views?: 0;
};

export type EventCurrentListEntry = {
  banner: string;
  contents: string;
  createdAt: Date;
  endAt: Date;
  eventNum: 0;
  image: string;
  startAt: Date;
  title: string;
  userId: string;
  views: 0;
};
