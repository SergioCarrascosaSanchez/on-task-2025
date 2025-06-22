import type { UserDTO } from "./UserDTO";

export type CreateUserDTO = Omit<UserDTO, "created_at">;
