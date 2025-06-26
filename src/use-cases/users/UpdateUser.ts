import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import type { UserToUpdate } from "@/domain/users/types/UserToUpdate";

export const UpdateUser =
  (repo: UserRepository, user: UserToUpdate, id: string) => async () => {
    await repo.updateUser(user, id);
  };
