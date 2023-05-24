import type { User } from "@/domains/user";

export type SignInApiResponse = {
  user: User;
  accessToken: string;
};