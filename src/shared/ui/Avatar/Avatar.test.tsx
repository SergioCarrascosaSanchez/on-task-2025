import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders the fallback with initials when no `image` is provided", () => {
    render(<Avatar name="Sergio Cs" />);
    expect(screen.getByText("SC")).toBeInTheDocument();
  });

  it("renders a single letter when the name has only one word", () => {
    render(<Avatar name="Sergio" />);
    expect(screen.getByText("S")).toBeInTheDocument();
  });

  it("applies extra className on the root", () => {
    const { container } = render(
      <Avatar name="Sergio Cs" className="ring-2" />
    );
    const root = container.querySelector('[data-slot="avatar"]') as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass("ring-2");
  });

  it("applies different fallback color classes depending on the name", () => {
    const { container, rerender } = render(<Avatar name="Alice" />);
    const fb1 = container.querySelector(
      '[data-slot="avatar-fallback"]'
    ) as HTMLElement;
    expect(fb1.className).toMatch(
      /bg-(red|orange|amber|green|teal|blue|indigo|purple)-100\/80/
    );

    rerender(<Avatar name="Bob" />);
    const fb2 = container.querySelector(
      '[data-slot="avatar-fallback"]'
    ) as HTMLElement;
    expect(fb2).toBeInTheDocument();
  });

  it("trims spaces and computes initials correctly", () => {
    render(<Avatar name="     Test      User" />);
    expect(screen.getByText("TU")).toBeInTheDocument();
  });
});
