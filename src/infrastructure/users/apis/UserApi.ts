import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import { supabase } from "@/shared/lib/supabase/client";
import { mapUserDtoToUser } from "../mappers/mapUserDtoToUser";
import { mapUserToCreateToCreateUserDto } from "../mappers/mapUserToCreateToCreateUserDto";

export const UserApi: UserRepository = {
  async fetchUsers() {
    const { data, error } = await supabase.from("Users").select();

    if (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }

    if (!data) return [];

    return data.map(mapUserDtoToUser);
  },
  async createUser(user) {
    //import.meta.env.

    const { data: authUser, error: errorCreatingAuth } =
      await supabase.auth.signUp({
        email: user.email,
        password: import.meta.env.VITE_SUPABASE_DEFAULT_PASSWORD,
      });

    if (errorCreatingAuth) {
      throw new Error(`Error creating auth user: ${errorCreatingAuth.message}`);
    }

    if (!authUser.user) {
      throw new Error(`Error creating auth user: no authUser.user`);
    }

    const { error } = await supabase
      .from("Users")
      .insert(mapUserToCreateToCreateUserDto(user, authUser.user.id));

    if (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },
};
