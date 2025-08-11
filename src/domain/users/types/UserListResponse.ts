import type { User } from "../entities/User";

export interface UserListResponse {
  users: User[];
  total: number;
}
