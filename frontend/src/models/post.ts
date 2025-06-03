import type { User } from "./user";

export interface Post {
  userId: User["id"];
  id: number;
  title: string;
  body: string;
  imageUrl: string;
}
