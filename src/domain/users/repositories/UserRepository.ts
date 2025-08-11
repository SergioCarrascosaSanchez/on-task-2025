import type { UserListResponse } from "../types/UserListResponse";
import type { UsersListParams } from "../types/UsersListParams ";
import type { UserToCreate } from "../types/UserToCreate";
import type { UserToUpdate } from "../types/UserToUpdate";

export interface UserRepository {
  fetchUsers: (params?: UsersListParams) => Promise<UserListResponse>;
  createUser: (user: UserToCreate) => Promise<void>;
  updateUser: (user: UserToUpdate, id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}
