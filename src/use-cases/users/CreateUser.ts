import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import type { UserToCreate } from "@/domain/users/types/UserToCreate";

export const CreateUser =
  (repo: UserRepository, user: UserToCreate) => async () => {
    const users = await repo.createUser(user);
    return users;
  };
