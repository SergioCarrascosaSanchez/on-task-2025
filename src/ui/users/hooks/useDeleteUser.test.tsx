import { describe, it, expect, vi } from "vitest";
import { act } from "@testing-library/react";
import toast from "react-hot-toast";
import { renderHookWithProviders } from "@/shared/test/utils/renderHookWrapper";
import { useDeleteUser } from "@/ui/users/hooks/useDeleteUser";
import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import type { User } from "@/domain/users/entities/User";

vi.mock("react-hot-toast", () => ({
  default: { success: vi.fn(), error: vi.fn() },
  success: vi.fn(),
  error: vi.fn(),
}));

const okRepo: UserRepository = {
  fetchUsers: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn().mockResolvedValue(true),
};

const failRepo: UserRepository = {
  fetchUsers: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn().mockRejectedValue(new Error("fail")),
};

const MockUser: User = {
  id: "test-id",
  fullName: "John Doe",
  email: "john-doe@email.com",
};

describe("useDeleteUser", () => {
  it("should render success toast", async () => {
    const { result, queryClient } = renderHookWithProviders(() =>
      useDeleteUser(okRepo)
    );
    await act(async () => {
      await result.current.mutateAsync({ user: MockUser });
    });
    const calls = queryClient.getMutationCache().getAll();
    expect(calls.length).toBeGreaterThan(0);
    expect(toast.success).toHaveBeenCalledWith("User deleted");
  });

  it("should render error toast", async () => {
    const { result } = renderHookWithProviders(() => useDeleteUser(failRepo));
    await act(async () => {
      await result.current.mutateAsync({ user: MockUser }).catch(() => {});
    });
    expect(toast.error).toHaveBeenCalledWith(
      "An error has ocurred deleting user"
    );
  });
});
