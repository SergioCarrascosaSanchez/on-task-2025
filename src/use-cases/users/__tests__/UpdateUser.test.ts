import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import { describe, expect, it, vi } from "vitest";
import type { UserToUpdate } from "@/domain/users/types/UserToUpdate";
import { UpdateUser } from "../UpdateUser";

const MockUser: UserToUpdate = {
  fullName: "John Doe",
};
const mockId = "test-id";

describe("Update User use case", () => {
  it("should call the api function with correct params", async () => {
    const updateUserFn = vi.fn();
    const mockApi: UserRepository = {
      updateUser: updateUserFn,
      fetchUsers: vi.fn(),
      createUser: vi.fn(),
      deleteUser: vi.fn(),
    };

    await UpdateUser(mockApi, MockUser, mockId)();
    expect(updateUserFn).toHaveBeenCalledOnce();
    expect(updateUserFn).toBeCalledWith(MockUser, mockId);
  });
});
