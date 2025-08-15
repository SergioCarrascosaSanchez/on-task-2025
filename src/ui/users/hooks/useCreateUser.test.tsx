import { describe, it, expect, vi } from "vitest";
import { act } from "@testing-library/react";
import toast from "react-hot-toast";
import { renderHookWithProviders } from "@/shared/test/utils/renderHookWrapper";
import { useCreateUser } from "@/ui/users/hooks/useCreateUser";
import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import type { UserToCreate } from "@/domain/users/types/UserToCreate";

vi.mock("react-hot-toast", () => ({
  default: { success: vi.fn(), error: vi.fn() },
  success: vi.fn(),
  error: vi.fn(),
}));

const okRepo: UserRepository = {
  fetchUsers: vi.fn(),
  createUser: vi
    .fn()
    .mockResolvedValue({ id: "1", fullName: "John", email: "john@acme.com" }),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
};

const failRepo: UserRepository = {
  fetchUsers: vi.fn(),
  createUser: vi.fn().mockRejectedValue(new Error("fail")),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
};

describe("useCreateUser", () => {
  it("should render success toast", async () => {
    const { result, queryClient } = renderHookWithProviders(() =>
      useCreateUser(okRepo)
    );
    await act(async () => {
      await result.current.mutateAsync({
        user: { fullName: "John", email: "john@acme.com" } as UserToCreate,
      });
    });
    const calls = queryClient.getMutationCache().getAll();
    expect(calls.length).toBeGreaterThan(0);
    expect(toast.success).toHaveBeenCalledWith("User created");
  });

  it("should render error toast", async () => {
    const { result } = renderHookWithProviders(() => useCreateUser(failRepo));
    await act(async () => {
      await result.current
        .mutateAsync({
          user: { fullName: "Jane", email: "jane@acme.com" } as UserToCreate,
        })
        .catch(() => {});
    });
    expect(toast.error).toHaveBeenCalledWith("Error creating user");
  });
});
