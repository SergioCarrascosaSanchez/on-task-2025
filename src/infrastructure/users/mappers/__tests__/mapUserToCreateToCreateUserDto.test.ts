import { describe, it, expect, expectTypeOf } from "vitest";
import type { UserToCreate } from "@/domain/users/types/UserToCreate";
import { mapUserToCreateToCreateUserDto } from "../mapUserToCreateToCreateUserDto";
import type { CreateUserDTO } from "../../dtos/CreateUserDTO";

describe("mapUserToCreateToCreateUserDto", () => {
  it("maps fields and uses provided id", () => {
    const input: UserToCreate = {
      fullName: "Ana Lopez",
      email: "ana@example.com",
    };
    const dto = mapUserToCreateToCreateUserDto(input, "abc-123");
    expect(dto).toEqual({
      id: "abc-123",
      name: "Ana Lopez",
      email: "ana@example.com",
    });
  });

  it("does not mutate input", () => {
    const input: UserToCreate = {
      fullName: "John Doe",
      email: "john@example.com",
    };
    const clone = { ...input };
    mapUserToCreateToCreateUserDto(input, "id-1");
    expect(input).toEqual(clone);
  });

  it("returns the correct DTO type", () => {
    expectTypeOf(
      mapUserToCreateToCreateUserDto
    ).returns.toEqualTypeOf<CreateUserDTO>();
  });
});
