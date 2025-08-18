import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders with correct role and data-slot", () => {
    const { container } = render(<Switch />);
    const sw = screen.getByRole("switch");
    expect(sw).toBeInTheDocument();
    expect(sw).toHaveAttribute("data-slot", "switch");
    const thumb = container.querySelector('[data-slot="switch-thumb"]');
    expect(thumb).toBeInTheDocument();
  });

  it("toggles on click (uncontrolled)", () => {
    render(<Switch />);
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("aria-checked", "false");
    fireEvent.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
    expect(sw).toHaveAttribute("data-state", "checked");
    fireEvent.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "false");
    expect(sw).toHaveAttribute("data-state", "unchecked");
  });

  it("calls onCheckedChange in controlled mode and does not change without parent update", () => {
    const onCheckedChange = vi.fn();
    function Controlled() {
      const [checked, setChecked] = React.useState(false);
      return (
        <Switch
          checked={checked}
          onCheckedChange={(v) => {
            onCheckedChange(v);
            setChecked(v);
          }}
        />
      );
    }
    render(<Controlled />);
    const sw = screen.getByRole("switch");
    expect(sw).toHaveAttribute("aria-checked", "false");
    fireEvent.click(sw);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("does not toggle or call handler when disabled", () => {
    const onCheckedChange = vi.fn();
    render(<Switch disabled onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole("switch");
    expect(sw).toBeDisabled();
    expect(sw).toHaveAttribute("aria-checked", "false");
    fireEvent.click(sw);
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(sw).toHaveAttribute("aria-checked", "false");
  });

  it("merges custom className on root", () => {
    const { container } = render(
      <Switch className="ring-2 data-[x]:underline" />
    );
    const sw = screen.getByRole("switch");
    expect(sw.className).toContain("ring-2");
    expect(sw.className).toMatch(/data-\[x\]:underline/);

    const thumb = container.querySelector('[data-slot="switch-thumb"]')!;
    // thumb base classes should be present
    expect(thumb.className).toMatch(/\bsize-4\b/);
  });
});
