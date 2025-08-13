import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import { describe, expect, it, vi } from "vitest";
import { DeleteUser } from "../DeleteUser";
import type { User } from "@/domain/users/entities/User";

const MockUser: User = {
  fullName: "John Doe",
  email: "john-doe@email.com",
  id: "test-id",
};

describe("Delete User use case", () => {
  it("should call the api function with correct params", async () => {
    const deleteUserFn = vi.fn();
    const mockApi: UserRepository = {
      deleteUser: deleteUserFn,
      fetchUsers: vi.fn(),
      updateUser: vi.fn(),
      createUser: vi.fn(),
    };

    await DeleteUser(mockApi, MockUser)();
    expect(deleteUserFn).toHaveBeenCalledOnce();
    expect(deleteUserFn).toBeCalledWith(MockUser.id);
  });
});
