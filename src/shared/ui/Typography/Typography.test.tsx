import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Typography } from "./Typography";

const text = "Sample text";

describe("Typography", () => {
  it("renders children", () => {
    render(<Typography>{text}</Typography>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("renders correct element and classes for each variant", () => {
    const cases: Array<{
      variant: React.ComponentProps<typeof Typography>["variant"];
      expectedTag: string;
      expectedClassFragment: string;
    }> = [
      { variant: "h1", expectedTag: "H1", expectedClassFragment: "text-4xl" },
      { variant: "h2", expectedTag: "H2", expectedClassFragment: "text-3xl" },
      { variant: "h3", expectedTag: "H3", expectedClassFragment: "text-2xl" },
      { variant: "h4", expectedTag: "H4", expectedClassFragment: "text-xl" },
      { variant: "p", expectedTag: "P", expectedClassFragment: "leading-4" },
      {
        variant: "blockquote",
        expectedTag: "BLOCKQUOTE",
        expectedClassFragment: "border-l-2",
      },
      {
        variant: "code",
        expectedTag: "CODE",
        expectedClassFragment: "font-mono",
      },
      { variant: "lead", expectedTag: "P", expectedClassFragment: "text-xl" },
      {
        variant: "large",
        expectedTag: "DIV",
        expectedClassFragment: "text-lg",
      },
      {
        variant: "small",
        expectedTag: "SMALL",
        expectedClassFragment: "text-sm",
      },
      {
        variant: "muted",
        expectedTag: "P",
        expectedClassFragment: "text-muted-foreground",
      },
    ];

    cases.forEach(({ variant, expectedTag, expectedClassFragment }) => {
      const { unmount } = render(
        <Typography variant={variant}>{text}</Typography>
      );
      const el = screen.getByText(text);
      expect(el.tagName).toBe(expectedTag);
      expect(el.className).toContain(expectedClassFragment);
      unmount();
    });
  });

  it("uses default 'p' when variant is undefined", () => {
    render(<Typography>{text}</Typography>);
    const el = screen.getByText(text);
    expect(el.tagName).toBe("P");
    expect(el.className).toContain("leading-4");
  });

  it("falls back to default when variant is unknown", () => {
    // @ts-expect-error testing runtime fallback with an invalid value
    render(<Typography variant={"unknown"}>{text}</Typography>);
    const el = screen.getByText(text);
    expect(el.tagName).toBe("P");
    expect(el.className).toContain("leading-4");
  });

  it("respects the `as` prop overriding element but keeping variant classes", () => {
    render(
      <Typography variant="h3" as="section">
        {text}
      </Typography>
    );
    const el = screen.getByText(text);
    expect(el.tagName).toBe("SECTION");
    expect(el.className).toContain("text-2xl");
    expect(el.className).toContain("font-semibold");
  });

  it("merges custom className", () => {
    render(
      <Typography variant="h4" className="ring-1 data-[x]:underline">
        {text}
      </Typography>
    );
    const el = screen.getByText(text);
    expect(el.className).toContain("text-xl");
    expect(el.className).toContain("ring-1");
    expect(el.className).toMatch(/data-\[x\]:underline/);
  });

  it("forwards html attributes", () => {
    render(
      <Typography variant="lead" id="lead-typo" data-test="typo">
        {text}
      </Typography>
    );
    const el = screen.getByText(text);
    expect(el).toHaveAttribute("id", "lead-typo");
    expect(el).toHaveAttribute("data-test", "typo");
  });
});
