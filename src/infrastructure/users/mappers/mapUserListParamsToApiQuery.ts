import type { UsersListParams } from "@/domain/users/types/UsersListParams ";
import { PAGE_SIZE } from "@/shared/constants/PageSize";
import type { UsersListParamsDTO } from "../dtos/UsersListParamsDTO";

export function mapUserListParamsToApiQuery(
  params?: UsersListParams
): UsersListParamsDTO {
  const page = Math.max(1, params?.page ?? 1);
  return {
    from: (page - 1) * PAGE_SIZE,
    to: page * PAGE_SIZE - 1,
    search: params?.search?.trim() || undefined,
  };
}
