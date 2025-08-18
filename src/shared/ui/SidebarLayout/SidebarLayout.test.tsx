import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SidebarLayout } from "./SidebarLayout";

describe("SidebarLayout", () => {
  it("renders the root container with expected classes", () => {
    const { container } = render(
      <SidebarLayout>
        <SidebarLayout.Sidebar>Sidebar</SidebarLayout.Sidebar>
        <SidebarLayout.Content>Content</SidebarLayout.Content>
      </SidebarLayout>
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toBeInTheDocument();
    expect(root.className).toContain("flex");
    expect(root.className).toContain("h-screen");
    expect(root.className).toContain("w-scree");
  });

  it("renders Sidebar as an <aside> landmark and shows its children", () => {
    render(
      <SidebarLayout>
        <SidebarLayout.Sidebar>
          <span>Sidebar Area</span>
        </SidebarLayout.Sidebar>
        <SidebarLayout.Content>Content</SidebarLayout.Content>
      </SidebarLayout>
    );
    const aside = screen.getByRole("complementary");
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveTextContent("Sidebar Area");
  });

  it("renders Content as a <main> landmark with expected classes and children", () => {
    render(
      <SidebarLayout>
        <SidebarLayout.Sidebar>Sidebar</SidebarLayout.Sidebar>
        <SidebarLayout.Content>
          <h1>Main Title</h1>
        </SidebarLayout.Content>
      </SidebarLayout>
    );
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main.className).toContain("flex-1");
    expect(main.className).toContain("p-4");
    expect(main.className).toContain("overflow-auto");
    expect(screen.getByText("Main Title")).toBeInTheDocument();
  });

  it("exposes Sidebar and Content as static properties on the root component", () => {
    expect(SidebarLayout.Sidebar).toBeTypeOf("function");
    expect(SidebarLayout.Content).toBeTypeOf("function");
  });

  it("supports arbitrary children order and still renders both regions", () => {
    render(
      <SidebarLayout>
        <SidebarLayout.Content>Main First</SidebarLayout.Content>
        <SidebarLayout.Sidebar>Sidebar Second</SidebarLayout.Sidebar>
      </SidebarLayout>
    );
    expect(screen.getByRole("main")).toHaveTextContent("Main First");
    expect(screen.getByRole("complementary")).toHaveTextContent(
      "Sidebar Second"
    );
  });
});
