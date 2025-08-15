import type { User } from "@/domain/users/entities/User";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/shared/test/utils/renderWithProviders";
import userEvent from "@testing-library/user-event";
import { UserTableRow } from "./UserTableRow";
import { useDeleteUser } from "../hooks/useDeleteUser";

vi.mock("../hooks/useDeleteUser");

const MockUser: User = {
  fullName: "John Doe",
  email: "john-doe@email.com",
  id: "test-id",
};

describe("UserTableRow", () => {
  const mockedUseDeleteUser = vi.mocked(useDeleteUser);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render data correctly", () => {
    mockedUseDeleteUser.mockReturnValue({
      isPending: false,
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useDeleteUser>);

    render(<UserTableRow user={MockUser} />);

    expect(screen.getByText(MockUser.id)).toBeInTheDocument();
    expect(screen.getByText(MockUser.fullName)).toBeInTheDocument();
    expect(screen.getByText(MockUser.email)).toBeInTheDocument();
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  it("should call delete user when click in delete button", async () => {
    const deleteRowFn = vi.fn();
    mockedUseDeleteUser.mockReturnValue({
      isPending: false,
      mutate: deleteRowFn,
    } as unknown as ReturnType<typeof useDeleteUser>);
    const user = userEvent.setup();

    render(<UserTableRow user={MockUser} />);

    const deleteButton = screen.getByTestId("delete-button");
    await user.click(deleteButton);

    expect(deleteRowFn).toHaveBeenCalledWith({ user: MockUser });
  });

  it("should open edit user modal when click in edit button", async () => {
    mockedUseDeleteUser.mockReturnValue({
      isPending: false,
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useDeleteUser>);
    const user = userEvent.setup();

    render(<UserTableRow user={MockUser} />);

    expect(screen.queryByText("Update user")).not.toBeInTheDocument();

    const editButton = screen.getByTestId("edit-button");
    await user.click(editButton);
    expect(screen.getByText("Update user")).toBeInTheDocument();
  });
});
