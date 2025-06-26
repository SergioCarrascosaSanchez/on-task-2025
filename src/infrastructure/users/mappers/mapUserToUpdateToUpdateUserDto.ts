import type { UserToUpdate } from "@/domain/users/types/UserToUpdate";
import type { UpdateUserDTO } from "../dtos/UpdateUserDTO";

export function mapUserToUpdateToUpdateUserDto(
  user: UserToUpdate
): UpdateUserDTO {
  return {
    name: user.fullName,
  };
}
