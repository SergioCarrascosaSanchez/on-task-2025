import { describe, it, expect, expectTypeOf } from "vitest";
import type { UserToUpdate } from "@/domain/users/types/UserToUpdate";
import { mapUserToUpdateToUpdateUserDto } from "../mapUserToUpdateToUpdateUserDto";
import type { UpdateUserDTO } from "../../dtos/UpdateUserDTO";

describe("mapUserToUpdateToUpdateUserDto", () => {
  it("maps fullName to name", () => {
    const input: UserToUpdate = { fullName: "Ana Lopez" };
    const dto = mapUserToUpdateToUpdateUserDto(input);
    expect(dto).toEqual({ name: "Ana Lopez" });
  });

  it("does not mutate input", () => {
    const input: UserToUpdate = { fullName: "John Doe" };
    const clone = { ...input };
    mapUserToUpdateToUpdateUserDto(input);
    expect(input).toEqual(clone);
  });

  it("returns the correct DTO type", () => {
    expectTypeOf(
      mapUserToUpdateToUpdateUserDto
    ).returns.toEqualTypeOf<UpdateUserDTO>();
  });
});
