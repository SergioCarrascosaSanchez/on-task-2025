import { render } from "@/shared/test/utils/renderWithProviders";
import { describe, expect, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

const { setTheme, useThemeMock } = vi.hoisted(() => {
  return {
    setTheme: vi.fn(),
    useThemeMock: vi.fn(),
  };
});

vi.mock("@/shared/theme/ThemeProvider", () => ({
  useTheme: useThemeMock,
}));

import { SidebarSettings } from "./SidebarSettings";

describe("SidebarSettings", () => {
  beforeEach(() => {
    setTheme.mockClear();
    useThemeMock.mockReset();
    // Estado inicial: dark
    useThemeMock.mockReturnValue({ theme: "dark", setTheme });
  });

  it("Should render settings icon", () => {
    render(<SidebarSettings isExtended={true} />);
    expect(document.querySelector(".lucide-settings")).toBeInTheDocument();
  });

  it("Should render theme toggle menu when clicked", async () => {
    const user = userEvent.setup();
    render(<SidebarSettings isExtended={true} />);
    const settingsToggle = document.querySelector(".lucide-settings");

    await user.click(settingsToggle!);

    expect(document.querySelector(".lucide-sun")).toBeInTheDocument();
    expect(document.querySelector(".lucide-moon")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("Should change theme when switch clicked", async () => {
    const user = userEvent.setup();

    const { rerender } = render(<SidebarSettings isExtended={true} />);
    const settingsToggle = document.querySelector(".lucide-settings")!;

    await user.click(settingsToggle);

    const switchElement = screen.getByRole("switch");

    await user.click(switchElement);
    expect(setTheme).toHaveBeenCalledWith("light");

    useThemeMock.mockReturnValue({ theme: "light", setTheme });
    rerender(<SidebarSettings isExtended={true} />);

    const settingsToggle2 = document.querySelector(".lucide-settings")!;
    await user.click(settingsToggle2);

    const switchElement2 = screen.getByRole("switch");
    await user.click(switchElement2);
    expect(setTheme).toHaveBeenCalledWith("dark");
  });
});
