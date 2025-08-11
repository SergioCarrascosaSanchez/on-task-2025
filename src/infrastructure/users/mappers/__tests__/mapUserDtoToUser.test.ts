import { describe, it, expect, expectTypeOf } from "vitest";
import { mapUserDtoToUser } from "../mapUserDtoToUser";
import type { UserDTO } from "../../dtos/UserDTO";
import type { User } from "@/domain/users/entities/User";

describe("mapUserDtoToUser", () => {
  it("maps a valid UserDTO to User", () => {
    const dto: UserDTO = {
      id: "123",
      name: "Ana Lopez",
      email: "ana@example.com",
      created_at: "2025-01-01T00:00:00Z",
    };

    const user: User = mapUserDtoToUser(dto);

    expect(user).toEqual({
      id: "123",
      fullName: "Ana Lopez",
      email: "ana@example.com",
    });
  });

  it("returns the correct User type", () => {
    expectTypeOf(mapUserDtoToUser).returns.toEqualTypeOf<User>();
  });
});
