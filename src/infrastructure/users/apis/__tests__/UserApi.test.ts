/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("@/shared/lib/supabase/client", async () => {
  const mod = await import("./__mocks__/supabaseClient.mock");
  return { supabase: mod.createSupabaseMock() };
});

import { supabase } from "@/shared/lib/supabase/client";
import { UserApi } from "../UserApi";
import { PAGE_SIZE } from "@/shared/constants/PageSize";

describe("UserApi", () => {
  beforeEach(() => {
    (supabase as any).__reset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("fetchUsers", () => {
    it("builds query, paginates and maps rows", async () => {
      (supabase as any).__setNextResult({
        data: [
          {
            id: "1",
            name: "Ana",
            email: "a@a.com",
            created_at: "2025-01-01T00:00:00Z",
          },
        ],
        count: 1,
        error: null,
      });

      const res = await UserApi.fetchUsers({ page: 2 });

      const state = (supabase as any).__getLast();
      expect(state.table).toBe("Users");
      expect(state.selectArgs[0]).toEqual(["*", { count: "exact" }]);
      expect(state.eqArgs[0]).toEqual(["status", "active"]);
      expect(state.orderArgs[0]).toEqual(["created_at", { ascending: false }]);
      expect(state.rangeArgs[0]).toEqual([
        (2 - 1) * PAGE_SIZE,
        2 * PAGE_SIZE - 1,
      ]);
      expect(state.orArg).toBeNull();

      expect(res.total).toBe(1);
      expect(res.users).toEqual([
        { id: "1", fullName: "Ana", email: "a@a.com" },
      ]);
    });

    it("adds OR ilike when search is provided", async () => {
      (supabase as any).__setNextResult({ data: [], count: 0, error: null });

      await UserApi.fetchUsers({ page: 1, search: "ana" });

      const state = (supabase as any).__getLast();
      expect(state.orArg).toBe("name.ilike.%ana%,email.ilike.%ana%");
    });

    it("falls back to rows.length when count is null", async () => {
      (supabase as any).__setNextResult({
        data: [
          {
            id: "1",
            name: "Ana",
            email: "a@a.com",
            created_at: "2025-01-01T00:00:00Z",
          },
          {
            id: "2",
            name: "Luis",
            email: "l@a.com",
            created_at: "2025-01-02T00:00:00Z",
          },
        ],
        count: null,
        error: null,
      });

      const res = await UserApi.fetchUsers({ page: 1 });
      expect(res.total).toBe(2);
    });

    it("throws formatted error when supabase returns error", async () => {
      (supabase as any).__setNextResult({
        data: null,
        count: null,
        error: { message: "boom" },
      });

      await expect(UserApi.fetchUsers({ page: 1 })).rejects.toThrow(
        "Error fetching users: boom"
      );
    });
  });

  describe("createUser", () => {
    it("signs up and inserts mapped payload", async () => {
      vi.stubEnv("VITE_SUPABASE_DEFAULT_PASSWORD", "secret");
      (supabase as any).auth.signUp.mockResolvedValue({
        data: { user: { id: "uid-1" } },
        error: null,
      });
      (supabase as any).__setNextResult({ error: null });

      await UserApi.createUser({ fullName: "Ana", email: "ana@example.com" });

      expect((supabase as any).auth.signUp).toHaveBeenCalledWith({
        email: "ana@example.com",
        password: "secret",
      });

      const state = (supabase as any).__getLast();
      expect(state.table).toBe("Users");
      expect(state.insertPayload).toEqual({
        id: "uid-1",
        name: "Ana",
        email: "ana@example.com",
      });
    });

    it("throws when signUp returns error", async () => {
      vi.stubEnv("VITE_SUPABASE_DEFAULT_PASSWORD", "secret");
      (supabase as any).auth.signUp.mockResolvedValue({
        data: { user: null },
        error: { message: "auth down" },
      });

      await expect(
        UserApi.createUser({ fullName: "Ana", email: "ana@example.com" })
      ).rejects.toThrow("Error creating auth user: auth down");
    });

    it("throws when signUp succeeds without user", async () => {
      vi.stubEnv("VITE_SUPABASE_DEFAULT_PASSWORD", "secret");
      (supabase as any).auth.signUp.mockResolvedValue({
        data: { user: null },
        error: null,
      });

      await expect(
        UserApi.createUser({ fullName: "Ana", email: "ana@example.com" })
      ).rejects.toThrow("Error creating auth user: no authUser.user");
    });

    it("throws when insert returns error", async () => {
      vi.stubEnv("VITE_SUPABASE_DEFAULT_PASSWORD", "secret");
      (supabase as any).auth.signUp.mockResolvedValue({
        data: { user: { id: "uid-1" } },
        error: null,
      });
      (supabase as any).__setNextResult({ error: { message: "db down" } });

      await expect(
        UserApi.createUser({ fullName: "Ana", email: "ana@example.com" })
      ).rejects.toThrow("Error creating user: db down");
    });
  });

  describe("updateUser", () => {
    it("updates with mapped payload and filters by id", async () => {
      (supabase as any).__setNextResult({ error: null });

      await UserApi.updateUser({ fullName: "New Name" }, "1");

      const state = (supabase as any).__getLast();
      expect(state.updatePayload).toEqual({ name: "New Name" });
      expect(state.eqArgs[state.eqArgs.length - 1]).toEqual(["id", "1"]);
    });

    it("throws when update returns error", async () => {
      (supabase as any).__setNextResult({
        error: { message: "update failed" },
      });

      await expect(UserApi.updateUser({ fullName: "X" }, "1")).rejects.toThrow(
        "Error updating users: update failed"
      );
    });
  });

  describe("deleteUser", () => {
    it("soft deletes by setting status disabled and filters by id", async () => {
      (supabase as any).__setNextResult({ error: null });

      await UserApi.deleteUser("5");

      const state = (supabase as any).__getLast();
      expect(state.updatePayload).toEqual({ status: "disabled" });
      expect(state.eqArgs[state.eqArgs.length - 1]).toEqual(["id", "5"]);
    });

    it("throws when delete update returns error", async () => {
      (supabase as any).__setNextResult({
        error: { message: "cannot delete" },
      });

      await expect(UserApi.deleteUser("5")).rejects.toThrow(
        "Error deleting users: cannot delete"
      );
    });
  });
});
