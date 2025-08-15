import { render } from "@/shared/test/utils/renderWithProviders";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { UpdateUserModal } from "./UpdateUserModal";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { useUpdateUser } from "../hooks/useUpdateUser";
import type { User } from "@/domain/users/entities/User";
import type { UserToUpdate } from "@/domain/users/types/UserToUpdate";

const MockUser: User = {
  fullName: "John Doe",
  email: "john-doe@email.com",
  id: "test-id",
};

const MockUserToUpdate: UserToUpdate = {
  fullName: "John Doe - edited",
};

vi.mock("../hooks/useUpdateUser");

describe("UpdateUserModal component", () => {
  const mockedUseUpdateUser = vi.mocked(useUpdateUser);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render elements", () => {
    mockedUseUpdateUser.mockReturnValue({
      isPending: false,
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useUpdateUser>);

    render(<UpdateUserModal isOpen handleClose={vi.fn} user={MockUser} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Update user")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toBe(1);
    expect(screen.getByTestId("fullName")).toBeInTheDocument();
  });

  it("should not render elements when closed", () => {
    mockedUseUpdateUser.mockReturnValue({
      isPending: false,
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useUpdateUser>);

    render(
      <UpdateUserModal isOpen={false} handleClose={vi.fn} user={MockUser} />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Update user")).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Update" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Cancel" })
    ).not.toBeInTheDocument();
    expect(screen.queryAllByRole("textbox").length).not.toBe(2);
    expect(screen.queryByTestId("fullName")).not.toBeInTheDocument();
    expect(screen.queryByTestId("email")).not.toBeInTheDocument();
  });

  it("should call handleOnClose when cancel button clicked", async () => {
    mockedUseUpdateUser.mockReturnValue({
      isPending: false,
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useUpdateUser>);

    const closeFn = vi.fn();
    const user = userEvent.setup();

    render(
      <UpdateUserModal isOpen={true} handleClose={closeFn} user={MockUser} />
    );
    const closeButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(closeButton);
    expect(closeFn).toHaveBeenCalledOnce();
  });

  it("should call updateUser when update button clicked", async () => {
    const cancelFn = vi.fn();
    const updateFn = vi.fn();
    mockedUseUpdateUser.mockReturnValue({
      isPending: false,
      mutate: updateFn,
    } as unknown as ReturnType<typeof useUpdateUser>);
    const user = userEvent.setup();

    render(
      <UpdateUserModal isOpen={true} handleClose={cancelFn} user={MockUser} />
    );
    const updateButton = screen.getByRole("button", { name: "Update" });
    const nameInput = screen.getByTestId("fullName");

    await user.clear(nameInput);
    await user.type(nameInput, MockUserToUpdate.fullName);
    await user.click(updateButton);

    expect(updateFn).toHaveBeenCalledWith(
      { id: MockUser.id, user: MockUserToUpdate },
      {
        onSuccess: cancelFn,
      }
    );
  });

  it("should show error if any input is empty", async () => {
    const cancelFn = vi.fn();
    const updateFn = vi.fn();
    mockedUseUpdateUser.mockReturnValue({
      isPending: false,
      mutate: updateFn,
    } as unknown as ReturnType<typeof useUpdateUser>);
    const user = userEvent.setup();

    render(
      <UpdateUserModal isOpen={true} handleClose={cancelFn} user={MockUser} />
    );
    const updateButton = screen.getByRole("button", { name: "Update" });
    const nameInput = screen.getByTestId("fullName");

    await user.clear(nameInput);
    await user.click(updateButton);

    expect(updateFn).not.toHaveBeenCalled();
    expect(screen.getAllByText("This field is required").length).toBe(1);
  });
});
