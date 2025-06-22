import type { UserToCreate } from "@/domain/users/types/UserToCreate";
import type { CreateUserDTO } from "../dtos/CreateUserDTO";

export function mapUserToCreateToCreateUserDto(
  user: UserToCreate,
  id: string
): CreateUserDTO {
  return {
    id: id,
    name: user.fullName,
    email: user.email,
  };
}
