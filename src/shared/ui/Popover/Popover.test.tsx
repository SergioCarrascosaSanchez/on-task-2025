// Popover.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
} from "./Popover";

function ControlledPopover() {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor>anchor</PopoverAnchor>
      <PopoverTrigger>open</PopoverTrigger>
      <PopoverContent data-testid="content">content</PopoverContent>
    </Popover>
  );
}

describe("Popover (Radix integration)", () => {
  it("renders trigger and does not render content when closed by default", () => {
    render(
      <Popover>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent>content</PopoverContent>
      </Popover>
    );
    const trigger = screen.getByRole("button", { name: "open" });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("data-slot", "popover-trigger");
    expect(screen.queryByText("content")).not.toBeInTheDocument();
  });

  it("renders content when using defaultOpen", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent data-testid="content">content</PopoverContent>
      </Popover>
    );
    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("data-slot", "popover-content");
    expect(content.className).toContain("bg-popover");
  });

  it("toggles open state via trigger when controlled with open/onOpenChange", () => {
    render(<ControlledPopover />);

    expect(screen.queryByTestId("content")).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: "open" });
    fireEvent.click(trigger);

    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
  });

  it("applies extra className to PopoverContent", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent className="ring-2" data-testid="content">
          content
        </PopoverContent>
      </Popover>
    );
    const content = screen.getByTestId("content");
    expect(content.className).toContain("bg-popover");
    expect(content.className).toContain("ring-2");
  });

  it("forwards arbitrary props to PopoverContent", () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent id="pop-id" data-x="y">
          content
        </PopoverContent>
      </Popover>
    );
    const content = screen.getByText("content");
    expect(content).toHaveAttribute("id", "pop-id");
    expect(content).toHaveAttribute("data-x", "y");
  });

  it("renders PopoverAnchor with data-slot", () => {
    render(
      <Popover>
        <PopoverAnchor>anchor</PopoverAnchor>
        <PopoverTrigger>open</PopoverTrigger>
        <PopoverContent>content</PopoverContent>
      </Popover>
    );
    const anchor = screen.getByText("anchor");
    expect(anchor).toHaveAttribute("data-slot", "popover-anchor");
  });
});
