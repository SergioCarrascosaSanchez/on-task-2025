import { render } from "@/shared/test/utils/renderWithProviders";
import { describe, expect, it } from "vitest";
import { SidebarAccountItem } from "./SidebarAccountItem";
import { screen } from "@testing-library/dom";

describe("SidebarAccountItem", () => {
  it("should render avatar, name and email while extended", () => {
    const name = "Test User";
    const email = "testuser@test.com";
    render(<SidebarAccountItem isExtended={true} name={name} email={email} />);
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
    expect(screen.getByText("TU")).toBeInTheDocument();
  });

  it("should only render avatar while not extended", () => {
    const name = "Test User";
    const email = "testuser@test.com";
    render(<SidebarAccountItem isExtended={false} name={name} email={email} />);
    expect(screen.queryByText(name)).not.toBeInTheDocument();
    expect(screen.queryByText(email)).not.toBeInTheDocument();
    expect(screen.getByText("TU")).toBeInTheDocument();
  });
});
