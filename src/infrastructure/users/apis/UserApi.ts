import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import { supabase } from "@/shared/lib/supabase/client";
import { mapUserDtoToUser } from "../mappers/mapUserDtoToUser";

export const UserApi: UserRepository = {
  async fetchUsers() {
    const { data, error } = await supabase.from("Users").select();

    if (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }

    if (!data) return [];

    return data.map(mapUserDtoToUser);
  },
};
