export type ReviewListEntry = {
  contents: string;
  createdAt: Date;
  recommend: number;
  reviewNum: number;
  score: number;
  userId: string; //UserNum 아니고 UserId임을 유의!
};

export type ReviewCreation = {
  contents: string;
  movieNum: number;
  score: number;
};
