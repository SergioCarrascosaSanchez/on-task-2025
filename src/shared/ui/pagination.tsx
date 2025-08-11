import * as React from "react";
import { cn } from "@/shared/lib/utils";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  MoreHorizontalIcon,
} from "lucide-react";

function PaginationBase({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex w-full justify-end", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
    </span>
  );
}

interface PaginationProps extends React.ComponentProps<"div"> {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (!totalPages || totalPages < 1) {
    return null;
  }

  const goTo = (p: number) => {
    const next = Math.max(1, Math.min(totalPages, p));
    if (next !== page) onPageChange(next);
  };

  const buildItems = (current: number, total: number) => {
    const range = (start: number, end: number) =>
      Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const boundaryCount = 1;
    const siblingCount = 1;

    const startPages = range(1, Math.min(boundaryCount, total));
    const endPages = range(
      Math.max(total - boundaryCount + 1, boundaryCount + 1),
      total
    );

    const siblingsStart = Math.max(
      Math.min(
        current - siblingCount,
        total - boundaryCount - siblingCount * 2 - 1
      ),
      boundaryCount + 2
    );

    const siblingsEnd = Math.min(
      Math.max(current + siblingCount, boundaryCount + siblingCount * 2 + 2),
      endPages[0] - 2
    );

    const items: Array<number | "start-ellipsis" | "end-ellipsis"> = [
      ...startPages,
    ];

    if (siblingsStart > boundaryCount + 2) {
      items.push("start-ellipsis");
    } else if (boundaryCount + 1 < total - boundaryCount) {
      items.push(boundaryCount + 1);
    }

    if (siblingsEnd >= siblingsStart) {
      items.push(...range(siblingsStart, siblingsEnd));
    }

    if (siblingsEnd < endPages[0] - 2) {
      items.push("end-ellipsis");
    } else if (endPages[0] - 1 > boundaryCount) {
      items.push(endPages[0] - 1);
    }

    items.push(...endPages);
    return items;
  };

  const items = buildItems(page, totalPages);

  const PageButton: React.FC<
    React.PropsWithChildren<{
      active?: boolean;
      disabled?: boolean;
      onClick?: () => void;
      ariaLabel?: string;
    }>
  > = ({ active, disabled, onClick, ariaLabel, children }) => (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm font-medium transition",
        "bg-background text-foreground hover:bg-muted/50 hover:cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 ring-offset-background",
        "disabled:opacity-50 disabled:pointer-events-none",
        active && "bg-muted"
      )}
    >
      {children}
    </button>
  );

  return (
    <PaginationBase className={cn("mt-3", className)}>
      <PaginationContent>
        <PaginationItem>
          <PageButton
            ariaLabel="Primera página"
            disabled={page === 1}
            onClick={() => goTo(1)}
          >
            <ArrowLeftToLine className="size-4" />
          </PageButton>
        </PaginationItem>
        {items.map((it, idx) =>
          typeof it === "number" ? (
            <PaginationItem key={`p-${it}-${idx}`}>
              <PageButton
                active={it === page}
                ariaLabel={`Ir a la página ${it}`}
                onClick={() => goTo(it)}
              >
                {it}
              </PageButton>
            </PaginationItem>
          ) : (
            <PaginationItem key={it + "-" + idx}>
              <PaginationEllipsis />
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PageButton
            ariaLabel="Última página"
            disabled={page === totalPages}
            onClick={() => goTo(totalPages)}
          >
            <ArrowRightToLine className="size-4" />
          </PageButton>
        </PaginationItem>
      </PaginationContent>
    </PaginationBase>
  );
}

export { Pagination };
