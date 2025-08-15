import { describe, it, expect, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import { renderHookWithProviders } from "@/shared/test/utils/renderHookWrapper";
import { useUsers } from "@/ui/users/hooks/useUsers";
import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import type { UserListResponse } from "@/domain/users/types/UserListResponse";

const usersPage1: UserListResponse = {
  total: 2,
  users: [
    { id: "1", fullName: "John", email: "john@acme.com" },
    { id: "2", fullName: "Jane", email: "jane@acme.com" },
  ],
};

const usersPage2: UserListResponse = {
  total: 3,
  users: [
    { id: "3", fullName: "Alice", email: "alice@acme.com" },
    { id: "4", fullName: "Bob", email: "bob@acme.com" },
    { id: "5", fullName: "Eve", email: "eve@acme.com" },
  ],
};

const baseRepo: UserRepository = {
  fetchUsers: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
};

describe("useUsers", () => {
  it("returns data from repository", async () => {
    const repo: UserRepository = {
      ...baseRepo,
      fetchUsers: vi.fn().mockResolvedValue(usersPage1),
    };

    const { result } = renderHookWithProviders(() => useUsers(undefined, repo));
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data).toEqual(usersPage1);
    expect(repo.fetchUsers).toHaveBeenCalledWith(undefined);
  });

  it("uses params in queryKey and fetch", async () => {
    const params = { page: 2, pageSize: 10, search: "a" };
    const repo: UserRepository = {
      ...baseRepo,
      fetchUsers: vi.fn().mockResolvedValue(usersPage2),
    };

    const { result } = renderHookWithProviders(() => useUsers(params, repo));
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());
    expect(result.current.data).toEqual(usersPage2);
    expect(repo.fetchUsers).toHaveBeenCalledWith(params);
  });
});
