import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import type { UsersListParams } from "@/domain/users/types/UsersListParams ";
import { UserApi } from "@/infrastructure/users/apis/UserApi";
import { GetUsers } from "@/use-cases/users/GetUsers";
import { useQuery } from "@tanstack/react-query";

export function useUsers(
  repo: UserRepository = UserApi,
  params?: UsersListParams
) {
  const getUsers = GetUsers(repo);
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
    placeholderData: (prev) => prev,
  });
}
