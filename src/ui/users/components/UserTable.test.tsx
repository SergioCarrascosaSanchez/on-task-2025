import { render } from "@/shared/test/utils/renderWithProviders";
import { describe, it, vi, expect } from "vitest";
import { UserTable } from "./UserTable";
import type { User } from "@/domain/users/entities/User";
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
const currentPage = 1;
const totalPages = 2;
const onPageChange = vi.fn();

describe("UserTable component", () => {
  it("should render table header", () => {
    render(
      <UserTable
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Full name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("should render table rows", () => {
    render(
      <UserTable
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByText(data[0].id)).toBeInTheDocument();
    expect(screen.getByText(data[0].fullName)).toBeInTheDocument();
    expect(screen.getByText(data[0].email)).toBeInTheDocument();
    expect(screen.getByText(data[1].id)).toBeInTheDocument();
    expect(screen.getByText(data[1].fullName)).toBeInTheDocument();
    expect(screen.getByText(data[1].email)).toBeInTheDocument();
    expect(screen.getAllByTestId("edit-button").length).toBe(data.length);
    expect(screen.getAllByTestId("delete-button").length).toBe(data.length);
  });

  it("should render table pagination", () => {
    render(
      <UserTable
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
});
