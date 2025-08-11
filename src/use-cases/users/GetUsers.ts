import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import type { UsersListParams } from "@/domain/users/types/UsersListParams ";

export const GetUsers =
  (repo: UserRepository) => async (params?: UsersListParams) => {
    const users = await repo.fetchUsers(params);
    return users;
  };
