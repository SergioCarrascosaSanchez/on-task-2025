import type { User } from "@/domain/users/entities/User";
import type { UserDTO } from "../dtos/UserDTO";

export function mapUserDtoToUser(dto: UserDTO): User {
  return {
    id: dto.id,
    fullName: dto.name,
    email: dto.email,
  };
}
