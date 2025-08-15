import { beforeEach, describe, expect, it, vi } from "vitest";
import { useUsers } from "../hooks/useUsers";
import { UsersPage } from "./UsersPage";
import { render } from "@/shared/test/utils/renderWithProviders";
import { screen } from "@testing-library/dom";
import type { User } from "@/domain/users/entities/User";

vi.mock("../hooks/useUsers");

const MockUsers: User[] = [
  {
    fullName: "John Doe",
    email: "john-doe@email.com",
    id: "test-id",
  },
  {
    fullName: "Jane Doe",
    email: "jane-doe@email.com",
    id: "test-id-2",
  },
];

describe("UsersPage", () => {
  const mockedUseUsers = vi.mocked(useUsers);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render loading state if query is loading", () => {
    mockedUseUsers.mockReturnValue({
      isLoading: true,
      isError: true,
      data: null,
    } as unknown as ReturnType<typeof mockedUseUsers>);

    render(<UsersPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render error state if query is not loading and error", () => {
    mockedUseUsers.mockReturnValue({
      isLoading: false,
      isError: true,
    } as unknown as ReturnType<typeof mockedUseUsers>);

    render(<UsersPage />);

    expect(
      screen.getByText("An error has ocurred retriving users")
    ).toBeInTheDocument();
  });

  it("should render error state if query is not loading and no users", () => {
    mockedUseUsers.mockReturnValue({
      isLoading: false,
      isError: false,
      data: null,
    } as unknown as ReturnType<typeof mockedUseUsers>);

    render(<UsersPage />);

    expect(
      screen.getByText("An error has ocurred retriving users")
    ).toBeInTheDocument();
  });

  it("should render data state if query is not loading, no errors and users", () => {
    mockedUseUsers.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        total: MockUsers.length,
        users: MockUsers,
      },
    } as unknown as ReturnType<typeof mockedUseUsers>);

    render(<UsersPage />);

    expect(screen.getByText(MockUsers[0].fullName)).toBeInTheDocument();
    expect(screen.getByText(MockUsers[1].fullName)).toBeInTheDocument();
  });
});
