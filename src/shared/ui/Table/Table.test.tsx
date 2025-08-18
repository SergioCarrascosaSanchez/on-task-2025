import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableActions,
} from "./Table";

function renderBasic() {
  return render(
    <Table className="ring-1">
      <TableCaption>Users list</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>Ada Lovelace</TableCell>
          <TableCell>ada@example.com</TableCell>
          <TableCell>2025-08-17</TableCell>
          <TableActions>
            <button>Edit</button>
            <button>Remove</button>
          </TableActions>
        </TableRow>

        <TableRow className="bg-muted/10">
          <TableCell>Grace Hopper</TableCell>
          <TableCell>grace@example.com</TableCell>
          <TableCell>2025-08-18</TableCell>
          <TableActions>
            <button>Details</button>
          </TableActions>
        </TableRow>
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>2 results</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

describe("Table", () => {
  it("renders container and table with base classes and data-slots", () => {
    const { container } = renderBasic();
    const wrapper = container.querySelector(
      '[data-slot="table-container"]'
    ) as HTMLElement;
    const table = container.querySelector('[data-slot="table"]') as HTMLElement;

    expect(wrapper).toBeInTheDocument();
    expect(wrapper.className).toContain("overflow-x-auto");

    expect(table).toBeInTheDocument();
    expect(table.className).toContain("w-full");
    expect(table.className).toContain("caption-bottom");
    expect(table.className).toContain("text-[15px]");
    expect(table.className).toContain("ring-1");
  });

  it("exposes semantic table roles and renders header/body/footer", () => {
    const { container } = renderBasic();
    const tableByRole = screen.getByRole("table");
    expect(tableByRole).toBeInTheDocument();

    expect(
      container.querySelector('[data-slot="table-header"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="table-body"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-slot="table-footer"]')
    ).toBeInTheDocument();

    const headerRow = within(container).getByText("Name").closest("tr")!;
    const headerScope = within(headerRow);
    expect(
      headerScope.getByRole("columnheader", { name: "Name" })
    ).toBeInTheDocument();
    expect(
      headerScope.getByRole("columnheader", { name: "Email" })
    ).toBeInTheDocument();
    expect(
      headerScope.getByRole("columnheader", { name: "Created" })
    ).toBeInTheDocument();
    expect(
      headerScope.getByRole("columnheader", { name: "Actions" })
    ).toBeInTheDocument();

    const adaRow = within(tableByRole).getByText("Ada Lovelace").closest("tr")!;
    const adaScope = within(adaRow);
    expect(
      adaScope.getByRole("cell", { name: "Ada Lovelace" })
    ).toBeInTheDocument();
    expect(
      adaScope.getByRole("cell", { name: "ada@example.com" })
    ).toBeInTheDocument();
    expect(
      adaScope.getByRole("cell", { name: "2025-08-17" })
    ).toBeInTheDocument();
  });

  it("applies expected classes for header/body/footer/row/head/cell", () => {
    const { container } = renderBasic();

    const thead = container.querySelector(
      '[data-slot="table-header"]'
    ) as HTMLElement;
    expect(thead.className).toContain("bg-muted/30");

    const tbody = container.querySelector(
      '[data-slot="table-body"]'
    ) as HTMLElement;
    expect(tbody.className).toContain("[&_tr:last-child]:border-0");

    const tfoot = container.querySelector(
      '[data-slot="table-footer"]'
    ) as HTMLElement;
    expect(tfoot.className).toContain("bg-muted/40");
    expect(tfoot.className).toContain("border-t");

    const row = container.querySelector(
      '[data-slot="table-row"]'
    ) as HTMLElement;
    expect(row.className).toContain("border-b");
    expect(row.className).toContain("hover:bg-muted/20");

    const head = container.querySelector(
      '[data-slot="table-head"]'
    ) as HTMLElement;
    expect(head.className).toContain("px-6");
    expect(head.className).toContain("font-medium");

    const cell = container.querySelector(
      '[data-slot="table-cell"]'
    ) as HTMLElement;
    expect(cell.className).toContain("px-6");
    expect(cell.className).toContain("py-4");
  });

  it("renders caption within the table with expected classes", () => {
    const { container } = renderBasic();
    const table = container.querySelector('[data-slot="table"]')!;
    const caption = within(table as HTMLElement).getByText("Users list");
    expect(caption.tagName).toBe("CAPTION");
    expect(caption).toHaveAttribute("data-slot", "table-caption");
    expect(caption.className).toContain("text-sm");
    expect(caption.className).toContain("mt-4");
  });

  it("TableActions wraps children and aligns them to the end", () => {
    const { container } = renderBasic();
    const actionsCell = container.querySelector(
      '[data-slot="table-actions"]'
    ) as HTMLElement;
    expect(actionsCell).toBeInTheDocument();

    expect(
      within(actionsCell).getByRole("button", { name: "Edit" })
    ).toBeInTheDocument();
    expect(
      within(actionsCell).getByRole("button", { name: "Remove" })
    ).toBeInTheDocument();

    const wrapperDiv = actionsCell.querySelector("div") as HTMLElement;
    expect(wrapperDiv.className).toContain("justify-end");
    expect(wrapperDiv.className).toContain("gap-4");
    expect(wrapperDiv.className).toContain("items-center");
  });

  it("merges custom className on head and cell", () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="ring-1">Col</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="ring-2">Val</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const head = container.querySelector('[data-slot="table-head"]')!;
    expect(head.className).toContain("ring-1");

    const cell = container.querySelector('[data-slot="table-cell"]')!;
    expect(cell.className).toContain("ring-2");
  });

  it("supports checkbox layout helpers in head/cell selectors", () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input type="checkbox" role="checkbox" aria-label="select all" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <input type="checkbox" role="checkbox" aria-label="row 1" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const head = container.querySelector('[data-slot="table-head"]')!;
    const cell = container.querySelector('[data-slot="table-cell"]')!;

    expect(head.className).toMatch(/\[&:has\(\[role=checkbox\]\)\]:pr-0/);
    expect(cell.className).toMatch(/\[&:has\(\[role=checkbox\]\)\]:pr-0/);
  });
});
