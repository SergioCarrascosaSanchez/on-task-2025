import { type User } from "@/domain/users/entities/User";
import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import { UserApi } from "@/infrastructure/users/apis/UserApi";
import { GetUsers } from "@/use-cases/users/GetUsers";
import { useQuery } from "@tanstack/react-query";

export function useUsers(api: UserRepository = UserApi) {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: GetUsers(api),
  });
}
