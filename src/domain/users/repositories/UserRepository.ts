import type { User } from "../entities/User";
import type { UserToCreate } from "../types/UserToCreate";

export interface UserRepository {
  fetchUsers: () => Promise<User[]>;
  //fetchUserById: (id: string) => Promise<User>;
  createUser: (user: UserToCreate) => Promise<void>;
  //updateUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}
