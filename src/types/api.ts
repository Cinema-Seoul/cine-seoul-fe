export type ListResponse<T> = {
  list: T[];
  totalPages: number;
};

export type EntResponse<T = any> = {
  body: T;
  statusCode: string;
  statusCodeValue: number;
};

export enum Is {
  True = "Y",
  False = "N",
}

export const nameIs: Record<Is, string> = {
  [Is.True]: "참",
  [Is.False]: "거짓",
};
