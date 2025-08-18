// Button.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with default classes (variant=default, size=default)", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-slot", "button");
    expect(btn.className).toMatch(/bg-primary/);
    expect(btn.className).toMatch(/\bh-9\b/);
    expect(btn.className).toMatch(/\bpx-4\b/);
  });

  it("applies the `destructive` variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    const btn = screen.getByRole("button", { name: "Delete" });
    expect(btn.className).toMatch(/bg-destructive/);
    expect(btn.className).toMatch(/\btext-white\b/);
  });

  it("applies the `outline` variant classes", () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole("button", { name: "Outline" });
    expect(btn.className).toMatch(/\bborder\b/);
    expect(btn.className).toMatch(/bg-background|dark:bg-input\/30/);
  });

  it("applies the `ghost` and `link` variants", () => {
    const { rerender } = render(<Button variant="ghost">Ghost</Button>);
    const ghost = screen.getByRole("button", { name: "Ghost" });
    expect(ghost.className).toMatch(/hover:bg-accent/);

    rerender(<Button variant="link">Link</Button>);
    const link = screen.getByRole("button", { name: "Link" });
    expect(link.className).toMatch(/\btext-primary\b/);
    expect(link.className).toMatch(/hover:underline/);
  });

  it("applies size `sm` and `lg` correctly", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    const sm = screen.getByRole("button", { name: "Small" });
    expect(sm.className).toMatch(/\bh-8\b/);
    expect(sm.className).toMatch(/\bpx-3\b/);

    rerender(<Button size="lg">Large</Button>);
    const lg = screen.getByRole("button", { name: "Large" });
    expect(lg.className).toMatch(/\bh-10\b/);
    expect(lg.className).toMatch(/\bpx-6\b/);
  });

  it("applies size `icon`", () => {
    render(<Button size="icon" aria-label="icon button" />);
    const iconBtn = screen.getByRole("button", { name: "icon button" });
    expect(iconBtn.className).toMatch(/\bsize-9\b/);
  });

  it("merges custom className", () => {
    render(<Button className="ring-2 data-[x]:underline">With class</Button>);
    const btn = screen.getByRole("button", { name: "With class" });
    expect(btn.className).toMatch(/\bring-2\b/);
    expect(btn.className).toMatch(/data-\[x\]:underline/);
  });

  it("forwards type and onClick props", () => {
    const onClick = vi.fn();
    render(
      <Button type="submit" onClick={onClick}>
        Submit
      </Button>
    );
    const btn = screen.getByRole("button", { name: "Submit" });
    expect(btn).toHaveAttribute("type", "submit");
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>
    );
    const btn = screen.getByRole("button", { name: "Disabled" });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders as child via Slot and forwards classes/props", () => {
    render(
      <Button asChild variant="secondary" size="lg">
        <a href="/test" aria-label="Go to test">
          Go
        </a>
      </Button>
    );
    const link = screen.getByRole("link", { name: "Go to test" });
    expect(link).toHaveAttribute("href", "/test");
    expect(link).toHaveTextContent("Go");
    expect(link.className).toMatch(/bg-secondary/);
    expect(link.className).toMatch(/\bh-10\b/);
  });

  it("supports rendering only an icon child", () => {
    render(
      <Button aria-label="settings" size="icon">
        <svg data-testid="icon" />
      </Button>
    );
    const btn = screen.getByRole("button", { name: "settings" });
    expect(btn).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
