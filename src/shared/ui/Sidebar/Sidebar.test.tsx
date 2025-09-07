import { render } from "@/shared/test/utils/renderWithProviders";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

const { navigateMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigateMock,
  useRouterState: () => ({ location: { pathname: "/" } }),
}));

vi.mock("@/shared/theme/ThemeProvider", () => ({
  useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
}));

import { Sidebar } from "./Sidebar";

describe("Sidebar", () => {
  it("renders account name and main items", async () => {
    const user = await userEvent.setup();

    render(<Sidebar />);
    const expandToggle = document.querySelector(".lucide-panel-left-open");

    await user.click(expandToggle!);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Groups")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });
});
