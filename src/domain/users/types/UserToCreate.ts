import type { User } from "../entities/User";

export type UserToCreate = Omit<User, "id" | "created_at">;
