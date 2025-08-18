import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

function getArrowButtons() {
  const all = screen.getAllByRole("button");
  return { first: all[0], last: all[all.length - 1] };
}

describe("Pagination", () => {
  it("returns null when totalPages is less than 1", () => {
    const { container, rerender } = render(
      <Pagination page={1} totalPages={0} onPageChange={() => {}} />
    );
    expect(container.firstChild).toBeNull();
    rerender(<Pagination page={1} totalPages={-5} onPageChange={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders expected items on a middle page with both ellipses", () => {
    const { rerender } = render(
      <Pagination page={5} totalPages={10} onPageChange={() => {}} />
    );
    expect(screen.getByText("5")).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    const ellipses = document.querySelectorAll(
      '[data-slot="pagination-ellipsis"]'
    );
    expect(ellipses.length).toBe(2);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();

    rerender(<Pagination page={6} totalPages={10} onPageChange={() => {}} />);
    expect(screen.getByText("6")).toHaveAttribute("aria-current", "page");
  });

  it("renders expected items on last page with ellipsis on the left", () => {
    render(<Pagination page={10} totalPages={10} onPageChange={() => {}} />);
    expect(screen.getByText("10")).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    const ellipses = document.querySelectorAll(
      '[data-slot="pagination-ellipsis"]'
    );
    expect(ellipses.length).toBe(1);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("disables first and last arrow buttons at the boundaries", () => {
    const { rerender } = render(
      <Pagination page={1} totalPages={10} onPageChange={() => {}} />
    );
    let { first, last } = getArrowButtons();
    expect(first).toBeDisabled();
    expect(last).not.toBeDisabled();

    rerender(<Pagination page={10} totalPages={10} onPageChange={() => {}} />);
    ({ first, last } = getArrowButtons());
    expect(first).not.toBeDisabled();
    expect(last).toBeDisabled();
  });

  it("calls onPageChange when clicking a numbered page", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={5} totalPages={10} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText("4"));
    expect(onPageChange).toHaveBeenCalledWith(4);
    fireEvent.click(screen.getByText("6"));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("does not call onPageChange when clicking the active page", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={3} totalPages={10} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("navigates to first and last page from arrows", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={5} totalPages={10} onPageChange={onPageChange} />);
    const { first, last } = getArrowButtons();
    fireEvent.click(first);
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(last);
    expect(onPageChange).toHaveBeenCalledWith(10);
  });

  it("clamps navigation when trying to go out of range", () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} totalPages={3} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText("3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByText("1"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("renders base structure and slots", () => {
    const { container } = render(
      <Pagination page={1} totalPages={3} onPageChange={() => {}} />
    );
    expect(
      container.querySelector('[data-slot="pagination"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="pagination-content"]')
    ).toBeInTheDocument();
    expect(
      container.querySelectorAll('[data-slot="pagination-item"]').length
    ).toBeGreaterThan(0);
  });

  it("sets aria-current on the active page and aria-labels on number buttons", () => {
    render(<Pagination page={7} totalPages={10} onPageChange={() => {}} />);
    const active = screen.getByText("7");
    expect(active).toHaveAttribute("aria-current", "page");
    expect(screen.getByLabelText("Go to page 6")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to page 8")).toBeInTheDocument();
  });
});
