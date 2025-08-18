// Dialog.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./Dialog";

describe("Dialog (Radix)", () => {
  it("does not render overlay or content when closed by default", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>Body</DialogContent>
      </Dialog>
    );
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="dialog-overlay"]')
    ).not.toBeInTheDocument();
  });

  it("renders overlay and content when using defaultOpen", () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent data-testid="content">Body</DialogContent>
      </Dialog>
    );
    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
    expect(content).toHaveAttribute("data-slot", "dialog-content");
    const overlay = document.querySelector(
      '[data-slot="dialog-overlay"]'
    ) as HTMLElement;
    expect(overlay).toBeInTheDocument();
  });

  it("opens when clicking the trigger and closes via close button", () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <p>Body</p>
        </DialogContent>
      </Dialog>
    );

    // closed
    expect(screen.queryByText("Body")).not.toBeInTheDocument();

    // open
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("Body")).toBeInTheDocument();

    // close (built-in close button rendered by DialogContent)
    const closeBtn = within(dialog).getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("does not render the close button when showCloseButton is false", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent showCloseButton={false}>
          <p>Body</p>
        </DialogContent>
      </Dialog>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      within(dialog).queryByRole("button", { name: /close/i })
    ).not.toBeInTheDocument();
  });

  it("merges custom className on content and overlay", () => {
    render(
      <Dialog defaultOpen>
        <DialogOverlay className="ring-1" />
        <DialogContent className="ring-2">Body</DialogContent>
      </Dialog>
    );
    const overlay = document.querySelector(
      '[data-slot="dialog-overlay"]'
    ) as HTMLElement;
    expect(overlay.className).toContain("ring-1");
    const content = screen.getByRole("dialog");
    expect(content.className).toContain("ring-2");
    // base classes should remain
    expect(content.className).toContain("bg-background");
  });

  it("renders header, footer, title and description with expected slots", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My Title</DialogTitle>
            <DialogDescription>My Description</DialogDescription>
          </DialogHeader>

          <div>Body</div>

          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const title = screen.getByText("My Title");
    const desc = screen.getByText("My Description");
    expect(title).toHaveAttribute("data-slot", "dialog-title");
    expect(desc).toHaveAttribute("data-slot", "dialog-description");

    // header/footer slots
    const header = document.querySelector('[data-slot="dialog-header"]');
    const footer = document.querySelector('[data-slot="dialog-footer"]');
    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    // footer contains the close button
    expect(
      within(footer as HTMLElement).getByText("Close")
    ).toBeInTheDocument();
  });

  it("sets role=dialog on content and preserves data slots", () => {
    render(
      <Dialog defaultOpen>
        <DialogContent data-testid="content">Body</DialogContent>
      </Dialog>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("data-slot", "dialog-content");
    const overlay = document.querySelector('[data-slot="dialog-overlay"]');
    expect(overlay).toBeInTheDocument();
  });

  it("supports multiple opens/closes via trigger without leaking DOM nodes", () => {
    const { container } = render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>Body</DialogContent>
      </Dialog>
    );
    const trigger = screen.getByRole("button", { name: "Open" });

    fireEvent.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(
      within(screen.getByRole("dialog")).getByRole("button", { name: /close/i })
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // only one overlay/content at a time
    expect(
      container.querySelectorAll('[data-slot="dialog-overlay"]').length
    ).toBeLessThanOrEqual(1);
    expect(
      container.querySelectorAll('[data-slot="dialog-content"]').length
    ).toBeLessThanOrEqual(1);
  });
});
