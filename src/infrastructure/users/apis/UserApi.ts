import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import { supabase } from "@/shared/lib/supabase/client";
import { mapUserDtoToUser } from "../mappers/mapUserDtoToUser";
import { mapUserToCreateToCreateUserDto } from "../mappers/mapUserToCreateToCreateUserDto";
import { mapUserToUpdateToUpdateUserDto } from "../mappers/mapUserToUpdateToUpdateUserDto";
import { mapUserListParamsToApiQuery } from "../mappers/mapUserListParamsToApiQuery";

export const UserApi: UserRepository = {
  async fetchUsers(params) {
    const { from, to, search } = mapUserListParamsToApiQuery(params);

    let query = supabase
      .from("Users")
      .select("*", { count: "exact" })
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }

    const rows = data ?? [];
    return {
      total: count ?? rows.length,
      users: rows.map(mapUserDtoToUser),
    };
  },
  async createUser(user) {
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
  async deleteUser(id: string) {
    const { error } = await supabase
      .from("Users")
      .update({ status: "disabled" })
      .eq("id", id);

    if (error) {
      throw new Error(`Error deleting users: ${error.message}`);
    }
  },
  async updateUser(user, id) {
    const { error } = await supabase
      .from("Users")
      .update(mapUserToUpdateToUpdateUserDto(user))
      .eq("id", id);

    if (error) {
      throw new Error(`Error updating users: ${error.message}`);
    }
  },
};
