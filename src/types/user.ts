export type UserNum = number;
export enum UserRole {
  member = "M",
  nonmember = "N",
  admin = "A",
}

export type User = {
  userNum: UserNum;
  createdAt: Date;
  id: string;
  name: string;
  phoneNum: string;
  residentNum: string;
  point: number;
  role: UserRole;
};

export type UserListEntry = User;

export type UserEditing = {
  name?: string;
  phoneNum?: string;
  pw?: string;
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
