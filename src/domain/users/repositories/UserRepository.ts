import type { User } from "../entities/User";
import type { UserToCreate } from "../types/UserToCreate";
import type { UserToUpdate } from "../types/UserToUpdate";

export interface UserRepository {
  fetchUsers: () => Promise<User[]>;
  createUser: (user: UserToCreate) => Promise<void>;
  updateUser: (user: UserToUpdate, id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}
