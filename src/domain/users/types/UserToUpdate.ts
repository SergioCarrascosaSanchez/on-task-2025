import type { User } from "../entities/User";

export type UserToUpdate = Omit<User, "id" | "created_at" | "email">;
