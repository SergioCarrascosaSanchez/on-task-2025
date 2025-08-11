import { describe, it, expect, expectTypeOf } from "vitest";
import { PAGE_SIZE } from "@/shared/constants/PageSize";
import type { UsersListParamsDTO } from "../../dtos/UsersListParamsDTO";
import { mapUserListParamsToApiQuery } from "../mapUserListParamsToApiQuery";

describe("mapUserListParamsToApiQuery", () => {
  it("defaults to page 1 when params are undefined", () => {
    const dto = mapUserListParamsToApiQuery();
    expect(dto).toEqual({
      from: 0,
      to: PAGE_SIZE - 1,
      search: undefined,
    });
  });

  it("clamps page to minimum 1", () => {
    const dto = mapUserListParamsToApiQuery({ page: 0 });
    expect(dto.from).toBe(0);
    expect(dto.to).toBe(PAGE_SIZE - 1);
  });

  it("maps page to from/to using PAGE_SIZE", () => {
    const dto = mapUserListParamsToApiQuery({ page: 2 });
    expect(dto.from).toBe(PAGE_SIZE * 1);
    expect(dto.to).toBe(PAGE_SIZE * 2 - 1);
  });

  it("trims search and passes it when non-empty", () => {
    const dto = mapUserListParamsToApiQuery({ page: 1, search: "  ana  " });
    expect(dto.search).toBe("ana");
  });

  it("sets search undefined when empty after trim", () => {
    const dto = mapUserListParamsToApiQuery({ page: 1, search: "   " });
    expect(dto.search).toBeUndefined();
  });

  it("returns the correct DTO type", () => {
    expectTypeOf(
      mapUserListParamsToApiQuery
    ).returns.toEqualTypeOf<UsersListParamsDTO>();
  });
});
