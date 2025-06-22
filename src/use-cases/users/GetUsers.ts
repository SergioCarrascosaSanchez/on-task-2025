import type { UserRepository } from "@/domain/users/repositories/UserRepository";

export const GetUsers = (repo: UserRepository) => async () => {
  const users = await repo.fetchUsers();
  return users;
};
