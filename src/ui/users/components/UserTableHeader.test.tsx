import { render } from "@/shared/test/utils/renderWithProviders";
import { describe, expect, it } from "vitest";
import { UserTableHeader } from "./UserTableHeader";
import { screen } from "@testing-library/dom";

describe("UserTableHeader component", () => {
  it("should render all labels", () => {
    render(<UserTableHeader />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Full name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
});
