import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import { describe, expect, it, vi } from "vitest";
import { CreateUser } from "../CreateUser";
import type { UserToCreate } from "@/domain/users/types/UserToCreate";

const MockUser: UserToCreate = {
  fullName: "John Doe",
  email: "john-doe@email.com",
};

describe("Create User use case", () => {
  it("should call the api function with correct params", async () => {
    const createUserFn = vi.fn();
    const mockApi: UserRepository = {
      createUser: createUserFn,
      fetchUsers: vi.fn(),
      updateUser: vi.fn(),
      deleteUser: vi.fn(),
    };

    await CreateUser(mockApi, MockUser)();
    expect(createUserFn).toHaveBeenCalledOnce();
    expect(createUserFn).toBeCalledWith(MockUser);
  });
});
