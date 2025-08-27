import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { IconButton } from "./IconButton";

function SampleIcon() {
  return <svg data-testid="icon" />;
}

describe("IconButton", () => {
  it("renders with data-slot and base classes", () => {
    render(<IconButton icon={<SampleIcon />} aria-label="settings" />);
    const btn = screen.getByRole("button", { name: "settings" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-slot", "icon-button");
    expect(btn.className).toMatch(/\bsize-9\b|^$/);
    expect(btn.className).toMatch(/\bborder\b|bg-background/);
    expect(btn.className).toMatch(/\bh-8\b/);
    expect(btn.className).toMatch(/\bw-8\b/);
  });

  it("merges custom className", () => {
    render(
      <IconButton
        icon={<SampleIcon />}
        aria-label="merge"
        className="ring-2 data-[x]:underline"
      />
    );
    const btn = screen.getByRole("button", { name: "merge" });
    expect(btn.className).toContain("ring-2");
    expect(btn.className).toMatch(/data-\[x\]:underline/);
  });

  it("renders the provided icon", () => {
    render(<IconButton icon={<SampleIcon />} aria-label="with icon" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("calls onClick when enabled", () => {
    const onClick = vi.fn();
    render(
      <IconButton icon={<SampleIcon />} aria-label="click" onClick={onClick} />
    );
    fireEvent.click(screen.getByRole("button", { name: "click" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();
    render(
      <IconButton
        icon={<SampleIcon />}
        aria-label="disabled"
        disabled
        onClick={onClick}
      />
    );
    const btn = screen.getByRole("button", { name: "disabled" });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });
});
