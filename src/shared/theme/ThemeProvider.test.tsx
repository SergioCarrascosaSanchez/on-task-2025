/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, beforeAll, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "./ThemeProvider";

function Consumer() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <button onClick={() => setTheme("light")}>set-light</button>
      <button onClick={() => setTheme("dark")}>set-dark</button>
      <button onClick={() => setTheme("system")}>set-system</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  let mockMatchMedia: any;

  beforeAll(() => {
    mockMatchMedia = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: mockMatchMedia,
    });
  });

  afterEach(() => {
    cleanup();
    document.documentElement.className = "";
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("uses defaultTheme when localStorage is empty", () => {
      render(
        <ThemeProvider defaultTheme="light">
          <Consumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme").textContent).toBe("light");
      expect(document.documentElement.classList.contains("light")).toBe(true);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it("uses 'system' as default defaultTheme", () => {
      render(
        <ThemeProvider>
          <Consumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme").textContent).toBe("system");
    });

    it("reads the initial theme from localStorage", () => {
      localStorage.setItem("vite-ui-theme", "dark");

      render(
        <ThemeProvider defaultTheme="light">
          <Consumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme").textContent).toBe("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(document.documentElement.classList.contains("light")).toBe(false);
    });

    it("ignores invalid values in localStorage and uses defaultTheme", () => {
      localStorage.setItem("vite-ui-theme", "invalid-theme");

      render(
        <ThemeProvider defaultTheme="light">
          <Consumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme").textContent).toBe("light");
    });
  });

  describe("Theme change", () => {
    it("setTheme persists in localStorage and updates DOM classes", async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme="light">
          <Consumer />
        </ThemeProvider>
      );

      await user.click(screen.getByText("set-dark"));
      expect(screen.getByTestId("theme").textContent).toBe("dark");
      expect(localStorage.getItem("vite-ui-theme")).toBe("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(document.documentElement.classList.contains("light")).toBe(false);

      await user.click(screen.getByText("set-light"));
      expect(screen.getByTestId("theme").textContent).toBe("light");
      expect(localStorage.getItem("vite-ui-theme")).toBe("light");
      expect(document.documentElement.classList.contains("light")).toBe(true);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it("removes previous classes when changing theme", async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme="dark">
          <Consumer />
        </ThemeProvider>
      );

      expect(document.documentElement.classList.contains("dark")).toBe(true);

      await user.click(screen.getByText("set-light"));
      expect(document.documentElement.classList.contains("light")).toBe(true);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });

  describe("System theme", () => {
    it("applies 'dark' when system prefers dark", () => {
      mockMatchMedia.mockReturnValue({
        matches: true,
        media: "(prefers-color-scheme: dark)",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      render(
        <ThemeProvider defaultTheme="system">
          <Consumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme").textContent).toBe("system");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(document.documentElement.classList.contains("light")).toBe(false);
      expect(mockMatchMedia).toHaveBeenCalledWith(
        "(prefers-color-scheme: dark)"
      );
    });

    it("applies 'light' when system prefers light", () => {
      mockMatchMedia.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      render(
        <ThemeProvider defaultTheme="system">
          <Consumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme").textContent).toBe("system");
      expect(document.documentElement.classList.contains("light")).toBe(true);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    it("switches to system from another theme", async () => {
      const user = userEvent.setup();
      mockMatchMedia.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      render(
        <ThemeProvider defaultTheme="dark">
          <Consumer />
        </ThemeProvider>
      );

      await user.click(screen.getByText("set-system"));

      expect(screen.getByTestId("theme").textContent).toBe("system");
      expect(localStorage.getItem("vite-ui-theme")).toBe("system");
      expect(document.documentElement.classList.contains("light")).toBe(true);
      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });

  describe("Custom StorageKey", () => {
    it("uses custom storageKey to read initial theme", () => {
      const customKey = "custom-theme";
      localStorage.setItem(customKey, "dark");

      render(
        <ThemeProvider storageKey={customKey} defaultTheme="light">
          <Consumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme").textContent).toBe("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("uses custom storageKey to persist changes", async () => {
      const user = userEvent.setup();
      const customKey = "custom-theme";

      render(
        <ThemeProvider storageKey={customKey} defaultTheme="light">
          <Consumer />
        </ThemeProvider>
      );

      await user.click(screen.getByText("set-dark"));

      expect(localStorage.getItem(customKey)).toBe("dark");
      expect(localStorage.getItem("vite-ui-theme")).toBeNull();
    });
  });

  describe("useTheme hook", () => {
    it("returns the correct context when used inside the provider", () => {
      render(
        <ThemeProvider defaultTheme="dark">
          <Consumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme").textContent).toBe("dark");
    });
  });

  describe("Edge cases", () => {
    it("handles multiple consecutive theme changes", async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme="system">
          <Consumer />
        </ThemeProvider>
      );

      await user.click(screen.getByText("set-light"));
      await user.click(screen.getByText("set-dark"));
      await user.click(screen.getByText("set-system"));
      await user.click(screen.getByText("set-light"));

      expect(screen.getByTestId("theme").textContent).toBe("light");
      expect(localStorage.getItem("vite-ui-theme")).toBe("light");
      expect(document.documentElement.classList.contains("light")).toBe(true);
    });

    it("works with empty localStorage", () => {
      localStorage.clear();

      render(
        <ThemeProvider defaultTheme="dark">
          <Consumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme").textContent).toBe("dark");
    });

    it("removes all theme classes before applying new one", async () => {
      const user = userEvent.setup();

      document.documentElement.classList.add(
        "light",
        "dark",
        "some-other-class"
      );

      render(
        <ThemeProvider defaultTheme="light">
          <Consumer />
        </ThemeProvider>
      );

      await user.click(screen.getByText("set-dark"));

      expect(document.documentElement.classList.contains("dark")).toBe(true);
      expect(document.documentElement.classList.contains("light")).toBe(false);
      expect(
        document.documentElement.classList.contains("some-other-class")
      ).toBe(true);
    });
  });

  describe("Integration", () => {
    it("simulates a full user flow", async () => {
      const user = userEvent.setup();

      mockMatchMedia.mockReturnValue({
        matches: false,
        media: "(prefers-color-scheme: dark)",
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      });

      render(
        <ThemeProvider>
          <Consumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId("theme").textContent).toBe("system");
      expect(document.documentElement.classList.contains("light")).toBe(true);

      await user.click(screen.getByText("set-dark"));
      expect(screen.getByTestId("theme").textContent).toBe("dark");
      expect(document.documentElement.classList.contains("dark")).toBe(true);

      await user.click(screen.getByText("set-system"));
      expect(screen.getByTestId("theme").textContent).toBe("system");
      expect(document.documentElement.classList.contains("light")).toBe(true);

      expect(localStorage.getItem("vite-ui-theme")).toBe("system");
    });
  });
});
