export type UserNum = number;
export enum UserRole {
  member = 'M',
  nonmember = 'N',
  admin = 'D',
}

export type User = {
  userNum: UserNum;
  id: string | null;
  //password: string | null;
  name: string | null;
  // residentNum: string;
  // TODO: 성인인지 판단?
  phoneNum: string;
  point: number | null;
  role: UserRole;
};

export type UserSignInMember = {
  id: string;
  pw: string;
};

export type UserSignInNonmember = {
  id: string;
  pw: string;
  phoneNum: string;
};