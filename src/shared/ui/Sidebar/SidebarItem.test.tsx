import { render } from "@/shared/test/utils/renderWithProviders";
import { describe, expect, it, vi } from "vitest";
import { SidebarItem } from "./SidebarItem";
import { AxeIcon } from "lucide-react";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe("SidebarItem tests", () => {
  it("should render icon and label when extended", () => {
    render(
      <SidebarItem
        isExtended
        icon={AxeIcon}
        onClick={vi.fn()}
        label="Test"
        isActive={false}
      />
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-icon-Test")).toBeInTheDocument();

    const item = screen.getByTestId("sidebar-item-Test");
    expect(item).toHaveClass("flex gap-2 items-center");
  });

  it("should not render label when not extended but icon", () => {
    render(
      <SidebarItem
        isExtended={false}
        icon={AxeIcon}
        onClick={vi.fn()}
        label="Test"
        isActive={false}
      />
    );
    expect(screen.queryByText("Test")).not.toBeInTheDocument();
    expect(screen.getByTestId("sidebar-icon-Test")).toBeInTheDocument();

    const item = screen.getByTestId("sidebar-item-Test");
    expect(item).toHaveClass("grid place-content-center");
  });

  it("should register click", async () => {
    const onClickFn = vi.fn();
    const user = userEvent.setup();
    render(
      <SidebarItem
        isExtended={true}
        icon={AxeIcon}
        onClick={onClickFn}
        label="Test"
        isActive={false}
      />
    );
    const item = screen.getByTestId("sidebar-item-Test");
    const text = screen.getByText("Test");
    const icon = screen.getByTestId("sidebar-icon-Test");

    await user.click(item);
    await user.click(text);
    await user.click(icon);

    expect(onClickFn).toHaveBeenCalledTimes(3);
  });

  it("should render classes when active", () => {
    render(
      <SidebarItem
        isExtended={true}
        icon={AxeIcon}
        onClick={vi.fn()}
        label="Test"
        isActive={true}
      />
    );
    const item = screen.getByTestId("sidebar-item-Test");
    expect(item).toHaveClass("bg-background");

    const icon = screen.getByTestId("sidebar-icon-Test");

    expect(icon).toHaveClass("stroke-foreground");
  });

  it("should render classes when inactive", () => {
    render(
      <SidebarItem
        isExtended={true}
        icon={AxeIcon}
        onClick={vi.fn()}
        label="Test"
        isActive={false}
      />
    );
    const item = screen.getByTestId("sidebar-item-Test");
    expect(item).toHaveClass("bg-transparent hover:bg-background/80");

    const icon = screen.getByTestId("sidebar-icon-Test");

    expect(icon).toHaveClass("stroke-subtle");
  });
});
