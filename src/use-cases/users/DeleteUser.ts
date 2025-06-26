import type { User } from "@/domain/users/entities/User";
import type { UserRepository } from "@/domain/users/repositories/UserRepository";

export const DeleteUser = (repo: UserRepository, user: User) => async () => {
  await repo.deleteUser(user.id);
};
