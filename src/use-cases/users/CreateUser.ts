import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import type { UserToCreate } from "@/domain/users/types/UserToCreate";

export const CreateUser =
  (repo: UserRepository, user: UserToCreate) => async () => {
    await repo.createUser(user);
  };
