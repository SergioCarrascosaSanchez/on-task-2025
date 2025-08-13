import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import { describe, expect, it, vi } from "vitest";
import { GetUsers } from "../GetUsers";
import type { User } from "@/domain/users/entities/User";

const MockUsers: User[] = [
  {
    fullName: "John Doe",
    email: "john-doe@email.com",
    id: "test-id",
  },
  {
    fullName: "Jane Doe",
    email: "jane-doe@email.com",
    id: "test-id-2",
  },
];

describe("Get User use case", () => {
  it("should call the api function with correct params and return the correct data", async () => {
    const getUsersFn = vi.fn();
    getUsersFn.mockReturnValue({
      total: MockUsers.length,
      users: MockUsers,
    });
    const mockApi: UserRepository = {
      fetchUsers: getUsersFn,
      updateUser: vi.fn(),
      createUser: vi.fn(),
      deleteUser: vi.fn(),
    };

    const users = await GetUsers(mockApi)();
    expect(getUsersFn).toHaveBeenCalledOnce();

    expect(users.users).toHaveLength(2);
    expect(users.users[0]).toEqual(MockUsers[0]);
    expect(users.users[1]).toEqual(MockUsers[1]);
    expect(users.total).toEqual(MockUsers.length);
  });
});
