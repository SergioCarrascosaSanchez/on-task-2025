import { render } from "@/shared/test/utils/renderWithProviders";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateUserModal } from "./CreateUserModal";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { useCreateUser } from "../hooks/useCreateUser";
import type { UserToCreate } from "@/domain/users/types/UserToCreate";

vi.mock("../hooks/useCreateUser");

describe("CreateUserModal component", () => {
  const mockedUseCreateUser = vi.mocked(useCreateUser);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render elements", () => {
    mockedUseCreateUser.mockReturnValue({
      isPending: false,
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useCreateUser>);

    render(<CreateUserModal isOpen handleClose={vi.fn} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Add new user")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Create user" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getAllByRole("textbox").length).toBe(2);
    expect(screen.getByTestId("fullName")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
  });

  it("should not render elements when closed", () => {
    mockedUseCreateUser.mockReturnValue({
      isPending: false,
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useCreateUser>);

    render(<CreateUserModal isOpen={false} handleClose={vi.fn} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Add new user")).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Create user" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Cancel" })
    ).not.toBeInTheDocument();
    expect(screen.queryAllByRole("textbox").length).not.toBe(2);
    expect(screen.queryByTestId("fullName")).not.toBeInTheDocument();
    expect(screen.queryByTestId("email")).not.toBeInTheDocument();
  });

  it("should call handleOnClose when cancel button clicked", async () => {
    mockedUseCreateUser.mockReturnValue({
      isPending: false,
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useCreateUser>);

    const closeFn = vi.fn();
    const user = userEvent.setup();

    render(<CreateUserModal isOpen={true} handleClose={closeFn} />);
    const closeButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(closeButton);
    expect(closeFn).toHaveBeenCalledOnce();
  });

  it("should call createUser when create button clicked", async () => {
    const MockUser: UserToCreate = {
      fullName: "John Doe",
      email: "john-doe@email.com",
    };

    const cancelFn = vi.fn();
    const createFn = vi.fn();
    mockedUseCreateUser.mockReturnValue({
      isPending: false,
      mutate: createFn,
    } as unknown as ReturnType<typeof useCreateUser>);
    const user = userEvent.setup();

    render(<CreateUserModal isOpen={true} handleClose={cancelFn} />);
    const createButton = screen.getByRole("button", { name: "Create user" });
    const nameInput = screen.getByTestId("fullName");
    const emailInput = screen.getByTestId("email");
    await user.type(nameInput, MockUser.fullName);
    await user.type(emailInput, MockUser.email);

    await user.click(createButton);

    expect(createFn).toHaveBeenCalledWith(
      { user: MockUser },
      {
        onSuccess: cancelFn,
      }
    );
  });

  it("should show error if any input is empty", async () => {
    const MockUser: UserToCreate = {
      fullName: "John Doe",
      email: "john-doe@email.com",
    };

    const cancelFn = vi.fn();
    const createFn = vi.fn();
    mockedUseCreateUser.mockReturnValue({
      isPending: false,
      mutate: createFn,
    } as unknown as ReturnType<typeof useCreateUser>);
    const user = userEvent.setup();

    render(<CreateUserModal isOpen={true} handleClose={cancelFn} />);
    const createButton = screen.getByRole("button", { name: "Create user" });
    //Any field is filled
    await user.click(createButton);
    expect(createFn).not.toHaveBeenCalled();
    expect(screen.getAllByText("This field is required").length).toBe(2);

    //Name field is filled

    const nameInput = screen.getByTestId("fullName");
    await user.type(nameInput, MockUser.fullName);

    await user.click(createButton);
    expect(createFn).not.toHaveBeenCalled();
    expect(screen.getAllByText("This field is required").length).toBe(1);

    //Email field is filled

    await user.clear(nameInput);

    const emailInput = screen.getByTestId("email");
    await user.type(emailInput, MockUser.fullName);

    await user.click(createButton);
    expect(createFn).not.toHaveBeenCalled();
    expect(screen.getAllByText("This field is required").length).toBe(1);
  });
});
