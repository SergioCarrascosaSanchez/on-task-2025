import type { UserDTO } from "./UserDTO";

export type UpdateUserDTO = Omit<UserDTO, "created_at" | "email" | "id">;
