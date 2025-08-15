import { describe, expect, it, vi } from "vitest";

const storeMock = vi.hoisted(() => ({
  state: { search: "" as string },
  update: vi.fn(),
}));

vi.mock("../stores/UserTableStore", () => ({
  useUserTableStore: () => ({
    search: storeMock.state.search,
    update: storeMock.update,
  }),
}));

import { render } from "@/shared/test/utils/renderWithProviders";
import { UserTableFilters } from "./UserTableFilters";
import { fireEvent, screen } from "@testing-library/dom";

describe("UserTableFilters component", () => {
  it("should render input", () => {
    render(<UserTableFilters />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("should call update store when modify input", () => {
    const mockSearch = "Search value";

    render(<UserTableFilters />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: mockSearch } });

    expect(storeMock.update).toHaveBeenCalledWith({
      search: mockSearch,
      page: 1,
    });
  });
});
