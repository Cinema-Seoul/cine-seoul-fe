import type { User } from "@/types/user";

export type SignInApiResponse = {
  user: User;
  accessToken: string;
};