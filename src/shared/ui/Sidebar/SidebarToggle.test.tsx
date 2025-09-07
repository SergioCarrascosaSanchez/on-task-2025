import { render } from "@/shared/test/utils/renderWithProviders";
import { describe, expect, it, vi } from "vitest";
import { SidebarToggle } from "./SidebarToggle";
import userEvent from "@testing-library/user-event";

describe("SidebarToggle", () => {
  it("should render open icon when not extended", () => {
    render(<SidebarToggle isExtended={false} onExtendedChange={vi.fn()} />);
    expect(
      document.querySelector(".lucide-panel-left-open")
    ).toBeInTheDocument();
  });

  it("should render close icon when extended", () => {
    render(<SidebarToggle isExtended={true} onExtendedChange={vi.fn()} />);
    expect(
      document.querySelector(".lucide-panel-left-close")
    ).toBeInTheDocument();
  });

  it("should toggle icons correctly in both directions", async () => {
    const onExtendedChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <SidebarToggle isExtended={true} onExtendedChange={onExtendedChange} />
    );

    let iconClose = document.querySelector(".lucide-panel-left-close");
    expect(iconClose).toBeInTheDocument();

    await user.click(iconClose!);
    expect(onExtendedChange).toHaveBeenCalledOnce();

    rerender(
      <SidebarToggle isExtended={false} onExtendedChange={onExtendedChange} />
    );

    const iconOpen = document.querySelector(".lucide-panel-left-open");
    expect(iconOpen).toBeInTheDocument();
    expect(
      document.querySelector(".lucide-panel-left-close")
    ).not.toBeInTheDocument();

    await user.click(iconOpen!);
    expect(onExtendedChange).toHaveBeenCalledTimes(2);

    rerender(
      <SidebarToggle isExtended={true} onExtendedChange={onExtendedChange} />
    );

    iconClose = document.querySelector(".lucide-panel-left-close");
    expect(iconClose).toBeInTheDocument();
    expect(
      document.querySelector(".lucide-panel-left-open")
    ).not.toBeInTheDocument();
  });
});
