import type { User } from "@/domain/users/entities/User";
import { render } from "@/shared/test/utils/renderWithProviders";
import { describe, expect, it } from "vitest";
import { UserTableDataState } from "./UserTableDataState";
import { screen } from "@testing-library/dom";

const data: User[] = [
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
const totalPages = 2;

describe("UserTableDataState component", () => {
  it("should render elements", () => {
    render(<UserTableDataState users={data} totalPages={totalPages} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Full name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText(data[0].id)).toBeInTheDocument();
    expect(screen.getByText(data[0].fullName)).toBeInTheDocument();
    expect(screen.getByText(data[0].email)).toBeInTheDocument();
    expect(screen.getByText(data[1].id)).toBeInTheDocument();
    expect(screen.getByText(data[1].fullName)).toBeInTheDocument();
    expect(screen.getByText(data[1].email)).toBeInTheDocument();
    expect(screen.getAllByTestId("edit-button").length).toBe(data.length);
    expect(screen.getAllByTestId("delete-button").length).toBe(data.length);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Full name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
});
