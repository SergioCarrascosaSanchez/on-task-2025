import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/shared/test/utils/renderWithProviders";
import userEvent from "@testing-library/user-event";
import { UsersTableHeader } from "./UsersTableHeader";

describe("UsersTableHeader component", () => {
  it("should render create button and title correctly", () => {
    render(<UsersTableHeader />);

    expect(screen.getByText("List of users")).toBeInTheDocument();
    expect(screen.getByText("Add new user")).toBeInTheDocument();
  });

  it("should open create user modal when click in create button", async () => {
    const user = userEvent.setup();

    render(<UsersTableHeader />);
    expect(screen.getAllByText("Add new user").length).toBe(1);

    const createButton = screen.getByText("Add new user");
    await user.click(createButton);
    expect(screen.getAllByText("Add new user").length).toBe(2);
  });
});
