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

export type UserCreation = {
  name: string;
  phoneNum: string;
  id: string;
  pw: string;
  residentNum: string;
  role: UserRole;
}

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
  name: string;
  pw: string;
  phoneNum: string;
};
