import type { User } from "../entities/User";

export interface UserRepository {
  fetchUsers: () => Promise<User[]>;
  //fetchUserById: (id: string) => Promise<User>;
  //createUser: (user: Exclude<User, "id">) => Promise<void>;
  //updateUser: (user: User) => Promise<void>;
  //deleteUser: (id: string) => Promise<void>;
}
