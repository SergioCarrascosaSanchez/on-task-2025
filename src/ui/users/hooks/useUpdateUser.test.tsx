import { describe, it, expect, vi } from "vitest";
import { act } from "@testing-library/react";
import toast from "react-hot-toast";
import { renderHookWithProviders } from "@/shared/test/utils/renderHookWrapper";
import { useUpdateUser } from "@/ui/users/hooks/useUpdateUser";
import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import type { UserToUpdate } from "@/domain/users/types/UserToUpdate";

vi.mock("react-hot-toast", () => ({
  default: { success: vi.fn(), error: vi.fn() },
  success: vi.fn(),
  error: vi.fn(),
}));

const okRepo: UserRepository = {
  fetchUsers: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn().mockResolvedValue({
    id: "1",
    fullName: "John Updated",
    email: "john@acme.com",
  }),
  deleteUser: vi.fn(),
};

const failRepo: UserRepository = {
  fetchUsers: vi.fn(),
  createUser: vi.fn(),
  updateUser: vi.fn().mockRejectedValue(new Error("fail")),
  deleteUser: vi.fn(),
};

describe("useUpdateUser", () => {
  it("should render success toast", async () => {
    const { result, queryClient } = renderHookWithProviders(() =>
      useUpdateUser(okRepo)
    );
    await act(async () => {
      await result.current.mutateAsync({
        user: {
          fullName: "John Updated",
          email: "john@acme.com",
        } as UserToUpdate,
        id: "1",
      });
    });
    const calls = queryClient.getMutationCache().getAll();
    expect(calls.length).toBeGreaterThan(0);
    expect(toast.success).toHaveBeenCalledWith("User updated");
  });

  it("should render error toast", async () => {
    const { result } = renderHookWithProviders(() => useUpdateUser(failRepo));
    await act(async () => {
      await result.current
        .mutateAsync({
          user: {
            fullName: "John Updated",
            email: "john@acme.com",
          } as UserToUpdate,
          id: "1",
        })
        .catch(() => {});
    });
    expect(toast.error).toHaveBeenCalledWith(
      "An error has ocurred updating user"
    );
  });
});
